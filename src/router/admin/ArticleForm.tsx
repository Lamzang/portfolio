import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import type { Article, LocalizedText } from "../../data/types";
import { getArticleById, saveArticle } from "../../lib/content";
import {
  LocalizedInput,
  TextField,
} from "../../components/admin/Fields";
import BlockEditor from "../../components/admin/BlockEditor";

const EMPTY: LocalizedText = { ko: "", en: "" };

function emptyArticle(): Article {
  return {
    id: "",
    title: { ...EMPTY },
    summary: { ...EMPTY },
    body: { ...EMPTY },
    tags: [],
    content: [],
    order: 0,
  };
}

export default function ArticleForm() {
  const { slug, articleId } = useParams();
  const isEdit = Boolean(articleId);
  const navigate = useNavigate();

  const [form, setForm] = useState<Article>(emptyArticle);
  const [tagsText, setTagsText] = useState("");
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!slug || !articleId) return;
    let alive = true;
    getArticleById(slug, articleId).then((a) => {
      if (!alive) return;
      if (a) {
        setForm(a);
        setTagsText((a.tags ?? []).join(", "));
      }
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [slug, articleId]);

  const patch = (p: Partial<Article>) => setForm((f) => ({ ...f, ...p }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!slug) return;
    const cleanId = form.id.trim();
    if (!cleanId) return;
    setSaving(true);
    try {
      const tags = tagsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const article: Article = {
        ...form,
        id: cleanId,
        tags: tags.length ? tags : undefined,
        publishedAt: form.publishedAt?.trim() || undefined,
        readingMinutes: form.readingMinutes || undefined,
      };
      await saveArticle(slug, article);
      navigate(`/admin/projects/${slug}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm text-neutral-500">로딩중…</p>;

  return (
    <div>
      <Link
        to={`/admin/projects/${slug}`}
        className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
      >
        ← 프로젝트로
      </Link>
      <h1 className="mt-3 text-2xl font-bold tracking-tight">
        {isEdit ? "아티클 수정" : "새 아티클"}
      </h1>

      <form onSubmit={(e) => void onSubmit(e)} className="mt-6 space-y-4">
        <TextField
          label="id (URL 주소, 영문)"
          value={form.id}
          onChange={(v) => patch({ id: v })}
          placeholder="my-first-article"
          disabled={isEdit}
        />
        <LocalizedInput
          label="제목"
          value={form.title}
          onChange={(v) => patch({ title: v })}
        />
        <LocalizedInput
          label="요약 (한 줄)"
          value={form.summary}
          onChange={(v) => patch({ summary: v })}
        />
        <LocalizedInput
          label="미리보기 본문 (프로젝트 페이지에 노출)"
          textarea
          value={form.body}
          onChange={(v) => patch({ body: v })}
        />

        <div className="grid gap-3 sm:grid-cols-3">
          <TextField
            label="발행일 (선택)"
            value={form.publishedAt ?? ""}
            onChange={(v) => patch({ publishedAt: v })}
            placeholder="2026-01-01"
          />
          <TextField
            label="읽는 시간(분, 선택)"
            type="number"
            value={form.readingMinutes != null ? String(form.readingMinutes) : ""}
            onChange={(v) =>
              patch({ readingMinutes: v ? Number(v) : undefined })
            }
          />
          <TextField
            label="정렬 순서"
            type="number"
            value={String(form.order ?? 0)}
            onChange={(v) => patch({ order: Number(v) || 0 })}
          />
        </div>

        <TextField
          label="태그 (쉼표로 구분, 선택)"
          value={tagsText}
          onChange={setTagsText}
          placeholder="three-js, webgl"
        />

        <div>
          <span className="mb-2 block text-xs font-medium text-neutral-500">
            본문 블록 (상세 페이지)
          </span>
          <BlockEditor
            value={form.content ?? []}
            onChange={(content) => patch({ content })}
          />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900"
          >
            {saving ? "저장중…" : "저장"}
          </button>
          <Link
            to={`/admin/projects/${slug}`}
            className="inline-flex items-center rounded-md border border-neutral-200 px-4 py-2 text-sm font-medium hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50"
          >
            취소
          </Link>
        </div>
      </form>
    </div>
  );
}
