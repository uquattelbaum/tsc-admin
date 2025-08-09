import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import MitgliedFormular from "../components/MitgliedFormular";
import type { Id } from "../../convex/_generated/dataModel";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

export default function Mitglieder() {
  // URL-Parameter (Deeplinks) lesen/schreiben
  const [params, setParams] = useSearchParams();
  const abteilungId = (params.get("abteilungId") || undefined) as
    | Id<"abteilungen">
    | undefined;
  const gruppeId = (params.get("gruppeId") || undefined) as
    | Id<"gruppen">
    | undefined;
  const search = params.get("q") || undefined;

  // Daten laden
  const abteilungen = useQuery(api.abteilungen.list);
  const gruppen = useQuery(api.gruppen.list); // wir filtern clientseitig nach abteilungId
  const mitglieder = useQuery(api.mitglieder.list, {
    abteilungId,
    gruppeId,
    search,
  });

  const loeschen = useMutation(api.mitglieder.remove);

  type BearbeitungsStatus = string | null | undefined;
  const [zuBearbeiten, setZuBearbeiten] = useState<BearbeitungsStatus>(null);

  function setFilter(key: string, value?: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);

    // Wenn Abteilung entfernt wird, Gruppe ebenfalls entfernen
    if (key === "abteilungId" && !value) next.delete("gruppeId");

    setParams(next, { replace: true });
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Mitglieder</h1>

      {/* Filterleiste */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Abteilung */}
          <select
            className="border p-2 rounded min-w-[14rem]"
            value={abteilungId ?? ""}
            onChange={(e) =>
              setFilter("abteilungId", e.target.value || undefined)
            }
          >
            <option value="">Alle Abteilungen</option>
            {abteilungen?.map((a) => (
              <option key={a._id} value={a._id}>
                {a.name}
              </option>
            ))}
          </select>

          {/* Gruppe (abhängig von Abteilung) */}
          <select
            className="border p-2 rounded min-w-[14rem]"
            value={gruppeId ?? ""}
            onChange={(e) => setFilter("gruppeId", e.target.value || undefined)}
            disabled={!abteilungId}
            title={!abteilungId ? "Erst Abteilung wählen" : undefined}
          >
            <option value="">
              {abteilungId ? "Alle Gruppen" : "Gruppe (Abteilung wählen)"}
            </option>
            {gruppen
              ?.filter((g) => g.abteilungId === abteilungId)
              .map((g) => (
                <option key={g._id} value={g._id}>
                  {g.name}
                </option>
              ))}
          </select>

          {/* Suche */}
          <input
            className="border p-2 rounded"
            placeholder="Suchen (Name, E-Mail)"
            defaultValue={search ?? ""}
            onChange={(e) => setFilter("q", e.target.value || undefined)}
          />
        </div>

        <div className="flex gap-2">
          {(abteilungId || gruppeId || search) && (
            <button
              className="text-sm underline"
              onClick={() =>
                setParams(new URLSearchParams(), { replace: true })
              }
            >
              Filter zurücksetzen
            </button>
          )}
          <Button
            onClick={() => setZuBearbeiten(undefined)}
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Neues Mitglied
          </Button>
        </div>
      </div>

      {/* Bearbeitungsformular */}
      {zuBearbeiten !== null && (
        <MitgliedFormular
          initial={
            typeof zuBearbeiten === "string"
              ? mitglieder?.find((m) => m._id === zuBearbeiten)
              : undefined
          }
          onDone={() => setZuBearbeiten(null)}
        />
      )}

      {/* Tabelle */}
      <div className="overflow-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr className="text-left">
              <th className="px-4 py-2">Vorname</th>
              <th className="px-4 py-2">Nachname</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2 text-right">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {mitglieder?.map((m) => (
              <tr key={m._id} className="border-t hover:bg-accent">
                <td className="px-4 py-2">{m.vorname}</td>
                <td className="px-4 py-2">{m.nachname}</td>
                <td className="px-4 py-2">{m.email ?? "-"}</td>
                <td className="px-4 py-2 text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setZuBearbeiten(m._id)}
                    title="Bearbeiten"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700"
                        title="Löschen"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Mitglied löschen?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Diese Aktion kann nicht rückgängig gemacht werden.
                          Bist du sicher, dass du{" "}
                          <b>
                            {m.vorname} {m.nachname}
                          </b>{" "}
                          löschen möchtest?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => loeschen({ id: m._id })}
                        >
                          Löschen
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
