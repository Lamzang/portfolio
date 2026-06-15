import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth, ADMIN_EMAIL } from "../contexts/auth";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user, isAdmin, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-sm text-neutral-500 dark:bg-neutral-950">
        로딩중…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center dark:bg-neutral-950">
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          이 계정({user.email})은 관리자 권한이 없습니다.
          <br />
          {ADMIN_EMAIL} 계정으로 로그인해주세요.
        </p>
        <button
          onClick={() => void signOut()}
          className="rounded-md border border-neutral-200 px-3 py-1.5 text-sm font-medium hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50"
        >
          로그아웃
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
