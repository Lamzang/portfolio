import { NavLink } from "react-router";

export default function Home() {
  return (
    <main>
      <header>
        <div>
          <strong>Jaeik In — Portfolio</strong>
        </div>

        <nav aria-label="navigation">
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/resume">Resume</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </header>

      <section aria-labelledby="title">
        <h1 id="hero-title">
          설계부터 배포까지, 작동하는 제품으로 완성합니다.
        </h1>
        <p>
          AI 파이프라인, 데이터 대시보드, 운영까지 고려한 풀스택 구현을 합니다.
          프로젝트는 “기술 나열”이 아니라 “케이스 스터디(문제 → 설계 → 구현 →
          결과)”로 정리했습니다.
        </p>
      </section>

      {/* 아래는 대표 프로젝트 나열 */}
      <section aria-labelledby="featured-projects-title">
        <h2 id="featured-projects-title">Featured Projects</h2>
        <p>대표 3개 프로젝트를 보여주기</p>

        <ol>
          <li>
            <strong>Project A</strong> — 프로젝트 설명
          </li>
          <li>
            <strong>Project B</strong> — 프로젝트 설명
          </li>
          <li>
            <strong>Project C</strong> — 프로젝트 설명
          </li>
        </ol>

        <p>
          <a href="/projects">전체 프로젝트 보기</a>
          {/* 또는 이 화면에서 전체프로젝트 나열 */}
        </p>
      </section>

      {/* What can I Do */}
      <section aria-labelledby="what-i-do-title">
        <h2 id="what-i-do-title">What I Do</h2>
        <p>실제 업무에서 제공 가능한 역량 3가지</p>

        <ul>
          <li>
            <strong>System Design</strong>: 아키텍처/데이터 모델/API 설계,
            트레이드오프
          </li>
          <li>
            <strong>Product Engineering</strong>: UI/상태관리/성능 최적화,
            사용자 플로우 구현
          </li>
          <li>
            <strong>Machine Learning & 3D modeling</strong>: 머신러닝/3d 모델링
            구현
          </li>
        </ul>
      </section>

      {/* Services */}
      <section aria-labelledby="services-title">
        <h2 id="services-title">Services</h2>
        <p>
          외주 및 프리랜서로서 안내문구
          {/* 다른 프리랜서 참고해서 추가하기 */}
        </p>

        <ul>
          <li>서비스 제공 절차</li>
          <li>의뢰인 준비사항</li>
          <li>개발원칙</li>
        </ul>

        <p>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </p>
      </section>

      {/* Footer */}
      <footer>
        <p>© {new Date().getFullYear()} Jaeik In</p>
        <p>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </p>
      </footer>
    </main>
  );
}
