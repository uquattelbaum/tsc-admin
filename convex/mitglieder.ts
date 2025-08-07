import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Bereits vorhanden:
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("mitglieder").collect();
  },
});

export const create = mutation({
  args: {
    vorname: v.string(),
    nachname: v.string(),
    geburtsdatum: v.optional(v.string()),
    geschlecht: v.optional(v.string()),
    familienstand: v.optional(v.string()),
    strasse: v.optional(v.string()),
    plz: v.optional(v.string()),
    ort: v.optional(v.string()),
    telefon: v.optional(v.string()),
    mobil: v.optional(v.string()),
    email: v.optional(v.string()),
    kontoinhaber: v.optional(v.string()),
    iban: v.optional(v.string()),
    mandatsreferenz: v.optional(v.string()),
    mandatsdatum: v.optional(v.string()),
    abteilungId: v.optional(v.id("abteilungen")),
    gruppeId: v.optional(v.id("gruppen")),
    beitragsintervall: v.optional(v.string()),
    beitragshoehe: v.optional(v.string()),
    startdatum: v.optional(v.string()),
    enddatum: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("mitglieder", args);
  },
});

export const remove = mutation({
  args: { id: v.id("mitglieder") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});

export const update = mutation({
  args: {
    id: v.id("mitglieder"),
    daten: v.object({
      vorname: v.string(),
      nachname: v.string(),
      // ... alle Felder wie bei createMitglied
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, args.daten);
  },
});
