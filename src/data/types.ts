import type { Locale } from "../contexts/i18n";

export type LocalizedText = Record<Locale, string>;

export type Block =
  | { type: "heading"; level?: 2 | 3; text: LocalizedText }
  | { type: "paragraph"; text: LocalizedText }
  | { type: "list"; ordered?: boolean; items: LocalizedText[] }
  | { type: "quote"; text: LocalizedText; author?: string }
  | { type: "code"; language?: string; code: string }
  | { type: "callout"; emoji?: string; text: LocalizedText }
  | { type: "divider" }
  | { type: "image"; src: string; alt?: string; caption?: LocalizedText };

export type Article = {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  body: LocalizedText;
  publishedAt?: string;
  readingMinutes?: number;
  tags?: string[];
  content?: Block[];
  order?: number;
};

// 프로젝트의 메타 정보. Firestore 의 projects/{slug} 문서에 저장됩니다.
// 아티클은 projects/{slug}/articles 서브컬렉션에 분리 저장하므로 여기엔 포함하지 않습니다.
export type ProjectMeta = {
  id: string;
  slug: string;
  icon: string;
  name: LocalizedText;
  tagline: LocalizedText;
  summary: LocalizedText;
  period: LocalizedText;
  role: LocalizedText;
  stack: string[];
  order?: number;
};

// 메타 + 아티클을 합친 형태. 상세 페이지에서 사용합니다.
export type Project = ProjectMeta & { articles: Article[] };
