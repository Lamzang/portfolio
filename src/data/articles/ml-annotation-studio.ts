import type { Article } from "../types";

export const mlAnnotationStudioArticles: Article[] = [
  {
    id: "why",
    title: {
      ko: "왜 만들었는가",
      en: "Why we built it",
    },
    summary: {
      ko: "외주 라벨링 비용과 품질 사이의 트레이드오프.",
      en: "The trade-off between outsourced labeling cost and quality.",
    },
    body: {
      ko: "외주 비용은 내려갔지만 품질을 일정하게 유지하는 것이 어려웠습니다. 내부에서 효율적으로 라벨링할 수 있다면 비용과 품질을 동시에 잡을 수 있다고 봤습니다.",
      en: "Outsourcing was cheap but quality varied. If our own team could label efficiently, we could capture both price and quality.",
    },
    publishedAt: "2023-06-18",
    readingMinutes: 5,
    tags: ["Product", "ML Ops"],
    content: [
      {
        type: "paragraph",
        text: {
          ko: "외주 라벨링은 단가가 매력적이었지만, 작업자가 매번 바뀌면서 라벨 품질이 일관되지 않았습니다. 같은 데이터셋이 두 번 검수에 걸려 다시 작업되는 경우가 많았습니다.",
          en: "Outsourced labeling was attractive on price, but the rotating workforce made quality uneven. The same dataset often went back through review twice.",
        },
      },
      {
        type: "heading",
        level: 2,
        text: { ko: "결정적 사건", en: "The turning point" },
      },
      {
        type: "paragraph",
        text: {
          ko: "한 분기에 검수 반려율이 40%까지 올라갔던 적이 있었습니다. 그때 'in-house 도구가 외주보다 더 싸고 빠를 수 있다'는 가설이 처음으로 진지하게 논의되었습니다.",
          en: "One quarter the rejection rate hit 40%. That was when the team first took the 'in-house tooling could beat outsourcing on both cost and speed' hypothesis seriously.",
        },
      },
      {
        type: "callout",
        emoji: "🧮",
        text: {
          ko: "도구 한 번 만들면 매 라벨에 영향을 준다 — 단가가 아니라 작업자 효율을 올리는 게 레버리지가 크다.",
          en: "Building the tool once leverages every label — the lever isn't unit price, it's per-annotator throughput.",
        },
      },
      {
        type: "heading",
        level: 2,
        text: { ko: "결정한 것들", en: "What we committed to" },
      },
      {
        type: "list",
        items: [
          {
            ko: "단축키 우선 UX — 마우스를 거의 쓰지 않아도 되도록",
            en: "Keyboard-first UX — almost no mouse needed",
          },
          {
            ko: "실시간 협업 — 같은 데이터셋에 여러 명이 동시에 작업",
            en: "Realtime collaboration — many annotators on one dataset",
          },
          {
            ko: "자동 백업 / 오프라인 복구",
            en: "Automatic backup / offline recovery",
          },
        ],
      },
    ],
  },
  {
    id: "realtime-collab",
    title: {
      ko: "실시간 협업 설계",
      en: "Designing realtime collab",
    },
    summary: {
      ko: "Yjs CRDT로 동시 편집과 오프라인 복구를 구현했습니다.",
      en: "I used Yjs CRDTs for concurrent editing and offline recovery.",
    },
    body: {
      ko: "Yjs를 사용하면 충돌 해결을 프레임워크 레벨에서 처리할 수 있어, 애플리케이션 로직은 상태 머신에 집중할 수 있었습니다.",
      en: "Yjs handled conflicts at the framework layer so the app logic could focus on the state machine itself.",
    },
    publishedAt: "2023-09-02",
    readingMinutes: 7,
    tags: ["CRDT", "Yjs", "Collaboration"],
    content: [
      {
        type: "paragraph",
        text: {
          ko: "처음에는 직접 OT 기반 동기화를 만들어보려 했습니다. 며칠을 들인 뒤 '이건 우리가 만들 영역이 아니다'라는 결론에 도달했고, Yjs로 빠르게 갈아탔습니다.",
          en: "I first tried to roll my own OT-based sync. After a few days it was clear this was not our problem to solve, and we switched to Yjs.",
        },
      },
      {
        type: "heading",
        level: 2,
        text: { ko: "왜 Yjs였나", en: "Why Yjs" },
      },
      {
        type: "list",
        items: [
          {
            ko: "충돌 해결이 데이터 구조 수준에서 자동으로 처리됨",
            en: "Conflicts resolve automatically at the data-structure level",
          },
          {
            ko: "오프라인 → 온라인 머지가 자연스러움",
            en: "Offline → online merging is seamless",
          },
          {
            ko: "Awareness API로 커서 / 선택 영역 공유가 쉬움",
            en: "The Awareness API makes sharing cursors and selections easy",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        text: { ko: "구조", en: "Architecture" },
      },
      {
        type: "code",
        language: "ts",
        code: `const ydoc = new Y.Doc();
const annotations = ydoc.getArray<Annotation>("annotations");
const provider = new WebsocketProvider(WS_URL, datasetId, ydoc);

annotations.observe(() => {
  // CRDT가 머지를 끝낸 결과만 UI에 반영
  store.set(annotations.toArray());
});`,
      },
      {
        type: "callout",
        emoji: "🧠",
        text: {
          ko: "애플리케이션은 '머지 이후 상태'만 보면 됩니다. 머지 자체는 라이브러리가 책임집니다.",
          en: "The app only sees post-merge state. Merging itself is the library's job.",
        },
      },
      { type: "divider" },
      {
        type: "heading",
        level: 2,
        text: { ko: "예상 못 한 어려움", en: "Surprises along the way" },
      },
      {
        type: "paragraph",
        text: {
          ko: "Yjs 자체보다, 화면에 표시할 'presence' 상태(누가 어디를 보고 있는지)가 의외로 까다로웠습니다. 자주 변하는 상태를 너무 자주 브로드캐스트하면 트래픽이 폭증해서, throttle을 거는 게 필수였습니다.",
          en: "Yjs itself was fine. The harder part was presence — who's looking where. Broadcasting too often blew up traffic, so throttling was non-negotiable.",
        },
      },
    ],
  },
];
