import { useI18n } from "../contexts/i18n";

export default function LanguageToggle() {
  const { locale, toggle } = useI18n();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle language"
      className="rounded px-2 py-1 text-xs text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
    >
      <span
        className={
          locale === "ko"
            ? "text-neutral-900 dark:text-neutral-100 font-medium"
            : ""
        }
      >
        KO
      </span>
      <span className="mx-1 text-neutral-300 dark:text-neutral-700">/</span>
      <span
        className={
          locale === "en"
            ? "text-neutral-900 dark:text-neutral-100 font-medium"
            : ""
        }
      >
        EN
      </span>
    </button>
  );
}
