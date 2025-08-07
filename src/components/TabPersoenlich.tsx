import type { Mitglied } from "../types";

interface Props {
  mitglied: Mitglied;
  onChange: (field: keyof Mitglied, value: string) => void;
}

export default function TabPersoenlich({ mitglied, onChange }: Props) {
  return (
    <div className="space-y-4">
      <Input label="Vorname" value={mitglied.vorname} onChange={(v) => onChange("vorname", v)} />
      <Input label="Nachname" value={mitglied.nachname} onChange={(v) => onChange("nachname", v)} />
      <Input label="Geburtsdatum" type="date" value={mitglied.geburtsdatum ?? ""} onChange={(v) => onChange("geburtsdatum", v)} />
      <Input label="Geschlecht" value={mitglied.geschlecht ?? ""} onChange={(v) => onChange("geschlecht", v)} />
      <Input label="Familienstand" value={mitglied.familienstand ?? ""} onChange={(v) => onChange("familienstand", v)} />
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: {
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
