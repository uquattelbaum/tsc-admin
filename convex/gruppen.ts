import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("gruppen").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    abteilungId: v.id("abteilungen"),
    wochentag: v.optional(v.string()),
    uhrzeit: v.optional(v.string()),
    trainer: v.optional(v.string()),
    raum: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("gruppen", args);
  },
});
