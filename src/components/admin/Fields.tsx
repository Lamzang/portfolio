import type { LocalizedText } from "../../data/types";

export const inputClass =
  "w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-400 disabled:opacity-60 dark:border-neutral-800 dark:bg-neutral-900 dark:focus:border-neutral-600";

const labelClass = "mb-1 block text-xs font-medium text-neutral-500";

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </label>
  );
}

export function TextareaField({
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass + " font-mono"}
      />
    </label>
  );
}

export function LocalizedInput({
  label,
  value,
  onChange,
  textarea,
  rows,
}: {
  label: string;
  value: LocalizedText;
  onChange: (v: LocalizedText) => void;
  textarea?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <span className={labelClass}>{label}</span>
      <div className="grid gap-2 sm:grid-cols-2">
        {textarea ? (
          <textarea
            className={inputClass}
            rows={rows ?? 3}
            placeholder="한국어"
            value={value.ko}
            onChange={(e) => onChange({ ko: e.target.value, en: value.en })}
          />
        ) : (
          <input
            className={inputClass}
            placeholder="한국어"
            value={value.ko}
            onChange={(e) => onChange({ ko: e.target.value, en: value.en })}
          />
        )}
        {textarea ? (
          <textarea
            className={inputClass}
            rows={rows ?? 3}
            placeholder="English"
            value={value.en}
            onChange={(e) => onChange({ ko: value.ko, en: e.target.value })}
          />
        ) : (
          <input
            className={inputClass}
            placeholder="English"
            value={value.en}
            onChange={(e) => onChange({ ko: value.ko, en: e.target.value })}
          />
        )}
      </div>
    </div>
  );
}
