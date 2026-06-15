import type { Locale } from "../../contexts/i18n";
import type { Block } from "../../data/types";

export default function ArticleBlock({
  block,
  locale,
}: {
  block: Block;
  locale: Locale;
}) {
  switch (block.type) {
    case "heading": {
      const level = block.level ?? 2;
      if (level === 3) {
        return (
          <h3 className="mt-10 mb-3 text-xl font-semibold tracking-tight">
            {block.text[locale]}
          </h3>
        );
      }
      return (
        <h2 className="mt-12 mb-4 text-2xl font-bold tracking-tight">
          {block.text[locale]}
        </h2>
      );
    }
    case "paragraph":
      return (
        <p className="leading-7 text-neutral-800 dark:text-neutral-200">
          {block.text[locale]}
        </p>
      );
    case "list":
      return block.ordered ? (
        <ol className="ml-5 list-decimal space-y-1.5 text-neutral-800 dark:text-neutral-200">
          {block.items.map((item, i) => (
            <li key={i} className="leading-7 pl-1">
              {item[locale]}
            </li>
          ))}
        </ol>
      ) : (
        <ul className="ml-5 list-disc space-y-1.5 text-neutral-800 dark:text-neutral-200">
          {block.items.map((item, i) => (
            <li key={i} className="leading-7 pl-1">
              {item[locale]}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4 italic text-neutral-700 dark:text-neutral-300">
          <p className="leading-7">{block.text[locale]}</p>
          {block.author && (
            <footer className="mt-2 text-sm not-italic text-neutral-500">
              — {block.author}
            </footer>
          )}
        </blockquote>
      );
    case "code":
      return (
        <pre className="overflow-x-auto rounded-md border border-neutral-200/70 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4 text-sm leading-6">
          <code className="font-mono text-neutral-800 dark:text-neutral-200">
            {block.code}
          </code>
        </pre>
      );
    case "callout":
      return (
        <div className="flex gap-3 rounded-md border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 p-4">
          <span className="select-none text-lg leading-7">
            {block.emoji ?? "💡"}
          </span>
          <p className="leading-7 text-neutral-800 dark:text-neutral-200">
            {block.text[locale]}
          </p>
        </div>
      );
    case "divider":
      return (
        <hr className="my-2 border-neutral-200/80 dark:border-neutral-800/80" />
      );
    case "image":
      return (
        <figure>
          <img
            src={block.src}
            alt={block.alt ?? ""}
            className="w-full rounded-md border border-neutral-200/80 dark:border-neutral-800"
          />
          {block.caption && (
            <figcaption className="mt-2 text-center text-xs text-neutral-500">
              {block.caption[locale]}
            </figcaption>
          )}
        </figure>
      );
  }
}
