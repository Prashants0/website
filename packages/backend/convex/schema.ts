import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // CMS: Blog posts
  cmsBlogPosts: defineTable({
    slug: v.string(),
    title: v.string(),
    excerpt: v.optional(v.string()),
    coverImageUrl: v.optional(v.string()),
    draftData: v.any(),
    publishedData: v.optional(v.any()),
    status: v.union(v.literal("draft"), v.literal("published")),
    publishedAt: v.optional(v.number()),
    authorUserId: v.string(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_status_and_publishedAt", ["status", "publishedAt"]),

  // CMS: Use cases
  cmsUseCases: defineTable({
    slug: v.string(),
    title: v.string(),
    summary: v.optional(v.string()),
    industry: v.optional(v.string()),
    product: v.optional(v.string()),
    draftData: v.any(),
    publishedData: v.optional(v.any()),
    status: v.union(v.literal("draft"), v.literal("published")),
    publishedAt: v.optional(v.number()),
    authorUserId: v.string(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_status_and_publishedAt", ["status", "publishedAt"]),

  // Users table for admin flag (managed alongside auth component)
  users: defineTable({
    betterAuthUserId: v.string(),
    email: v.string(),
    name: v.string(),
    isAdmin: v.boolean(),
  })
    .index("by_betterAuthUserId", ["betterAuthUserId"])
    .index("by_email", ["email"]),
});
