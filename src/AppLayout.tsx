import { NavLink, Outlet } from "react-router";
import AppNavLink from "./components/navLink";
import ThemeToggle from "./components/ThemeToggle";
import LanguageToggle from "./components/LanguageToggle";
import { useI18n } from "./contexts/i18n";

export default function AppLayout() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <header className="sticky top-0 z-20 border-b border-neutral-200/70 dark:border-neutral-800/70 bg-white/85 dark:bg-neutral-950/85 backdrop-blur">
        <div className="mx-auto flex h-12 max-w-3xl items-center justify-between px-6">
          <NavLink
            to={"/"}
            className="flex items-center gap-2 text-sm font-medium tracking-tight"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-neutral-900 text-[10px] font-bold text-white dark:bg-neutral-100 dark:text-neutral-900">
              JI
            </span>
            {t("nav.brand")}
          </NavLink>

          <div className="flex items-center gap-0.5">
            <nav
              className="hidden sm:flex items-center gap-0"
              aria-label="navigation"
            >
              <AppNavLink to="projects" content={t("nav.projects")} />
              <AppNavLink to="resume" content={t("nav.resume")} />
              <AppNavLink to="services" content={t("nav.services")} />
              <AppNavLink to="contact" content={t("nav.contact")} />
            </nav>
            <span className="mx-1 h-4 w-px bg-neutral-200 dark:bg-neutral-800" />
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="mt-24 border-t border-neutral-200/70 dark:border-neutral-800/70">
        <div className="mx-auto flex max-w-3xl flex-col gap-2 px-6 py-8 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Jaeik In</p>
          <div className="flex gap-4">
            <a
              href="https://github.com/Lamzang"
              className="hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Github
            </a>
            <a
              href="mailto:idy11277@gmail.com"
              className="hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              idy11277@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
