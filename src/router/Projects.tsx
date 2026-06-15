import ProjectCard from "../components/ui/ProjectCard";
import { useI18n } from "../contexts/i18n";
import { useProjects } from "../lib/useContent";

export default function Projects() {
  const { t } = useI18n();
  const { projects, loading } = useProjects();
  return (
    <article className="mx-auto max-w-3xl px-6 py-14">
      <div className="mb-6 text-5xl leading-none select-none">📚</div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        {t("projects.page.title")}
      </h1>
      <p className="mt-3 text-sm text-neutral-500">
        {t("projects.page.subtitle")}
      </p>

      <hr className="my-8 border-neutral-200/80 dark:border-neutral-800/80" />

      <div className="grid gap-3 md:grid-cols-2">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-28 animate-pulse rounded-md border border-neutral-200/80 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/40"
              />
            ))
          : projects?.map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>
    </article>
  );
}
