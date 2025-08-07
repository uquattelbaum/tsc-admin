import type { Mitglied } from "../types";

interface Props {
  mitgliedschaft: Partial<Mitglied>;
  onChange: (field: keyof Mitglied, value: string) => void;
}

export default function TabMitgliedschaft({ mitgliedschaft, onChange }: Props) {
  return (
    <div className="space-y-4">
      <Input
        label="Abteilung"
        value={mitgliedschaft.abteilungId ?? ""}
        onChange={(v) => onChange("abteilungId", v)}
      />
      <Input
        label="Gruppe"
        value={mitgliedschaft.gruppeId ?? ""}
        onChange={(v) => onChange("gruppeId", v)}
      />
      <Input
        label="Beitragsintervall"
        value={mitgliedschaft.beitragsintervall ?? ""}
        onChange={(v) => onChange("beitragsintervall", v)}
      />
      <Input
        label="Beitragshöhe"
        value={mitgliedschaft.beitragshoehe ?? ""}
        onChange={(v) => onChange("beitragshoehe", v)}
      />
      <Input
        label="Startdatum"
        type="date"
        value={mitgliedschaft.startdatum ?? ""}
        onChange={(v) => onChange("startdatum", v)}
      />
      <Input
        label="Enddatum"
        type="date"
        value={mitgliedschaft.enddatum ?? ""}
        onChange={(v) => onChange("enddatum", v)}
      />
      <Input
        label="Mandatsdatum"
        type="date"
        value={mitgliedschaft.mandatsdatum ?? ""}
        onChange={(v) => onChange("mandatsdatum", v)}
      />
      <Input
        label="Mandatsreferenz"
        value={mitgliedschaft.mandatsreferenz ?? ""}
        onChange={(v) => onChange("mandatsreferenz", v)}
      />
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />
    </div>
  );
}
