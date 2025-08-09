import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Gruppen() {
  const gruppen = useQuery(api.gruppen.list);
  const abteilungen = useQuery(api.abteilungen.list);
  const createGruppe = useMutation(api.gruppen.create);

  const abteilungsName = useMemo(() => {
    const map = new Map(abteilungen?.map((a) => [a._id, a.name]));
    return (id: Id<"abteilungen">) => map.get(id) ?? "Unbekannt";
  }, [abteilungen]);

  const [showForm, setShowForm] = useState(false);
  const [neu, setNeu] = useState({
    name: "",
    abteilungId: "" as Id<"abteilungen">,
    wochentag: "",
    uhrzeit: "",
    trainer: "",
    raum: "",
  });

  const speichern = async () => {
    if (!neu.name || !neu.abteilungId) return;
    await createGruppe(neu);
    setNeu({
      name: "",
      abteilungId: "" as Id<"abteilungen">,
      wochentag: "",
      uhrzeit: "",
      trainer: "",
      raum: "",
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Gruppen</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Abbrechen" : "+ Neu"}
        </button>
      </div>

      {showForm && (
        <div className="space-y-2 border rounded p-4 bg-gray-50">
          <div className="grid grid-cols-2 gap-4">
            <select
              className="border p-2 rounded"
              value={neu.abteilungId}
              onChange={(e) =>
                setNeu({
                  ...neu,
                  abteilungId: e.target.value as Id<"abteilungen">,
                })
              }
            >
              <option value="">Abteilung wählen</option>
              {abteilungen?.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.name}
                </option>
              ))}
            </select>
            <input
              className="border p-2 rounded"
              placeholder="Name"
              value={neu.name}
              onChange={(e) => setNeu({ ...neu, name: e.target.value })}
            />
            <input
              className="border p-2 rounded"
              placeholder="Wochentag"
              value={neu.wochentag}
              onChange={(e) => setNeu({ ...neu, wochentag: e.target.value })}
            />
            <input
              className="border p-2 rounded"
              placeholder="Uhrzeit"
              value={neu.uhrzeit}
              onChange={(e) => setNeu({ ...neu, uhrzeit: e.target.value })}
            />
            <input
              className="border p-2 rounded"
              placeholder="Trainer"
              value={neu.trainer}
              onChange={(e) => setNeu({ ...neu, trainer: e.target.value })}
            />
            <input
              className="border p-2 rounded"
              placeholder="Raum"
              value={neu.raum}
              onChange={(e) => setNeu({ ...neu, raum: e.target.value })}
            />
          </div>
          <button
            onClick={speichern}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Speichern
          </button>
        </div>
      )}

      {/* Tabelle */}
      <div className="border rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Abteilung</th>
              <th className="px-4 py-2">Wochentag</th>
              <th className="px-4 py-2">Uhrzeit</th>
              <th className="px-4 py-2">Trainer</th>
              <th className="px-4 py-2">Raum</th>
              <th className="px-4 py-2 text-right">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {gruppen?.map((g) => (
              <tr key={g._id} className="border-t">
                <td className="px-4 py-2">{g.name}</td>
                <td className="px-4 py-2">{abteilungsName(g.abteilungId)}</td>
                <td className="px-4 py-2">{g.wochentag ?? "-"}</td>
                <td className="px-4 py-2">{g.uhrzeit ?? "-"}</td>
                <td className="px-4 py-2">{g.trainer ?? "-"}</td>
                <td className="px-4 py-2">{g.raum ?? "-"}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-3 justify-end">
                    <Link
                      to={`/?abteilungId=${g.abteilungId}&gruppeId=${g._id}`}
                      className="underline text-blue-600 hover:text-blue-700"
                      title="Mitglieder dieser Gruppe anzeigen"
                    >
                      Mitglieder anzeigen
                    </Link>
                    <Link
                      to={`/gruppen/${g._id}/anwesenheit`}
                      className="underline"
                      title="Anwesenheitsliste drucken/exportieren"
                    >
                      Anwesenheit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
