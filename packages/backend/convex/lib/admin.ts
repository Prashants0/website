import { authComponent } from "../auth";
import { ConvexError } from "convex/values";

/**
 * Checks if the current user is authenticated and returns the auth user.
 * Throws ConvexError if not authenticated.
 */
export async function requireAuth(ctx: any) {
  const authUser = await authComponent.safeGetAuthUser(ctx);
  if (!authUser) {
    throw new ConvexError("Authentication required");
  }
  return authUser;
}

/**
 * Checks if the current user is an admin.
 * First checks the Better Auth user, then looks up the users table for isAdmin flag.
 * Throws ConvexError if not authenticated or not admin.
 */
export async function requireAdmin(ctx: any) {
  const authUser = await requireAuth(ctx);

  // The authUser from better-auth component has shape { _id, name, email, ... }
  // Look up user in our users table by betterAuthUserId
  const betterAuthId = String(authUser._id);
  const user = await ctx.db
    .query("users")
    .withIndex("by_betterAuthUserId", (q: any) => q.eq("betterAuthUserId", betterAuthId))
    .unique();

  if (!user?.isAdmin) {
    throw new ConvexError("Admin access required");
  }

  return { authUser, user };
}
