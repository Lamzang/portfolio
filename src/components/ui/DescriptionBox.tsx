export default function DescriptionBox({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-bold">{name}</div>
          <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
