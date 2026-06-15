// 새 아티클을 작성할 때 이 파일을 복사해서 사용하세요.
// How to add a new article: copy this file as a starting point.
//
// 1) 이 파일을 같은 폴더(src/data/articles/)에 적당한 이름으로 복사
//    → 예) realtime-3d-viewer.ts (프로젝트 slug와 같이)
// 2) 아래 export 이름과 article id를 수정
// 3) src/data/projects.ts 에서 import 후 해당 프로젝트의 articles 배열에 연결

import type { Article } from "../types";

export const templateArticles: Article[] = [
  {
    // 아티클 식별자. URL이 /projects/<slug>/articles/<id> 가 됩니다.
    id: "my-first-article",

    // 카드/상세 페이지 제목
    title: {
      ko: "여기에 한국어 제목",
      en: "English title here",
    },

    // 카드/상세 페이지의 짧은 부제 (1줄)
    summary: {
      ko: "한 줄 요약",
      en: "One-line summary",
    },

    // 프로젝트 페이지에 보이는 미리보기 본문 (1~2 단락 정도가 적당)
    body: {
      ko: "프로젝트 페이지에 노출되는 본문입니다. 자세한 내용은 content 배열에 작성하세요.",
      en: "This shows on the project page. Write the long version inside content.",
    },

    // 메타 정보 (선택)
    publishedAt: "2026-01-01",
    readingMinutes: 5,
    tags: ["tag-a", "tag-b"],

    // 상세 페이지에 렌더링되는 본문 블록 배열.
    // 사용 가능한 블록: heading / paragraph / list / quote / code / callout / divider / image
    content: [
      {
        type: "paragraph",
        text: {
          ko: "도입 단락. 이 아티클이 어떤 이야기를 다루는지 한두 문장으로.",
          en: "Opening paragraph. Set up what this article is going to talk about.",
        },
      },
      {
        type: "heading",
        level: 2,
        text: { ko: "큰 섹션 제목", en: "Section heading" },
      },
      {
        type: "paragraph",
        text: {
          ko: "섹션 본문. 마크다운이 아니라 블록 단위로 작성합니다.",
          en: "Section body. Authored as blocks, not markdown.",
        },
      },
      {
        type: "list",
        items: [
          { ko: "포인트 1", en: "Point 1" },
          { ko: "포인트 2", en: "Point 2" },
          { ko: "포인트 3", en: "Point 3" },
        ],
      },
      {
        type: "callout",
        emoji: "💡",
        text: {
          ko: "강조하고 싶은 한 줄 노트.",
          en: "A single line you want to highlight.",
        },
      },
      {
        type: "quote",
        text: {
          ko: "인용문.",
          en: "Pull quote.",
        },
        author: "Someone",
      },
      {
        type: "code",
        language: "ts",
        code: `function hello(name: string) {
  return \`Hello, \${name}\`;
}`,
      },
      { type: "divider" },
      {
        type: "heading",
        level: 3,
        text: { ko: "작은 섹션 제목", en: "Sub heading" },
      },
      {
        type: "paragraph",
        text: {
          ko: "마무리 문단.",
          en: "Closing paragraph.",
        },
      },
      // 이미지를 넣고 싶다면:
      // {
      //   type: "image",
      //   src: "/images/example.png",
      //   alt: "screenshot",
      //   caption: { ko: "캡션", en: "Caption" },
      // },
    ],
  },
];
