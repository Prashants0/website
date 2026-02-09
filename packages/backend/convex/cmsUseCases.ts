import { query, mutation } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import { requireAdmin } from "./lib/admin";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const defaultPuckData = { content: [], root: {} };

// ── Admin Queries ──────────────────────────────────────────

export const list = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const items = await ctx.db
      .query("cmsUseCases")
      .order("desc")
      .collect();
    return items.map((u) => ({
      id: u._id,
      slug: u.slug,
      title: u.title,
      status: u.status,
      updatedAt: u.updatedAt,
      publishedAt: u.publishedAt ?? null,
    }));
  },
});

export const getById = query({
  args: { id: v.id("cmsUseCases") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const useCase = await ctx.db.get(args.id);
    if (!useCase) {
      throw new ConvexError("Use case not found");
    }
    return useCase;
  },
});

// ── Admin Mutations ────────────────────────────────────────

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { authUser } = await requireAdmin(ctx);
    const slug = slugify(args.slug?.length ? args.slug : args.title);

    const existing = await ctx.db
      .query("cmsUseCases")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (existing) {
      throw new ConvexError("Slug already exists");
    }

    const id = await ctx.db.insert("cmsUseCases", {
      slug,
      title: args.title,
      draftData: defaultPuckData,
      status: "draft",
      authorUserId: String(authUser._id),
      updatedAt: Date.now(),
    });

    return { id, slug };
  },
});

export const saveDraft = mutation({
  args: {
    id: v.id("cmsUseCases"),
    title: v.string(),
    slug: v.string(),
    summary: v.optional(v.string()),
    industry: v.optional(v.string()),
    product: v.optional(v.string()),
    draftData: v.any(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const slug = slugify(args.slug);

    const existing = await ctx.db
      .query("cmsUseCases")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (existing && existing._id !== args.id) {
      throw new ConvexError("Slug already exists");
    }

    await ctx.db.patch(args.id, {
      title: args.title,
      slug,
      summary: args.summary || undefined,
      industry: args.industry || undefined,
      product: args.product || undefined,
      draftData: args.draftData,
      updatedAt: Date.now(),
    });

    return { ok: true };
  },
});

export const publish = mutation({
  args: {
    id: v.id("cmsUseCases"),
    title: v.string(),
    slug: v.string(),
    summary: v.optional(v.string()),
    industry: v.optional(v.string()),
    product: v.optional(v.string()),
    publishedData: v.any(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const slug = slugify(args.slug);

    const existing = await ctx.db
      .query("cmsUseCases")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (existing && existing._id !== args.id) {
      throw new ConvexError("Slug already exists");
    }

    await ctx.db.patch(args.id, {
      title: args.title,
      slug,
      summary: args.summary || undefined,
      industry: args.industry || undefined,
      product: args.product || undefined,
      publishedData: args.publishedData,
      status: "published",
      publishedAt: Date.now(),
      updatedAt: Date.now(),
    });

    return { ok: true };
  },
});

export const unpublish = mutation({
  args: { id: v.id("cmsUseCases") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.patch(args.id, {
      status: "draft",
      publishedAt: undefined,
      publishedData: undefined,
      updatedAt: Date.now(),
    });
    return { ok: true };
  },
});

export const deleteUseCase = mutation({
  args: { id: v.id("cmsUseCases") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    await ctx.db.delete(args.id);
    return { ok: true };
  },
});

// ── Public Queries ─────────────────────────────────────────

export const listPublished = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db
      .query("cmsUseCases")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .order("desc")
      .collect();
    return items.map((u) => ({
      slug: u.slug,
      title: u.title,
      summary: u.summary ?? null,
      industry: u.industry ?? null,
      product: u.product ?? null,
      publishedAt: u.publishedAt ?? null,
    }));
  },
});

export const getPublishedBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const useCase = await ctx.db
      .query("cmsUseCases")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (!useCase || useCase.status !== "published" || !useCase.publishedData) {
      return null;
    }

    return {
      title: useCase.title,
      summary: useCase.summary ?? null,
      industry: useCase.industry ?? null,
      product: useCase.product ?? null,
      publishedAt: useCase.publishedAt ?? null,
      publishedData: useCase.publishedData,
    };
  },
});
