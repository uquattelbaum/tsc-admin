import { useState } from "react";
import type { Mitglied } from "../types";
import TabPersoenlich from "./TabPersoenlich";
import TabKontakt from "./TabKontakt";
import TabBank from "./TabBank";
import TabMitgliedschaft from "./TabMitgliedschaft";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface Props {
  initial?: Partial<Mitglied> & { _id?: string };
  onDone: () => void;
}

export default function MitgliedFormular({ initial, onDone }: Props) {
  const [currentTab, setCurrentTab] = useState<
    "persoenlich" | "kontakt" | "bank" | "mitgliedschaft"
  >("persoenlich");

  const [mitglied, setMitglied] = useState<Mitglied>({
    vorname: "",
    nachname: "",
    ...initial,
  });

  const create = useMutation(api.mitglieder.create);
  const update = useMutation(api.mitglieder.update);

  function handleChange(field: keyof Mitglied, value: string) {
    setMitglied((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    try {
      const { _id, _creationTime, ...erlaubteDaten } = mitglied;

      if (_id) {
        await update({ id: _id, daten: erlaubteDaten });
      } else {
        await create(erlaubteDaten);
      }

      onDone();
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
    }
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-4 border-b">
        {["persoenlich", "kontakt", "bank", "mitgliedschaft"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 border-b-2 ${
              currentTab === tab
                ? "border-blue-600 text-blue-600 font-semibold"
                : "border-transparent text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setCurrentTab(tab as typeof currentTab)}
          >
            {tab[0].toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Aktiver Tab */}
      {currentTab === "persoenlich" && (
        <TabPersoenlich mitglied={mitglied} onChange={handleChange} />
      )}
      {currentTab === "kontakt" && (
        <TabKontakt mitglied={mitglied} onChange={handleChange} />
      )}
      {currentTab === "bank" && (
        <TabBank mitglied={mitglied} onChange={handleChange} />
      )}
      {currentTab === "mitgliedschaft" && (
        <TabMitgliedschaft
          mitgliedschaft={{
            abteilungId: mitglied.abteilungId,
            gruppeId: mitglied.gruppeId,
            beitragsintervall: mitglied.beitragsintervall,
            beitragshoehe: mitglied.beitragshoehe,
            startdatum: mitglied.startdatum,
            enddatum: mitglied.enddatum,
            mandatsdatum: mitglied.mandatsdatum,
            mandatsreferenz: mitglied.mandatsreferenz,
          }}
          onChange={(field, value) =>
            handleChange(field as keyof Mitglied, value)
          }
        />
      )}

      {/* Aktionen */}
      <div className="flex justify-end gap-2 pt-4 border-t">
        <button onClick={onDone} className="text-gray-500">
          Abbrechen
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Speichern
        </button>
      </div>
    </div>
  );
}
