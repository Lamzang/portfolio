import type { Block, LocalizedText } from "../../data/types";
import { LocalizedInput, TextField, TextareaField, inputClass } from "./Fields";

const EMPTY: LocalizedText = { ko: "", en: "" };

const BLOCK_TYPES: { type: Block["type"]; label: string }[] = [
  { type: "heading", label: "제목" },
  { type: "paragraph", label: "문단" },
  { type: "list", label: "리스트" },
  { type: "quote", label: "인용" },
  { type: "code", label: "코드" },
  { type: "callout", label: "콜아웃" },
  { type: "divider", label: "구분선" },
  { type: "image", label: "이미지" },
];

function labelFor(type: Block["type"]) {
  return BLOCK_TYPES.find((b) => b.type === type)?.label ?? type;
}

function defaultBlock(type: Block["type"]): Block {
  switch (type) {
    case "heading":
      return { type, level: 2, text: { ...EMPTY } };
    case "paragraph":
      return { type, text: { ...EMPTY } };
    case "list":
      return { type, ordered: false, items: [{ ...EMPTY }] };
    case "quote":
      return { type, text: { ...EMPTY }, author: "" };
    case "code":
      return { type, language: "ts", code: "" };
    case "callout":
      return { type, emoji: "💡", text: { ...EMPTY } };
    case "divider":
      return { type };
    case "image":
      return { type, src: "", alt: "", caption: { ...EMPTY } };
  }
}

const iconBtn =
  "rounded border border-neutral-200 px-2 py-0.5 text-xs text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800/50";

export default function BlockEditor({
  value,
  onChange,
}: {
  value: Block[];
  onChange: (v: Block[]) => void;
}) {
  const update = (i: number, block: Block) =>
    onChange(value.map((b, idx) => (idx === i ? block : b)));
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = value.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const add = (type: Block["type"]) => onChange([...value, defaultBlock(type)]);

  return (
    <div className="space-y-3">
      {value.map((block, i) => (
        <div
          key={i}
          className="rounded-md border border-neutral-200 dark:border-neutral-800"
        >
          <div className="flex items-center justify-between border-b border-neutral-200 px-3 py-1.5 dark:border-neutral-800">
            <span className="text-xs font-medium text-neutral-500">
              {i + 1}. {labelFor(block.type)}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className={iconBtn}
                aria-label="위로"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === value.length - 1}
                className={iconBtn}
                aria-label="아래로"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(i)}
                className={iconBtn}
              >
                삭제
              </button>
            </div>
          </div>
          <div className="p-3">
            <BlockFields block={block} onChange={(b) => update(i, b)} />
          </div>
        </div>
      ))}

      <div className="flex flex-wrap gap-1.5 pt-1">
        {BLOCK_TYPES.map((bt) => (
          <button
            key={bt.type}
            type="button"
            onClick={() => add(bt.type)}
            className="rounded-md border border-neutral-200 px-2 py-1 text-xs text-neutral-600 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800/50"
          >
            + {bt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function BlockFields({
  block,
  onChange,
}: {
  block: Block;
  onChange: (b: Block) => void;
}) {
  switch (block.type) {
    case "heading":
      return (
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs text-neutral-500">
            레벨
            <select
              value={block.level ?? 2}
              onChange={(e) =>
                onChange({ ...block, level: Number(e.target.value) as 2 | 3 })
              }
              className={inputClass + " max-w-24"}
            >
              <option value={2}>H2</option>
              <option value={3}>H3</option>
            </select>
          </label>
          <LocalizedInput
            label="텍스트"
            value={block.text}
            onChange={(text) => onChange({ ...block, text })}
          />
        </div>
      );
    case "paragraph":
      return (
        <LocalizedInput
          label="문단"
          textarea
          value={block.text}
          onChange={(text) => onChange({ ...block, text })}
        />
      );
    case "list":
      return <ListFields block={block} onChange={onChange} />;
    case "quote":
      return (
        <div className="space-y-2">
          <LocalizedInput
            label="인용문"
            textarea
            value={block.text}
            onChange={(text) => onChange({ ...block, text })}
          />
          <TextField
            label="출처 (author, 선택)"
            value={block.author ?? ""}
            onChange={(author) => onChange({ ...block, author })}
          />
        </div>
      );
    case "code":
      return (
        <div className="space-y-2">
          <TextField
            label="언어"
            value={block.language ?? ""}
            onChange={(language) => onChange({ ...block, language })}
            placeholder="ts, py, bash …"
          />
          <TextareaField
            label="코드"
            rows={6}
            value={block.code}
            onChange={(code) => onChange({ ...block, code })}
          />
        </div>
      );
    case "callout":
      return (
        <div className="space-y-2">
          <TextField
            label="이모지"
            value={block.emoji ?? ""}
            onChange={(emoji) => onChange({ ...block, emoji })}
            placeholder="💡"
          />
          <LocalizedInput
            label="텍스트"
            value={block.text}
            onChange={(text) => onChange({ ...block, text })}
          />
        </div>
      );
    case "divider":
      return <p className="text-xs text-neutral-400">구분선 — 설정 없음</p>;
    case "image":
      return (
        <div className="space-y-2">
          <TextField
            label="이미지 URL (src)"
            value={block.src}
            onChange={(src) => onChange({ ...block, src })}
            placeholder="/images/example.png"
          />
          <TextField
            label="대체텍스트 (alt, 선택)"
            value={block.alt ?? ""}
            onChange={(alt) => onChange({ ...block, alt })}
          />
          <LocalizedInput
            label="캡션 (선택)"
            value={block.caption ?? { ...EMPTY }}
            onChange={(caption) => onChange({ ...block, caption })}
          />
        </div>
      );
  }
}

function ListFields({
  block,
  onChange,
}: {
  block: Extract<Block, { type: "list" }>;
  onChange: (b: Block) => void;
}) {
  const setItem = (i: number, v: LocalizedText) =>
    onChange({ ...block, items: block.items.map((it, idx) => (idx === i ? v : it)) });
  const addItem = () =>
    onChange({ ...block, items: [...block.items, { ...EMPTY }] });
  const removeItem = (i: number) =>
    onChange({ ...block, items: block.items.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-xs text-neutral-500">
        <input
          type="checkbox"
          checked={!!block.ordered}
          onChange={(e) => onChange({ ...block, ordered: e.target.checked })}
        />
        번호 매기기 (ordered)
      </label>
      {block.items.map((it, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="flex-1">
            <LocalizedInput
              label={`항목 ${i + 1}`}
              value={it}
              onChange={(v) => setItem(i, v)}
            />
          </div>
          <button
            type="button"
            onClick={() => removeItem(i)}
            className={iconBtn + " mt-5"}
          >
            삭제
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="rounded-md border border-neutral-200 px-2 py-1 text-xs text-neutral-600 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800/50"
      >
        + 항목
      </button>
    </div>
  );
}
