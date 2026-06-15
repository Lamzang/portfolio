import { NavLink, useParams } from "react-router";
import { useProject } from "../lib/useContent";
import { useI18n } from "../contexts/i18n";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { locale, t } = useI18n();
  const { project, loading } = useProject(slug);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center text-sm text-neutral-500">
        로딩중…
      </div>
    );
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-sm text-neutral-500">{t("detail.notFound")}</p>
        <NavLink
          to="/projects"
          className="mt-4 inline-flex items-center rounded-md border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-sm font-medium"
        >
          {t("detail.back")}
        </NavLink>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <NavLink
        to="/projects"
        className="inline-flex items-center rounded px-1 py-0.5 text-xs text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
      >
        {t("detail.back")}
      </NavLink>

      <div className="mt-8 text-6xl leading-none select-none">
        {project.icon}
      </div>
      <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
        {project.name[locale]}
      </h1>
      <p className="mt-3 text-base text-neutral-500 dark:text-neutral-400">
        {project.tagline[locale]}
      </p>

      {/* Notion-style properties */}
      <dl className="mt-8 grid grid-cols-[90px_1fr] gap-y-2 text-sm">
        <dt className="text-neutral-500">{t("detail.period")}</dt>
        <dd>{project.period[locale]}</dd>
        <dt className="text-neutral-500">{t("detail.role")}</dt>
        <dd>{project.role[locale]}</dd>
        <dt className="text-neutral-500">{t("detail.stack")}</dt>
        <dd className="flex flex-wrap gap-1">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 text-[11px] text-neutral-700 dark:text-neutral-300"
            >
              {s}
            </span>
          ))}
        </dd>
      </dl>

      <hr className="my-10 border-neutral-200/80 dark:border-neutral-800/80" />

      {/* Overview */}
      <section>
        <h2 className="text-lg font-semibold tracking-tight">
          {t("detail.overview")}
        </h2>
        <p className="mt-3 leading-relaxed text-neutral-800 dark:text-neutral-200">
          {project.summary[locale]}
        </p>
      </section>

      <hr className="my-10 border-neutral-200/80 dark:border-neutral-800/80" />

      {/* Articles */}
      <section>
        <h2 className="text-lg font-semibold tracking-tight">
          {t("detail.articles")}
        </h2>
        <div className="mt-6 space-y-10">
          {project.articles.map((a, idx) => (
            <article key={a.id}>
              <div className="font-mono text-xs text-neutral-400">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-1 text-2xl font-bold tracking-tight">
                {a.title[locale]}
              </h3>
              <p className="mt-2 text-sm text-neutral-500">
                {a.summary[locale]}
              </p>
              <p className="mt-4 leading-relaxed text-neutral-800 dark:text-neutral-200">
                {a.body[locale]}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-neutral-500">
                {a.publishedAt && <span>{a.publishedAt}</span>}
                {a.publishedAt && a.readingMinutes != null && (
                  <span aria-hidden>·</span>
                )}
                {a.readingMinutes != null && (
                  <span>
                    {a.readingMinutes} {t("article.minRead")}
                  </span>
                )}
              </div>
              <NavLink
                to={`/projects/${project.slug}/articles/${a.id}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 underline-offset-4 hover:text-neutral-900 dark:hover:text-neutral-100 hover:underline"
              >
                {t("detail.readMore")}
              </NavLink>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}
