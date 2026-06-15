import { useState } from "react";
import { Link, Navigate } from "react-router";
import { ADMIN_EMAIL, useAuth } from "../../contexts/auth";

export default function AdminLogin() {
  const { user, isAdmin, loading, signIn, signOut } = useAuth();
  const [error, setError] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-sm text-neutral-500 dark:bg-neutral-950">
        로딩중…
      </div>
    );
  }

  if (user && isAdmin) return <Navigate to="/admin" replace />;

  const onSignIn = () => {
    setError(null);
    signIn().catch((e: unknown) => {
      if (e instanceof Error && e.message.includes("popup-closed")) return;
      setError("로그인에 실패했습니다. 다시 시도해주세요.");
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 dark:bg-neutral-950">
      <div className="w-full max-w-sm rounded-lg border border-neutral-200 p-8 text-center dark:border-neutral-800">
        <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          관리자 로그인
        </h1>
        <p className="mt-2 text-sm text-neutral-500">
          콘텐츠를 추가·수정하려면 관리자 계정으로 로그인하세요.
        </p>

        {user && !isAdmin ? (
          <div className="mt-6 space-y-3">
            <p className="text-sm text-red-600 dark:text-red-400">
              {user.email} 은 권한이 없습니다.
              <br />
              {ADMIN_EMAIL} 계정으로 로그인하세요.
            </p>
            <button
              onClick={() => void signOut()}
              className="inline-flex w-full items-center justify-center rounded-md border border-neutral-200 px-3 py-2 text-sm font-medium hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50"
            >
              다른 계정으로 로그인
            </button>
          </div>
        ) : (
          <button
            onClick={onSignIn}
            className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:opacity-90 dark:bg-neutral-100 dark:text-neutral-900"
          >
            Google로 로그인
          </button>
        )}

        {error && <p className="mt-3 text-xs text-red-600 dark:text-red-400">{error}</p>}

        <Link
          to="/"
          className="mt-6 inline-block text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          ← 사이트로 돌아가기
        </Link>
      </div>
    </div>
  );
}
