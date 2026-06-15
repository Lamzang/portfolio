import { NavLink } from "react-router";
import ProjectCard from "./components/ui/ProjectCard";
import { useI18n } from "./contexts/i18n";
import { useProjects } from "./lib/useContent";

export default function Home() {
  const { t } = useI18n();
  const { projects, loading } = useProjects();
  const whatIDo = ["1", "2", "3"] as const;

  return (
    <article className="mx-auto max-w-3xl px-6 py-14">
      {/* page icon — Notion page-cover style */}

      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        {t("home.hero.title")}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
        {t("home.hero.subtitle")}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <NavLink
          to="/projects"
          className="inline-flex items-center rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 dark:bg-neutral-100 dark:text-neutral-900 transition"
        >
          {t("home.hero.cta.projects")}
        </NavLink>
        <NavLink
          to="/resume"
          className="inline-flex items-center rounded-md border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition"
        >
          {t("home.hero.cta.resume")}
        </NavLink>
      </div>

      <hr className="my-12 border-neutral-200/80 dark:border-neutral-800/80" />

      {/* Projects */}
      <section aria-labelledby="projects-title">
        <div className="flex items-baseline justify-between">
          <h2
            id="projects-title"
            className="text-lg font-semibold tracking-tight"
          >
            {t("home.projects.title")}
          </h2>
          <NavLink
            to="/projects"
            className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            {t("home.projects.viewAll")}
          </NavLink>
        </div>
        <p className="mt-1 text-sm text-neutral-500">
          {t("home.projects.subtitle")}
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="h-28 animate-pulse rounded-md border border-neutral-200/80 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/40"
                />
              ))
            : projects?.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      </section>

      <hr className="my-12 border-neutral-200/80 dark:border-neutral-800/80" />

      {/* What I Do */}
      <section aria-labelledby="what-i-do-title">
        <h2
          id="what-i-do-title"
          className="text-lg font-semibold tracking-tight"
        >
          {t("home.whatIDo.title")}
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          {t("home.whatIDo.subtitle")}
        </p>

        <div className="mt-3 divide-y divide-neutral-200/80 dark:divide-neutral-800/80">
          {whatIDo.map((k) => (
            <div key={k} className="py-4">
              <div className="font-medium">
                {t(`home.whatIDo.${k}.title` as const)}
              </div>
              <div className="mt-1 text-sm text-neutral-500">
                {t(`home.whatIDo.${k}.desc` as const)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-12 border-neutral-200/80 dark:border-neutral-800/80" />

      {/* Services */}
      <section aria-labelledby="services-title">
        <h2
          id="services-title"
          className="text-lg font-semibold tracking-tight"
        >
          {t("home.services.title")}
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          {t("home.services.subtitle")}
        </p>

        <ul className="mt-4 space-y-2 text-sm text-neutral-800 dark:text-neutral-200">
          <li className="flex gap-2">
            <span className="text-neutral-400">•</span>
            <span>{t("home.services.li1")}</span>
          </li>
          <li className="flex gap-2">
            <span className="text-neutral-400">•</span>
            <span>{t("home.services.li2")}</span>
          </li>
          <li className="flex gap-2">
            <span className="text-neutral-400">•</span>
            <span>{t("home.services.li3")}</span>
          </li>
        </ul>

        <NavLink
          to="/services"
          className="mt-5 inline-flex items-center rounded-md border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition"
        >
          {t("home.services.cta")}
        </NavLink>
      </section>

      <hr className="my-12 border-neutral-200/80 dark:border-neutral-800/80" />

      {/* Contact */}
      <section aria-labelledby="contact-title">
        <h2 id="contact-title" className="text-lg font-semibold tracking-tight">
          {t("home.contact.title")}
        </h2>
        <dl className="mt-4 grid grid-cols-[80px_1fr] gap-y-2 text-sm">
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
      </section>
    </article>
  );
}
