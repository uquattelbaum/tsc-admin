import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("abteilungen").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    beschreibung: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("abteilungen", args);
  },
});
