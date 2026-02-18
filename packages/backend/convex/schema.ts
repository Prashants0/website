import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
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
