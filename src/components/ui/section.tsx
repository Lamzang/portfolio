import type React from "react";

export default function Section({
  ariaLabel,
  children,
}: {
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={ariaLabel} className="py-2">
      {children}
    </section>
  );
}
