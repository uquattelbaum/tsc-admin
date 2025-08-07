import type { Id } from "../convex/_generated/dataModel";

export interface Mitglied {
  _id?: Id<"mitglieder">;
  _creationTime?: number;

  // Persönliche Daten
  vorname: string;
  nachname: string;
  geburtsdatum?: string;
  geschlecht?: string;
  familienstand?: string;

  // Kontaktdaten
  strasse?: string;
  plz?: string;
  ort?: string;
  telefon?: string;
  mobil?: string;
  email?: string;

  // Bankdaten
  kontoinhaber?: string;
  iban?: string;
  mandatsreferenz?: string;
  mandatsdatum?: string;

  // Mitgliedschaft
  abteilungId?: Id<"abteilungen">;
  gruppeId?: Id<"gruppen">;
  beitragsintervall?: string;
  beitragshoehe?: string;
  startdatum?: string;
  enddatum?: string;
}
