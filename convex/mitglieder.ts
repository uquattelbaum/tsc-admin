import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    abteilungId: v.optional(v.id("abteilungen")),
    gruppeId: v.optional(v.id("gruppen")),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let q;

    if (args.gruppeId) {
      // Gezielt alle Mitglieder in dieser Gruppe
      q = ctx.db
        .query("mitglieder")
        .withIndex("by_gruppe", (x) => x.eq("gruppeId", args.gruppeId));
    } else if (args.abteilungId) {
      // Alle Mitglieder in dieser Abteilung
      q = ctx.db
        .query("mitglieder")
        .withIndex("by_abteilung", (x) => x.eq("abteilungId", args.abteilungId));
    } else {
      // Kein Filter: nach Nachname sortiert holen
      q = ctx.db.query("mitglieder").withIndex("by_nachname");
    }

    let rows = await q.collect();

    // Einfache Suche (Start: case-insensitive Teiltreffer)
    if (args.search && args.search.trim()) {
      const s = args.search.trim().toLowerCase();
      rows = rows.filter((r) =>
        (r.vorname ?? "").toLowerCase().includes(s) ||
        (r.nachname ?? "").toLowerCase().includes(s) ||
        (r.email ?? "").toLowerCase().includes(s)
      );
    }

    return rows;
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
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, args.daten);
  },
});
