import { useI18n } from "../contexts/i18n";

export default function Contact() {
  const { t } = useI18n();
  return (
    <article className="mx-auto max-w-3xl px-6 py-14">
      <div className="mb-6 text-5xl leading-none select-none">✉️</div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        {t("nav.contact")}
      </h1>
      <dl className="mt-8 grid grid-cols-[90px_1fr] gap-y-2 text-sm">
        <dt className="text-neutral-500">Email</dt>
        <dd>
          <a
            href="mailto:idy11277@gmail.com"
            className="underline-offset-2 hover:underline"
          >
            idy11277@gmail.com
          </a>
        </dd>
        <dt className="text-neutral-500">Github</dt>
        <dd>
          <a
            href="https://github.com/Lamzang"
            className="underline-offset-2 hover:underline"
          >
            github.com/Lamzang
          </a>
        </dd>
      </dl>
    </article>
  );
}
