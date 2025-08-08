import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import MitgliedFormular from "../components/MitgliedFormular";

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
  const mitglieder = useQuery(api.mitglieder.list);
  const loeschen = useMutation(api.mitglieder.remove);

  type BearbeitungsStatus = string | null | undefined;
  const [zuBearbeiten, setZuBearbeiten] = useState<BearbeitungsStatus>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Mitglieder</h1>

      <div className="flex flex-col sm:flex-row sm:justify-end mb-4">
        <Button
          onClick={() => setZuBearbeiten(undefined)}
          className="w-full sm:w-auto flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Neues Mitglied
        </Button>
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
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700"
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
