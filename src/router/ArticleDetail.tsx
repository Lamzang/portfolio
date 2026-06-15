import { NavLink, useParams } from "react-router";
import { useArticle } from "../lib/useContent";
import { useI18n } from "../contexts/i18n";
import ArticleBlock from "../components/ui/ArticleBlock";

export default function ArticleDetail() {
  const { slug, articleId } = useParams();
  const { locale, t } = useI18n();

  const { data: found, loading } = useArticle(slug, articleId);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center text-sm text-neutral-500">
        로딩중…
      </div>
    );
  }

  if (!found) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-sm text-neutral-500">{t("article.notFound")}</p>
        <NavLink
          to={slug ? `/projects/${slug}` : "/projects"}
          className="mt-4 inline-flex items-center rounded-md border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-sm font-medium"
        >
          {t("article.back")}
        </NavLink>
      </div>
    );
  }

  const { project, article } = found;
  const others = project.articles.filter((a) => a.id !== article.id);

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <NavLink
        to={`/projects/${project.slug}`}
        className="inline-flex items-center rounded px-1 py-0.5 text-xs text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
      >
        {t("article.back")}
      </NavLink>

      <header className="mt-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-400">
          <span className="select-none">{project.icon}</span>
          <span>{project.name[locale]}</span>
        </div>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
          {article.title[locale]}
        </h1>
        <p className="mt-4 text-base text-neutral-500 dark:text-neutral-400">
          {article.summary[locale]}
        </p>

        {(article.publishedAt || article.readingMinutes) && (
          <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
            {article.publishedAt && <span>{article.publishedAt}</span>}
            {article.publishedAt && article.readingMinutes != null && (
              <span aria-hidden>·</span>
            )}
            {article.readingMinutes != null && (
              <span>
                {article.readingMinutes} {t("article.minRead")}
              </span>
            )}
          </div>
        )}

        {article.tags && article.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 text-[11px] text-neutral-700 dark:text-neutral-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <hr className="my-10 border-neutral-200/80 dark:border-neutral-800/80" />

      <div className="space-y-5">
        {article.content && article.content.length > 0 ? (
          article.content.map((block, i) => (
            <ArticleBlock key={i} block={block} locale={locale} />
          ))
        ) : (
          <p className="leading-7 text-neutral-800 dark:text-neutral-200">
            {article.body[locale]}
          </p>
        )}
      </div>

      {others.length > 0 && (
        <>
          <hr className="my-12 border-neutral-200/80 dark:border-neutral-800/80" />
          <section>
            <h2 className="text-sm font-semibold tracking-tight text-neutral-500">
              {t("article.more")}
            </h2>
            <ul className="mt-4 space-y-1">
              {others.map((a) => (
                <li key={a.id}>
                  <NavLink
                    to={`/projects/${project.slug}/articles/${a.id}`}
                    className="-mx-3 block rounded-md px-3 py-3 transition hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
                  >
                    <div className="font-medium tracking-tight">
                      {a.title[locale]}
                    </div>
                    <div className="mt-1 text-sm text-neutral-500">
                      {a.summary[locale]}
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </article>
  );
}
