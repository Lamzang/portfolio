import { NavLink } from "react-router";
import Section from "./components/ui/section";
import SectionTitle from "./components/ui/sectionTitle";
import DescriptionBox from "./components/ui/DescriptionBox";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 space-y-4">
      <Section ariaLabel="hero">
        <h1
          id="hero-title"
          className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl"
        >
          대충 개쩌는 제목
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          자기소개 내용들
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <NavLink
            to="/projects"
            className="inline-flex items-center justify-center rounded-xl bg-neutral-900 dark:bg-neutral-100 px-4 py-2 text-sm font-semibold text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition"
          >
            대표 프로젝트 보기
          </NavLink>
          <NavLink
            to="/resume"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition"
          >
            이력서 보기
          </NavLink>
        </div>
      </Section>

      {/* 프로젝트들 */}
      <Section ariaLabel="projects-title">
        <div className="flex items-start justify-between gap-4">
          <div>
            <SectionTitle name="project" />
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              대표 3개 프로젝트를 보여주기
            </p>
          </div>

          <NavLink
            to="/projects"
            className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 hover:underline"
          >
            전체 보기 →
          </NavLink>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <DescriptionBox name="Project A" description="프로젝트 설명" />
          <DescriptionBox name="Project B" description="프로젝트 설명" />
          <DescriptionBox name="Project C" description="프로젝트 설명" />
        </div>
      </Section>

      {/* What I Do */}
      <Section ariaLabel="what-I-Do">
        <SectionTitle name="what-I-Do" />
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          실제 업무에서 제공 가능한 역량 3가지
        </p>

        <div className="mt-4 flex flex-col gap-3">
          <DescriptionBox
            name="System Design"
            description="아키텍처/데이터 모델/API 설계, 트레이드오프"
          />
          <DescriptionBox
            name="Product Engineering"
            description="UI/상태관리/성능 최적화, 사용자 플로우 구현"
          />
          <DescriptionBox
            name="Machine Learning &amp; 3D Modeling"
            description="머신러닝/3D 모델링 구현"
          />
        </div>
      </Section>

      {/* Services */}
      <Section ariaLabel="service">
        <SectionTitle name="service" />
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          외주 및 프리랜서로서 안내문구
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
          <li>서비스 제공 절차</li>
          <li>의뢰인 준비사항</li>
          <li>개발원칙</li>
        </ul>

        <NavLink
          to="/services"
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-neutral-900 dark:bg-neutral-100 px-4 py-2 text-sm font-semibold text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition"
        >
          Services
        </NavLink>
      </Section>

      {/* Contact */}
      <Section ariaLabel="contact">
        <SectionTitle name="contact" />
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-700 dark:text-neutral-300">
          <li>Email : idy11277</li>
          <li>
            Github :{" "}
            <a href="https://github.com/Lamzang">https://github.com/Lamzang</a>
          </li>
        </ul>
      </Section>
    </div>
  );
}
