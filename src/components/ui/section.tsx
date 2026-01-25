import type React from "react";

export default function Section({
  ariaLabel,
  children,
}: {
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={ariaLabel}
      className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 shadow-sm"
    >
      {children}
    </section>
  );
}
