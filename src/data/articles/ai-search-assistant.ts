import type { Article } from "../types";

export const aiSearchAssistantArticles: Article[] = [
  {
    id: "pipeline",
    title: {
      ko: "RAG 파이프라인 구성",
      en: "Shaping the RAG pipeline",
    },
    summary: {
      ko: "청크 전략과 리랭킹으로 검색 품질을 끌어올린 이야기.",
      en: "How chunking and reranking lifted retrieval quality.",
    },
    body: {
      ko: "첫 버전은 단순한 top-k 벡터 검색이었고 정답률이 낮았습니다. 청크 크기 튜닝과 리랭커 도입 후 답변 만족도가 눈에 띄게 올랐습니다.",
      en: "The first cut was plain top-k vector search and answers were weak. After tuning chunk sizes and adding a reranker, answer quality climbed noticeably.",
    },
    publishedAt: "2024-11-22",
    readingMinutes: 6,
    tags: ["RAG", "Retrieval"],
    content: [
      {
        type: "paragraph",
        text: {
          ko: "첫 RAG 버전은 정말 단순했습니다. 사내 문서를 임베딩해서 pgvector에 넣고 top-5를 찾아 LLM에 그대로 던졌죠. 동작은 했지만, 답변 품질이 일관되지 않았습니다.",
          en: "The first RAG cut was simple — embed all docs into pgvector, fetch top-5, hand them to the LLM. It ran, but answer quality was all over the place.",
        },
      },
      {
        type: "heading",
        level: 2,
        text: { ko: "청크 크기 튜닝", en: "Chunk size tuning" },
      },
      {
        type: "paragraph",
        text: {
          ko: "256 토큰, 512 토큰, 문단 단위 등 여러 청크 전략을 비교했습니다. 결론은 '하나의 답에 필요한 맥락'을 담을 만큼은 크되, 검색 다양성을 해치지 않을 만큼만 작게 — 우리 도메인에서는 약 400 토큰 + 50 토큰 오버랩이 가장 좋았습니다.",
          en: "I compared 256-token, 512-token, and paragraph chunks. The answer: large enough to hold the context one answer needs, small enough not to drown retrieval. For our domain, ~400 tokens with 50-token overlap won.",
        },
      },
      {
        type: "heading",
        level: 2,
        text: { ko: "리랭킹 도입", en: "Adding reranking" },
      },
      {
        type: "paragraph",
        text: {
          ko: "벡터 유사도만으로는 '관련은 있지만 정답은 아닌' 문서가 자주 상위에 올라왔습니다. cross-encoder 리랭커를 한 단계 추가했고, 정답 포함 비율이 크게 올라갔습니다.",
          en: "Vector similarity alone kept surfacing 'related but not the answer' chunks. Adding a cross-encoder reranker as a second stage moved the right doc into the answer set far more often.",
        },
      },
      {
        type: "code",
        language: "py",
        code: `# 1단계: 벡터 검색으로 후보 50개
candidates = vector_search(query, k=50)

# 2단계: cross-encoder로 8개로 압축
ranked = reranker.rank(query, candidates, top_k=8)

# 3단계: LLM에 전달
answer = llm.answer(query, context=ranked)`,
      },
      {
        type: "callout",
        emoji: "📊",
        text: {
          ko: "정답 포함률(top-3) 기준: 단순 벡터 검색 62% → 리랭크 적용 84%.",
          en: "Hit rate at top-3: plain vector search 62% → with reranking 84%.",
        },
      },
    ],
  },
  {
    id: "hallucinations",
    title: {
      ko: "환각을 줄이기",
      en: "Cutting hallucinations",
    },
    summary: {
      ko: "출처가 없는 답변은 반환하지 않는 규칙.",
      en: "Never return an answer without a source.",
    },
    body: {
      ko: "답변에 사용한 문서를 명시적으로 인용하지 못할 경우 'I don't know'를 반환하도록 했습니다. 사용자 신뢰가 크게 올랐습니다.",
      en: "If the model can't cite the doc it leaned on, it returns 'I don't know'. User trust went up sharply.",
    },
    publishedAt: "2025-01-08",
    readingMinutes: 4,
    tags: ["RAG", "Trust"],
    content: [
      {
        type: "paragraph",
        text: {
          ko: "RAG는 검색이 정확해도 모델이 외삽하면 환각이 발생합니다. 가장 큰 리스크는 '그럴듯한 거짓 답변을 사용자가 진짜로 믿는 것'이었습니다.",
          en: "Even with good retrieval, a model that extrapolates can still hallucinate. The real risk wasn't the wrong answer — it was the user trusting it.",
        },
      },
      {
        type: "heading",
        level: 2,
        text: { ko: "규칙: 출처 없는 답변 금지", en: "Rule: no answer without a source" },
      },
      {
        type: "paragraph",
        text: {
          ko: "프롬프트와 후처리를 함께 손봤습니다. (1) 시스템 프롬프트에 '인용 문서가 없으면 모른다고 답하라'를 명시, (2) 응답에서 인용 토큰을 추출해 실제 컨텍스트와 매칭, (3) 매칭 실패 시 후처리에서 답변을 폐기.",
          en: "I touched both the prompt and the postprocess. (1) System prompt: 'if no citation exists, say you don't know.' (2) Extract citation tokens from the response and match against actual context. (3) Drop answers that don't match.",
        },
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            ko: "프롬프트에서 인용 형식 강제",
            en: "Force citation format in the prompt",
          },
          {
            ko: "응답을 파서로 검증",
            en: "Validate the response with a parser",
          },
          {
            ko: "검증 실패 시 'I don't know' 응답으로 대체",
            en: "On validation failure, fall back to 'I don't know'",
          },
        ],
      },
      {
        type: "quote",
        text: {
          ko: "잘못된 답을 빨리 주는 것보다 모른다고 정직하게 말하는 게 신뢰를 만든다.",
          en: "An honest 'I don't know' builds more trust than a fast wrong answer.",
        },
      },
    ],
  },
  {
    id: "evals",
    title: {
      ko: "평가 루프",
      en: "The eval loop",
    },
    summary: {
      ko: "회귀를 막는 자동 평가 세트.",
      en: "Automated evals that block regressions.",
    },
    body: {
      ko: "프롬프트나 모델을 바꿀 때마다 수십 개의 고정된 질문 세트를 돌려 품질을 확인합니다. 사람의 감이 아니라 숫자로 결정을 내릴 수 있게 되었습니다.",
      en: "Every prompt or model change runs through a fixed set of dozens of questions. Decisions are now made on numbers, not gut feel.",
    },
    publishedAt: "2025-02-19",
    readingMinutes: 5,
    tags: ["Evals", "Quality"],
    content: [
      {
        type: "paragraph",
        text: {
          ko: "초기에는 프롬프트를 바꿀 때마다 '이전보다 나아진 것 같다'는 감으로 결정했습니다. 누군가 사용자 피드백을 가져오면 그제서야 회귀가 드러나곤 했죠.",
          en: "Early on, every prompt change was decided by gut feel. Regressions only showed up when a user complaint came in.",
        },
      },
      {
        type: "heading",
        level: 2,
        text: { ko: "평가 세트 구성", en: "Building the eval set" },
      },
      {
        type: "list",
        items: [
          {
            ko: "실제 사용자 질문에서 50개 추출 (편향 방지)",
            en: "50 questions sampled from real users (to avoid bias)",
          },
          {
            ko: "각 질문에 대한 '허용 가능한 답변 패턴' 정의",
            en: "An 'acceptable answer pattern' for each question",
          },
          {
            ko: "LLM-as-judge로 1차 채점, 의심스러운 케이스만 사람이 확인",
            en: "LLM-as-judge for the first pass; humans only review the suspicious ones",
          },
        ],
      },
      {
        type: "callout",
        emoji: "✅",
        text: {
          ko: "변경 → 평가 → 결정 루프가 닫히고 나서야 개발 속도가 안정되었습니다.",
          en: "Velocity only stabilized once the change → eval → decision loop closed.",
        },
      },
    ],
  },
];
