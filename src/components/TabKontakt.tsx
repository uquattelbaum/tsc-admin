import type { Mitglied } from "../types";

interface Props {
  mitglied: Mitglied;
  onChange: (field: keyof Mitglied, value: string) => void;
}

export default function TabKontakt({ mitglied, onChange }: Props) {
  return (
    <div className="space-y-4">
      <Input label="Straße" value={mitglied.strasse ?? ""} onChange={(v) => onChange("strasse", v)} />
      <Input label="PLZ" value={mitglied.plz ?? ""} onChange={(v) => onChange("plz", v)} />
      <Input label="Ort" value={mitglied.ort ?? ""} onChange={(v) => onChange("ort", v)} />
      <Input label="Telefon (Festnetz)" value={mitglied.telefon ?? ""} onChange={(v) => onChange("telefon", v)} />
      <Input label="Mobil (Handy)" value={mitglied.mobil ?? ""} onChange={(v) => onChange("mobil", v)} />
      <Input label="E-Mail" value={mitglied.email ?? ""} onChange={(v) => onChange("email", v)} />
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
