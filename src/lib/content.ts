import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Article, Project, ProjectMeta } from "../data/types";
import { projects as seedProjects } from "../data/projects";

function projectRef(slug: string) {
  return doc(db, "projects", slug);
}
function articlesRef(slug: string) {
  return collection(db, "projects", slug, "articles");
}
function articleRef(slug: string, id: string) {
  return doc(db, "projects", slug, "articles", id);
}

const byOrder = (a: { order?: number }, b: { order?: number }) =>
  (a.order ?? 0) - (b.order ?? 0);

// 프로젝트 목록은 자주 읽으므로 메모리에 캐시하고, 쓰기 시 무효화합니다.
let projectListCache: ProjectMeta[] | null = null;
function invalidate() {
  projectListCache = null;
}

export async function listProjects(): Promise<ProjectMeta[]> {
  if (projectListCache) return projectListCache;
  const snap = await getDocs(collection(db, "projects"));
  const list = snap.docs.map((d) => d.data() as ProjectMeta).sort(byOrder);
  projectListCache = list;
  return list;
}

export async function getProjectMeta(
  slug: string,
): Promise<ProjectMeta | undefined> {
  const snap = await getDoc(projectRef(slug));
  return snap.exists() ? (snap.data() as ProjectMeta) : undefined;
}

export async function getProjectWithArticles(
  slug: string,
): Promise<Project | undefined> {
  const [metaSnap, articlesSnap] = await Promise.all([
    getDoc(projectRef(slug)),
    getDocs(articlesRef(slug)),
  ]);
  if (!metaSnap.exists()) return undefined;
  const meta = metaSnap.data() as ProjectMeta;
  const articles = articlesSnap.docs
    .map((d) => d.data() as Article)
    .sort(byOrder);
  return { ...meta, articles };
}

export async function getArticle(slug: string, articleId: string) {
  const project = await getProjectWithArticles(slug);
  if (!project) return undefined;
  const article = project.articles.find((a) => a.id === articleId);
  if (!article) return undefined;
  return { project, article };
}

export async function getArticleById(
  slug: string,
  articleId: string,
): Promise<Article | undefined> {
  const snap = await getDoc(articleRef(slug, articleId));
  return snap.exists() ? (snap.data() as Article) : undefined;
}

export async function listArticles(slug: string): Promise<Article[]> {
  const snap = await getDocs(articlesRef(slug));
  return snap.docs.map((d) => d.data() as Article).sort(byOrder);
}

export async function saveProject(meta: ProjectMeta): Promise<void> {
  await setDoc(projectRef(meta.slug), { ...meta, id: meta.id || meta.slug });
  invalidate();
}

export async function deleteProject(slug: string): Promise<void> {
  const articlesSnap = await getDocs(articlesRef(slug));
  const batch = writeBatch(db);
  articlesSnap.docs.forEach((d) => batch.delete(d.ref));
  batch.delete(projectRef(slug));
  await batch.commit();
  invalidate();
}

export async function saveArticle(
  slug: string,
  article: Article,
): Promise<void> {
  await setDoc(articleRef(slug, article.id), article);
  invalidate();
}

export async function deleteArticle(
  slug: string,
  articleId: string,
): Promise<void> {
  await deleteDoc(articleRef(slug, articleId));
  invalidate();
}

// 기존 정적 데이터(src/data/projects.ts)를 Firestore 로 1회 이전합니다.
export async function seedFromStaticData(): Promise<void> {
  const batch = writeBatch(db);
  seedProjects.forEach((project, projectIndex) => {
    const { articles, ...meta } = project;
    batch.set(projectRef(project.slug), { ...meta, order: projectIndex });
    articles.forEach((article, articleIndex) => {
      batch.set(articleRef(project.slug, article.id), {
        ...article,
        order: articleIndex,
      });
    });
  });
  await batch.commit();
  invalidate();
}
