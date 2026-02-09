import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth";
import { ConvexError, v } from "convex/values";

import type { DataModel } from "./_generated/dataModel";

import { components } from "./_generated/api";
import { internalMutation, mutation, query } from "./_generated/server";
import authConfig from "./auth.config";

const siteUrl = process.env.SITE_URL!;

export const authComponent = createClient<DataModel>(components.betterAuth);

function createAuth(ctx: GenericCtx<DataModel>) {
  return betterAuth({
    baseURL: siteUrl,
    trustedOrigins: [siteUrl],
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [
      convex({
        authConfig,
        jwksRotateOnTokenGenerationError: true,
      }),
    ],
  });
}

export { createAuth };

export const getCurrentUser = query({
  args: {},
  handler: async (ctx: any) => {
    return await authComponent.safeGetAuthUser(ctx);
  },
});

/**
 * Called from the frontend after login to ensure the authenticated user
 * has a corresponding row in the `users` table. Creates one if missing.
 */
export const ensureUser = mutation({
  args: {},
  handler: async (ctx: any) => {
    const authUser = await authComponent.safeGetAuthUser(ctx);
    if (!authUser) {
      throw new ConvexError("Authentication required");
    }

    const betterAuthId = String(authUser._id);
    const existing = await ctx.db
      .query("users")
      .withIndex("by_betterAuthUserId", (q: any) => q.eq("betterAuthUserId", betterAuthId))
      .unique();

    if (existing) {
      return existing;
    }

    // Create new users row (not admin by default)
    const id = await ctx.db.insert("users", {
      betterAuthUserId: betterAuthId,
      email: authUser.email ?? "",
      name: authUser.name ?? "",
      isAdmin: false,
    });

    return await ctx.db.get(id);
  },
});

/**
 * One-time seed function to grant admin to a user by email.
 * Run from the Convex dashboard: Functions → auth:seedAdmin
 *
 * This finds the user in the Better Auth component table by email,
 * creates or updates the `users` row, and sets isAdmin to true.
 * Works even if the user has never visited an (app) page yet.
 */
export const seedAdmin = internalMutation({
  args: { email: v.string() },
  handler: async (ctx: any, args: any) => {
    // Find the Better Auth user by email using the component adapter
    const authUser = await ctx.runQuery(components.betterAuth.adapter.findOne, {
      model: "user",
      where: [{ field: "email", value: args.email }],
    });

    if (!authUser) {
      throw new ConvexError(
        `No Better Auth user found with email "${args.email}". Make sure the user has signed up first.`
      );
    }

    const betterAuthId = String(authUser._id);

    // Check if users row already exists
    const existing = await ctx.db
      .query("users")
      .withIndex("by_betterAuthUserId", (q: any) => q.eq("betterAuthUserId", betterAuthId))
      .unique();

    if (existing) {
      // Update to admin
      await ctx.db.patch(existing._id, { isAdmin: true });
      return { success: true, email: args.email, action: "updated" };
    }

    // Create new users row as admin
    await ctx.db.insert("users", {
      betterAuthUserId: betterAuthId,
      email: authUser.email ?? args.email,
      name: authUser.name ?? "",
      isAdmin: true,
    });

    return { success: true, email: args.email, action: "created" };
  },
});
