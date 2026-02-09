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
    const posts = await ctx.db
      .query("cmsBlogPosts")
      .order("desc")
      .collect();
    return posts.map((p) => ({
      id: p._id,
      slug: p.slug,
      title: p.title,
      status: p.status,
      updatedAt: p.updatedAt,
      publishedAt: p.publishedAt ?? null,
    }));
  },
});

export const getById = query({
  args: { id: v.id("cmsBlogPosts") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const post = await ctx.db.get(args.id);
    if (!post) {
      throw new ConvexError("Blog post not found");
    }
    return post;
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

    // Check slug uniqueness
    const existing = await ctx.db
      .query("cmsBlogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (existing) {
      throw new ConvexError("Slug already exists");
    }

    const id = await ctx.db.insert("cmsBlogPosts", {
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
    id: v.id("cmsBlogPosts"),
    title: v.string(),
    slug: v.string(),
    excerpt: v.optional(v.string()),
    coverImageUrl: v.optional(v.string()),
    draftData: v.any(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const slug = slugify(args.slug);

    // Check slug uniqueness (exclude current post)
    const existing = await ctx.db
      .query("cmsBlogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (existing && existing._id !== args.id) {
      throw new ConvexError("Slug already exists");
    }

    await ctx.db.patch(args.id, {
      title: args.title,
      slug,
      excerpt: args.excerpt || undefined,
      coverImageUrl: args.coverImageUrl || undefined,
      draftData: args.draftData,
      updatedAt: Date.now(),
    });

    return { ok: true };
  },
});

export const publish = mutation({
  args: {
    id: v.id("cmsBlogPosts"),
    title: v.string(),
    slug: v.string(),
    excerpt: v.optional(v.string()),
    coverImageUrl: v.optional(v.string()),
    publishedData: v.any(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const slug = slugify(args.slug);

    const existing = await ctx.db
      .query("cmsBlogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (existing && existing._id !== args.id) {
      throw new ConvexError("Slug already exists");
    }

    await ctx.db.patch(args.id, {
      title: args.title,
      slug,
      excerpt: args.excerpt || undefined,
      coverImageUrl: args.coverImageUrl || undefined,
      publishedData: args.publishedData,
      status: "published",
      publishedAt: Date.now(),
      updatedAt: Date.now(),
    });

    return { ok: true };
  },
});

export const unpublish = mutation({
  args: { id: v.id("cmsBlogPosts") },
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

export const deleteBlogPost = mutation({
  args: { id: v.id("cmsBlogPosts") },
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
    const posts = await ctx.db
      .query("cmsBlogPosts")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .order("desc")
      .collect();
    return posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt ?? null,
      coverImageUrl: p.coverImageUrl ?? null,
      publishedAt: p.publishedAt ?? null,
    }));
  },
});

export const getPublishedBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("cmsBlogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (!post || post.status !== "published" || !post.publishedData) {
      return null;
    }

    return {
      title: post.title,
      excerpt: post.excerpt ?? null,
      coverImageUrl: post.coverImageUrl ?? null,
      publishedAt: post.publishedAt ?? null,
      publishedData: post.publishedData,
    };
  },
});
