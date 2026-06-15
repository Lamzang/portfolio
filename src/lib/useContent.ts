import { useEffect, useState } from "react";
import type { Article, Project, ProjectMeta } from "../data/types";
import { getArticle, getProjectWithArticles, listProjects } from "./content";

export function useProjects() {
  const [state, setState] = useState<{
    projects: ProjectMeta[] | null;
    error: Error | null;
  }>({ projects: null, error: null });

  useEffect(() => {
    let alive = true;
    listProjects()
      .then((projects) => alive && setState({ projects, error: null }))
      .catch((error: Error) => alive && setState({ projects: null, error }));
    return () => {
      alive = false;
    };
  }, []);

  return {
    projects: state.projects,
    loading: state.projects === null && !state.error,
    error: state.error,
  };
}

export function useProject(slug?: string) {
  const [state, setState] = useState<{
    slug?: string;
    project: Project | null;
    error: Error | null;
  }>({ project: null, error: null });

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    getProjectWithArticles(slug)
      .then((p) => alive && setState({ slug, project: p ?? null, error: null }))
      .catch((error: Error) => alive && setState({ slug, project: null, error }));
    return () => {
      alive = false;
    };
  }, [slug]);

  const settled = state.slug === slug;
  return {
    project: settled ? state.project : null,
    loading: Boolean(slug) && !settled,
    error: settled ? state.error : null,
  };
}

export function useArticle(slug?: string, articleId?: string) {
  const key = slug && articleId ? `${slug}/${articleId}` : undefined;
  const [state, setState] = useState<{
    key?: string;
    data: { project: Project; article: Article } | null;
    error: Error | null;
  }>({ data: null, error: null });

  useEffect(() => {
    if (!slug || !articleId) return;
    let alive = true;
    const requested = `${slug}/${articleId}`;
    getArticle(slug, articleId)
      .then(
        (d) =>
          alive && setState({ key: requested, data: d ?? null, error: null }),
      )
      .catch(
        (error: Error) =>
          alive && setState({ key: requested, data: null, error }),
      );
    return () => {
      alive = false;
    };
  }, [slug, articleId]);

  const settled = state.key === key;
  return {
    data: settled ? state.data : null,
    loading: Boolean(key) && !settled,
    error: settled ? state.error : null,
  };
}
