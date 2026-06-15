import { useRef } from "react";
import type { MouseEvent } from "react";
import { NavLink } from "react-router";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ProjectMeta } from "../../data/projects";
import { useI18n } from "../../contexts/i18n";

export default function ProjectCard({ project }: { project: ProjectMeta }) {
  const { locale } = useI18n();
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], ["7deg", "-7deg"]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], ["-9deg", "9deg"]), {
    stiffness: 220,
    damping: 22,
  });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className="will-change-transform"
    >
      <NavLink
        to={`/projects/${project.slug}`}
        style={{ transformStyle: "preserve-3d" }}
        className="group block rounded-md border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-4 shadow-sm transition-shadow hover:shadow-md"
      >
        <div
          className="px-2 flex items-start gap-3"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            style={{
              transform: "translateZ(14px)",
              transformStyle: "preserve-3d",
            }}
            className="min-w-0 flex-1"
          >
            <div className="font-medium tracking-tight truncate">
              {project.name[locale]}
            </div>
            <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
              {project.tagline[locale]}
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {project.stack.slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="rounded px-1.5 py-0.5 text-[11px] bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </NavLink>
    </motion.div>
  );
}
