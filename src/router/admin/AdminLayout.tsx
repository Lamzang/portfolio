import { Link, Outlet } from "react-router";
import { useAuth } from "../../contexts/auth";

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <header className="sticky top-0 z-20 border-b border-neutral-200/70 bg-white/85 backdrop-blur dark:border-neutral-800/70 dark:bg-neutral-950/85">
        <div className="mx-auto flex h-12 max-w-3xl items-center justify-between px-6">
          <Link to="/admin" className="text-sm font-semibold tracking-tight">
            관리자
          </Link>
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <span className="hidden sm:inline">{user?.email}</span>
            <Link
              to="/"
              className="hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              사이트 보기
            </Link>
            <button
              onClick={() => void signOut()}
              className="rounded border border-neutral-200 px-2 py-1 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800/50"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
