import type { Mitglied } from "../types";

interface Props {
  mitglied: Mitglied;
  onChange: (field: keyof Mitglied, value: string) => void;
}

export default function TabBank({ mitglied, onChange }: Props) {
  return (
    <div className="space-y-4">
      <Input
        label="Kontoinhaber"
        value={mitglied.kontoinhaber ?? ""}
        onChange={(v) => onChange("kontoinhaber", v)}
      />
      <Input
        label="IBAN"
        value={mitglied.iban ?? ""}
        onChange={(v) => onChange("iban", v)}
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
