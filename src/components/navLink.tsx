import { NavLink } from "react-router";

const navBase =
  "text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 px-2 py-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition";
const navActive = "text-neutral-900 dark:text-neutral-100";

export default function AppNavLink({
  to,
  content,
}: {
  to: string;
  content: string;
}) {
  return (
    <NavLink
      to={"/" + to}
      className={({ isActive }) => `${navBase} ${isActive ? navActive : ""}`}
    >
      {content}
    </NavLink>
  );
}
