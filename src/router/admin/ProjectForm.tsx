import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import type { Article, LocalizedText, ProjectMeta } from "../../data/types";
import {
  deleteArticle,
  getProjectMeta,
  listArticles,
  saveProject,
} from "../../lib/content";
import { useI18n } from "../../contexts/i18n";
import { LocalizedInput, TextField } from "../../components/admin/Fields";

const EMPTY: LocalizedText = { ko: "", en: "" };

function emptyProject(): ProjectMeta {
  return {
    id: "",
    slug: "",
    icon: "📦",
    name: { ...EMPTY },
    tagline: { ...EMPTY },
    summary: { ...EMPTY },
    period: { ...EMPTY },
    role: { ...EMPTY },
    stack: [],
    order: 0,
  };
}

export default function ProjectForm() {
  const { slug } = useParams();
  const isEdit = Boolean(slug);
  const navigate = useNavigate();
  const { locale } = useI18n();

  const [form, setForm] = useState<ProjectMeta>(emptyProject);
  const [stackText, setStackText] = useState("");
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);

  const reloadArticles = (s: string) => listArticles(s).then(setArticles);

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    Promise.all([getProjectMeta(slug), listArticles(slug)]).then(
      ([meta, arts]) => {
        if (!alive) return;
        if (meta) {
          setForm(meta);
          setStackText(meta.stack.join(", "));
        }
        setArticles(arts);
        setLoading(false);
      },
    );
    return () => {
      alive = false;
    };
  }, [slug]);

  const patch = (p: Partial<ProjectMeta>) => setForm((f) => ({ ...f, ...p }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanSlug = form.slug.trim();
    if (!cleanSlug) return;
    setSaving(true);
    try {
      const stack = stackText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      await saveProject({ ...form, slug: cleanSlug, stack });
      navigate("/admin");
    } finally {
      setSaving(false);
    }
  };

  const onDeleteArticle = async (id: string) => {
    if (!slug) return;
    if (!window.confirm(`아티클 '${id}' 을 삭제할까요?`)) return;
    await deleteArticle(slug, id);
    await reloadArticles(slug);
  };

  if (loading) return <p className="text-sm text-neutral-500">로딩중…</p>;

  return (
    <div>
      <Link
        to="/admin"
        className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
      >
        ← 목록
      </Link>
      <h1 className="mt-3 text-2xl font-bold tracking-tight">
        {isEdit ? "프로젝트 수정" : "새 프로젝트"}
      </h1>

      <form onSubmit={(e) => void onSubmit(e)} className="mt-6 space-y-4">
        <div className="grid grid-cols-[90px_1fr] gap-3">
          <TextField
            label="아이콘"
            value={form.icon}
            onChange={(v) => patch({ icon: v })}
          />
          <TextField
            label="slug (URL 주소, 영문)"
            value={form.slug}
            onChange={(v) => patch({ slug: v })}
            placeholder="my-project"
            disabled={isEdit}
          />
        </div>
        <LocalizedInput
          label="이름"
          value={form.name}
          onChange={(v) => patch({ name: v })}
        />
        <LocalizedInput
          label="태그라인"
          value={form.tagline}
          onChange={(v) => patch({ tagline: v })}
        />
        <LocalizedInput
          label="요약"
          textarea
          value={form.summary}
          onChange={(v) => patch({ summary: v })}
        />
        <LocalizedInput
          label="기간"
          value={form.period}
          onChange={(v) => patch({ period: v })}
        />
        <LocalizedInput
          label="역할"
          value={form.role}
          onChange={(v) => patch({ role: v })}
        />
        <TextField
          label="기술 스택 (쉼표로 구분)"
          value={stackText}
          onChange={setStackText}
          placeholder="React, TypeScript, Three.js"
        />
        <TextField
          label="정렬 순서 (작을수록 먼저)"
          type="number"
          value={String(form.order ?? 0)}
          onChange={(v) => patch({ order: Number(v) || 0 })}
        />

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900"
          >
            {saving ? "저장중…" : "저장"}
          </button>
          <Link
            to="/admin"
            className="inline-flex items-center rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50"
          >
            취소
          </Link>
        </div>
      </form>

      {isEdit && (
        <section className="mt-12 border-t border-neutral-200/80 pt-8 dark:border-neutral-800/80">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold tracking-tight">아티클</h2>
            <Link
              to={`/admin/projects/${slug}/articles/new`}
              className="inline-flex items-center rounded-md border border-neutral-200 px-3 py-1.5 text-sm font-medium hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50"
            >
              + 새 아티클
            </Link>
          </div>
          {articles.length === 0 ? (
            <p className="mt-4 text-sm text-neutral-500">아직 아티클이 없습니다.</p>
          ) : (
            <ul className="mt-4 divide-y divide-neutral-200/80 dark:divide-neutral-800/80">
              {articles.map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <Link
                    to={`/admin/projects/${slug}/articles/${a.id}`}
                    className="min-w-0"
                  >
                    <span className="block truncate font-medium">
                      {a.title[locale] || a.id}
                    </span>
                    <span className="block truncate text-xs text-neutral-500">
                      /{a.id}
                    </span>
                  </Link>
                  <div className="flex shrink-0 items-center gap-3 text-sm">
                    <Link
                      to={`/admin/projects/${slug}/articles/${a.id}`}
                      className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
                    >
                      수정
                    </Link>
                    <button
                      onClick={() => void onDeleteArticle(a.id)}
                      className="text-red-600 hover:underline dark:text-red-400"
                    >
                      삭제
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
