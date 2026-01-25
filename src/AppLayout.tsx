import { NavLink, Outlet } from "react-router";
import AppNavLink from "./components/navLink";

export default function AppLayout() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-neutral-50/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <NavLink to={"/"} className="text-sm font-semibold tracking-tight">
            Jaeik In — Portfolio
          </NavLink>

          <nav className="flex items-center gap-1" aria-label="navigation">
            <AppNavLink to="projects" content="Projects" />
            <AppNavLink to="resume" content="Resume" />
            <AppNavLink to="services" content="Services" />
            <AppNavLink to="contact" content="Contact" />
          </nav>
        </div>
      </header>
      <Outlet />

      <footer className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} Jaeik In
          </p>

          <div className="flex flex-wrap gap-2">
            <a href="https://github.com/Lamzang">Github</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
