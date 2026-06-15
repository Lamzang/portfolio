import { useI18n } from "../contexts/i18n";

export default function Services() {
  const { t } = useI18n();
  return (
    <article className="mx-auto max-w-3xl px-6 py-14">
      <div className="mb-6 text-5xl leading-none select-none">🛠️</div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        {t("nav.services")}
      </h1>
      <p className="mt-3 text-sm text-neutral-500">
        {t("home.services.subtitle")}
      </p>
    </article>
  );
}
