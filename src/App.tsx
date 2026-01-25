import { NavLink } from "react-router";
import Section from "./components/ui/section";
import SectionTitle from "./components/ui/sectionTitle";

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
        <p className="mt-3 text-sm leading-relaxed text-neutral-700">
          자기소개 내용들
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <NavLink
            to="/projects"
            className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800 transition"
          >
            대표 프로젝트 보기
          </NavLink>
          <NavLink
            to="/resume"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition"
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
            <p className="mt-1 text-sm text-neutral-600">
              대표 3개 프로젝트를 보여주기
            </p>
          </div>

          <NavLink
            to="/projects"
            className="text-sm font-semibold text-neutral-700 hover:text-neutral-900 hover:underline"
          >
            전체 보기 →
          </NavLink>
        </div>

        <ol className="mt-4 space-y-3">
          {["Project A", "Project B", "Project C"].map((name) => (
            <li
              key={name}
              className="rounded-xl border border-neutral-200 bg-neutral-50 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold">{name}</div>
                  <div className="mt-1 text-sm text-neutral-600">
                    — 프로젝트 설명
                  </div>
                </div>

                <span className="text-xs font-semibold text-neutral-500">
                  Case Study
                </span>
              </div>
            </li>
          ))}
        </ol>
      </Section>
      {/* What I Do */}
      <Section ariaLabel="what-I-Do">
        <SectionTitle name="what-I-Do" />
        <p className="mt-1 text-sm text-neutral-600">
          실제 업무에서 제공 가능한 역량 3가지
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-4">
            <div className="text-sm font-bold">System Design</div>
            <p className="mt-2 text-sm text-neutral-600">
              아키텍처/데이터 모델/API 설계, 트레이드오프
            </p>
          </div>

          <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-4">
            <div className="text-sm font-bold">Product Engineering</div>
            <p className="mt-2 text-sm text-neutral-600">
              UI/상태관리/성능 최적화, 사용자 플로우 구현
            </p>
          </div>

          <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-4">
            <div className="text-sm font-bold">
              Machine Learning &amp; 3D Modeling
            </div>
            <p className="mt-2 text-sm text-neutral-600">
              머신러닝/3D 모델링 구현
            </p>
          </div>
        </div>
      </Section>
      {/* Services */}
      <Section ariaLabel="service">
        <SectionTitle name="service" />
        <p className="mt-1 text-sm text-neutral-600">
          외주 및 프리랜서로서 안내문구
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>서비스 제공 절차</li>
          <li>의뢰인 준비사항</li>
          <li>개발원칙</li>
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          <NavLink
            to="/services"
            className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800 transition"
          >
            Services
          </NavLink>
        </div>
      </Section>
      {/* Contact */}
      <Section ariaLabel="contact">
        <SectionTitle name="contact" />
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-700">
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
