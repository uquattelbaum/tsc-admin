import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  abteilungen: defineTable({
    name: v.string(),
    beschreibung: v.optional(v.string()),
  }),

  gruppen: defineTable({
    name: v.string(),
    abteilungId: v.id("abteilungen"),
    wochentag: v.optional(v.string()),
    uhrzeit: v.optional(v.string()),
    trainer: v.optional(v.string()),
    raum: v.optional(v.string()),
  }),

  mitglieder: defineTable({
    adressnummer: v.optional(v.string()),
    nachname: v.string(),
    vorname: v.string(),
    geburtstag: v.optional(v.string()),
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
  }),
});
