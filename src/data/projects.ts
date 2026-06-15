import type { Project } from "./types";
import { realtime3dViewerArticles } from "./articles/realtime-3d-viewer";
import { mlAnnotationStudioArticles } from "./articles/ml-annotation-studio";
import { aiSearchAssistantArticles } from "./articles/ai-search-assistant";

export type { Article, Block, LocalizedText, Project, ProjectMeta } from "./types";

export const projects: Project[] = [
  {
    id: "p1",
    slug: "realtime-3d-viewer",
    icon: "🧊",
    name: {
      ko: "실시간 3D 뷰어",
      en: "Realtime 3D Viewer",
    },
    tagline: {
      ko: "브라우저에서 동작하는 경량 3D 뷰어",
      en: "A lightweight 3D viewer that runs in the browser",
    },
    summary: {
      ko: "Three.js 기반으로 모델 로딩 / 환경광 / 애니메이션 제어를 구현한 제품용 3D 뷰어. 모바일을 포함한 저사양 디바이스에서도 60fps를 유지하도록 파이프라인을 튜닝했습니다.",
      en: "A production 3D viewer built on Three.js with model loading, ambient lighting, and animation controls. The render pipeline is tuned to hold 60fps even on low-end mobile devices.",
    },
    period: {
      ko: "2024.03 – 2024.09",
      en: "Mar 2024 – Sep 2024",
    },
    role: {
      ko: "풀스택 · 3D 렌더링",
      en: "Full-stack · 3D rendering",
    },
    stack: ["React", "TypeScript", "Three.js", "WebGL", "Vite"],
    articles: realtime3dViewerArticles,
  },
  {
    id: "p2",
    slug: "ml-annotation-studio",
    icon: "🏷️",
    name: {
      ko: "ML 어노테이션 스튜디오",
      en: "ML Annotation Studio",
    },
    tagline: {
      ko: "팀 단위로 라벨링을 가속하는 웹 도구",
      en: "A web tool that speeds up team labeling",
    },
    summary: {
      ko: "대용량 이미지/비디오 데이터에 대해 다중 사용자가 라벨링 작업을 동시에 진행할 수 있는 스튜디오. 실시간 동기화와 충돌 해결이 핵심이었습니다.",
      en: "A studio where many annotators label large image and video datasets together. Real-time sync and conflict resolution were the hard parts.",
    },
    period: {
      ko: "2023.05 – 2023.12",
      en: "May 2023 – Dec 2023",
    },
    role: {
      ko: "프론트엔드 리드",
      en: "Frontend lead",
    },
    stack: ["Next.js", "tRPC", "Postgres", "Yjs", "Tailwind"],
    articles: mlAnnotationStudioArticles,
  },
  {
    id: "p3",
    slug: "ai-search-assistant",
    icon: "🔎",
    name: {
      ko: "AI 검색 어시스턴트",
      en: "AI Search Assistant",
    },
    tagline: {
      ko: "사내 문서에 답하는 LLM 기반 어시스턴트",
      en: "An LLM assistant that answers from internal docs",
    },
    summary: {
      ko: "사내 문서를 벡터화하고 RAG 파이프라인을 붙여, 신뢰할 수 있는 답변과 출처 링크를 함께 제공하는 어시스턴트입니다.",
      en: "Internal docs are embedded and served through a RAG pipeline so the assistant always returns an answer and the source links it came from.",
    },
    period: {
      ko: "2024.10 – 진행중",
      en: "Oct 2024 – ongoing",
    },
    role: {
      ko: "풀스택 · 검색 품질",
      en: "Full-stack · Search quality",
    },
    stack: ["Python", "FastAPI", "pgvector", "React", "Claude API"],
    articles: aiSearchAssistantArticles,
  },
];
