import { NavLink } from "react-router";

const navBase =
  "text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 px-2 py-1 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition";
const navActive =
  "text-neutral-900 dark:text-neutral-100 bg-neutral-200 dark:bg-neutral-700";

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
