import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

export type Locale = "ko" | "en";

type Dict = Record<string, string>;

const dictionaries: Record<Locale, Dict> = {
  ko: {
    "nav.projects": "프로젝트",
    "nav.resume": "이력서",
    "nav.services": "서비스",
    "nav.contact": "연락처",
    "nav.brand": "Jaeik In — 포트폴리오",

    "home.hero.title": "만들고, 다듬고, 배포하는 엔지니어",
    "home.hero.subtitle":
      "제품 설계부터 UI, 성능 최적화까지. 작은 디테일이 사용자 경험을 만든다고 믿습니다.",
    "home.hero.cta.projects": "프로젝트 둘러보기",
    "home.hero.cta.resume": "이력서 보기",

    "home.projects.title": "프로젝트",
    "home.projects.subtitle": "대표 프로젝트를 카드로 확인해보세요",
    "home.projects.viewAll": "전체 보기 →",
    "home.projects.open": "자세히 보기",

    "home.whatIDo.title": "What I Do",
    "home.whatIDo.subtitle": "실무에서 제공 가능한 핵심 역량",
    "home.whatIDo.1.title": "시스템 설계",
    "home.whatIDo.1.desc": "아키텍처, 데이터 모델, API 트레이드오프",
    "home.whatIDo.2.title": "프로덕트 엔지니어링",
    "home.whatIDo.2.desc": "UI, 상태관리, 성능 최적화, 사용자 플로우",
    "home.whatIDo.3.title": "머신러닝 & 3D",
    "home.whatIDo.3.desc": "ML 파이프라인과 3D 모델링 구현",

    "home.services.title": "서비스",
    "home.services.subtitle": "외주 및 프리랜서 협업 안내",
    "home.services.li1": "요구사항 정리 → 제안 → 개발 → 검수 → 이관",
    "home.services.li2": "의뢰인 준비사항 (자산/레퍼런스/일정)",
    "home.services.li3": "투명한 커뮤니케이션과 코드 품질 기준",
    "home.services.cta": "서비스 자세히",

    "home.contact.title": "연락처",

    "detail.back": "← 프로젝트 목록",
    "detail.overview": "개요",
    "detail.stack": "기술 스택",
    "detail.role": "역할",
    "detail.period": "기간",
    "detail.articles": "아티클",
    "detail.readMore": "아티클 자세히 보기 →",
    "detail.notFound": "해당 프로젝트를 찾을 수 없어요.",

    "article.back": "← 프로젝트로 돌아가기",
    "article.minRead": "분 분량",
    "article.more": "이 프로젝트의 다른 아티클",
    "article.notFound": "아티클을 찾을 수 없어요.",

    "projects.page.title": "모든 프로젝트",
    "projects.page.subtitle": "지금까지 만든 프로젝트들",

    "lang.toggle": "English",
  },
  en: {
    "nav.projects": "Projects",
    "nav.resume": "Resume",
    "nav.services": "Services",
    "nav.contact": "Contact",
    "nav.brand": "Jaeik In — Portfolio",

    "home.hero.title": "Engineer who builds, polishes, and ships",
    "home.hero.subtitle":
      "From product design to UI and performance. I believe the small details shape the user experience.",
    "home.hero.cta.projects": "Explore projects",
    "home.hero.cta.resume": "View resume",

    "home.projects.title": "Projects",
    "home.projects.subtitle": "Browse featured work as cards",
    "home.projects.viewAll": "See all →",
    "home.projects.open": "Open",

    "home.whatIDo.title": "What I Do",
    "home.whatIDo.subtitle": "Core capabilities I deliver on the job",
    "home.whatIDo.1.title": "System Design",
    "home.whatIDo.1.desc": "Architecture, data modeling, API trade-offs",
    "home.whatIDo.2.title": "Product Engineering",
    "home.whatIDo.2.desc": "UI, state, perf, end-to-end user flows",
    "home.whatIDo.3.title": "ML & 3D",
    "home.whatIDo.3.desc": "ML pipelines and 3D modeling in production",

    "home.services.title": "Services",
    "home.services.subtitle": "Freelance and contract work",
    "home.services.li1": "Discovery → Proposal → Build → Review → Handoff",
    "home.services.li2": "Client prep (assets, references, timelines)",
    "home.services.li3": "Transparent communication and code quality bar",
    "home.services.cta": "Services details",

    "home.contact.title": "Contact",

    "detail.back": "← All projects",
    "detail.overview": "Overview",
    "detail.stack": "Tech Stack",
    "detail.role": "Role",
    "detail.period": "Period",
    "detail.articles": "Articles",
    "detail.readMore": "Read article →",
    "detail.notFound": "Project not found.",

    "article.back": "← Back to project",
    "article.minRead": "min read",
    "article.more": "More articles in this project",
    "article.notFound": "Article not found.",

    "projects.page.title": "All projects",
    "projects.page.subtitle": "Everything I've shipped so far",

    "lang.toggle": "한국어",
  },
};

type I18nValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  t: (key: keyof (typeof dictionaries)["ko"]) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved === "ko" || saved === "en") return saved;
    const nav = typeof navigator !== "undefined" ? navigator.language : "";
    return nav.toLowerCase().startsWith("ko") ? "ko" : "en";
  });

  useEffect(() => {
    localStorage.setItem("locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  const toggle = useCallback(
    () => setLocaleState((p) => (p === "ko" ? "en" : "ko")),
    [],
  );

  const t = useCallback<I18nValue["t"]>(
    (key) => dictionaries[locale][key] ?? key,
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, toggle, t }),
    [locale, setLocale, toggle, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
