import { NavLink } from "react-router";

const navBase =
  "text-sm text-neutral-600 hover:text-neutral-900 px-2 py-1 rounded-lg hover:bg-neutral-200 transition";
const navActive = "text-neutral-900 bg-neutral-200";

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
