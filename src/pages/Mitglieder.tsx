import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import MitgliedFormular from "../components/MitgliedFormular";
//import type { Mitglied } from "../types";
import type { Id } from "../../convex/_generated/dataModel";

export default function Mitglieder() {
  const mitglieder = useQuery(api.mitglieder.list);
  const remove = useMutation(api.mitglieder.remove);

  const [bearbeitenId, setBearbeitenId] = useState<Id<"mitglieder"> | null>(null);
  const [showForm, setShowForm] = useState(false);

  const startNeu = () => {
    setBearbeitenId(null);
    setShowForm(true);
  };

  const startBearbeiten = (id: Id<"mitglieder">) => {
    setBearbeitenId(id);
    setShowForm(true);
  };

  const löschen = async (id: Id<"mitglieder">) => {
    if (confirm("Mitglied wirklich löschen?")) {
      await remove({ id });
    }
  };

  const schliessen = () => {
    setBearbeitenId(null);
    setShowForm(false);
  };

  const zuBearbeiten = mitglieder?.find((m) => m._id === bearbeitenId) ?? null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Mitglieder</h1>
        <button
          onClick={startNeu}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Neu
        </button>
      </div>

      {showForm && (
        <div className="border p-4 rounded bg-gray-50">
          <MitgliedFormular
            initial={zuBearbeiten ?? undefined}
            onDone={schliessen}
          />
        </div>
      )}

      <div className="border rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Vorname</th>
              <th className="px-4 py-2">Nachname</th>
              <th className="px-4 py-2">Geburtstag</th>
              <th className="px-4 py-2">E-Mail</th>
              <th className="px-4 py-2">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {mitglieder?.map((m) => (
              <tr key={m._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{m.vorname}</td>
                <td className="px-4 py-2">{m.nachname}</td>
                <td className="px-4 py-2">{m.geburtstag ?? "-"}</td>
                <td className="px-4 py-2">{m.email ?? "-"}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => startBearbeiten(m._id)}
                    className="text-blue-600 hover:underline"
                  >
                    Bearbeiten
                  </button>
                  <button
                    onClick={() => löschen(m._id)}
                    className="text-red-600 hover:underline"
                  >
                    Löschen
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
