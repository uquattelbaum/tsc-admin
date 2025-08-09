import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";

export default function Abteilungen() {
  const abteilungen = useQuery(api.abteilungen.list);
  const create = useMutation(api.abteilungen.create);

  const [showForm, setShowForm] = useState(false);
  const [neu, setNeu] = useState({
    name: "",
    beschreibung: "",
  });

  const speichern = async () => {
    if (!neu.name.trim()) return;
    await create(neu);
    setNeu({ name: "", beschreibung: "" });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Abteilungen</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Abbrechen" : "+ Neu"}
        </button>
      </div>

      {showForm && (
        <div className="space-y-2 border rounded p-4 bg-gray-50">
          <input
            className="border p-2 rounded w-full"
            placeholder="Name"
            value={neu.name}
            onChange={(e) => setNeu({ ...neu, name: e.target.value })}
          />
          <textarea
            className="border p-2 rounded w-full"
            placeholder="Beschreibung"
            value={neu.beschreibung}
            onChange={(e) => setNeu({ ...neu, beschreibung: e.target.value })}
          />
          <button
            onClick={speichern}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Speichern
          </button>
        </div>
      )}

      {/* Liste der Abteilungen */}
      <div className="border rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Beschreibung</th>
              <th className="px-4 py-2">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {abteilungen?.map((a) => (
              <tr key={a._id} className="border-t">
                <td className="px-4 py-2">{a.name}</td>
                <td className="px-4 py-2">{a.beschreibung ?? "-"}</td>
                <td className="px-4 py-2">
                  <Link
                    to={`/?abteilungId=${a._id}`}
                    className="underline text-blue-600 hover:text-blue-700"
                  >
                    Mitglieder anzeigen
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
