import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { ProjectMeta } from "../../data/types";
import {
  deleteProject,
  listProjects,
  seedFromStaticData,
} from "../../lib/content";
import { useI18n } from "../../contexts/i18n";

export default function AdminDashboard() {
  const { locale } = useI18n();
  const [projects, setProjects] = useState<ProjectMeta[] | null>(null);
  const [busy, setBusy] = useState(false);

  const reload = () => listProjects().then(setProjects);
  useEffect(() => {
    void reload();
  }, []);

  const onSeed = async () => {
    if (
      !window.confirm(
        "기존 정적 데이터(프로젝트 3개)를 Firestore로 가져올까요? 같은 slug는 덮어씁니다.",
      )
    )
      return;
    setBusy(true);
    try {
      await seedFromStaticData();
      await reload();
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async (slug: string) => {
    if (!window.confirm(`'${slug}' 프로젝트와 모든 아티클을 삭제할까요?`)) return;
    setBusy(true);
    try {
      await deleteProject(slug);
      await reload();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold tracking-tight">프로젝트</h1>
        <div className="flex gap-2">
          <button
            onClick={() => void onSeed()}
            disabled={busy}
            className="inline-flex items-center rounded-md border border-neutral-200 px-3 py-1.5 text-sm font-medium hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50"
          >
            기존 데이터 가져오기
          </button>
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 dark:bg-neutral-100 dark:text-neutral-900"
          >
            + 새 프로젝트
          </Link>
        </div>
      </div>

      {projects === null ? (
        <p className="mt-8 text-sm text-neutral-500">로딩중…</p>
      ) : projects.length === 0 ? (
        <p className="mt-8 text-sm text-neutral-500">
          아직 프로젝트가 없습니다. “기존 데이터 가져오기”로 시작하거나 새로
          추가하세요.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-neutral-200/80 dark:divide-neutral-800/80">
          {projects.map((p) => (
            <li key={p.slug} className="flex items-center justify-between gap-3 py-3">
              <Link
                to={`/admin/projects/${p.slug}`}
                className="flex min-w-0 items-center gap-3"
              >
                <span className="select-none text-xl">{p.icon}</span>
                <span className="min-w-0">
                  <span className="block truncate font-medium">
                    {p.name[locale]}
                  </span>
                  <span className="block truncate text-xs text-neutral-500">
                    /{p.slug}
                  </span>
                </span>
              </Link>
              <div className="flex shrink-0 items-center gap-3 text-sm">
                <Link
                  to={`/admin/projects/${p.slug}`}
                  className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
                >
                  수정
                </Link>
                <button
                  onClick={() => void onDelete(p.slug)}
                  disabled={busy}
                  className="text-red-600 hover:underline disabled:opacity-50 dark:text-red-400"
                >
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
