import type { Article } from "../types";

export const realtime3dViewerArticles: Article[] = [
  {
    id: "intro",
    title: {
      ko: "프로젝트 소개",
      en: "Project introduction",
    },
    summary: {
      ko: "어떤 문제를 풀고 싶었는지, 기존 뷰어의 한계는 무엇이었는지.",
      en: "What problem I wanted to solve and what held existing viewers back.",
    },
    body: {
      ko: "기존 뷰어들은 데스크탑 환경을 기준으로 만들어져 모바일에서 사용성이 떨어졌습니다. 이 프로젝트는 동일한 모델을 모든 디바이스에서 부드럽게 보여주는 것을 목표로 시작했습니다.",
      en: "Most viewers assumed desktop hardware and degraded badly on phones. The goal here was to show the same model smoothly on every device.",
    },
    publishedAt: "2024-04-12",
    readingMinutes: 4,
    tags: ["3D", "Three.js", "WebGL"],
    content: [
      {
        type: "paragraph",
        text: {
          ko: "3D 뷰어는 흔하지만, 막상 모바일에서 열어보면 끊기거나 카메라가 어색한 경우가 많습니다. 이 프로젝트는 'PC와 모바일에서 같은 모델이 똑같이 잘 보이는 뷰어'라는 단순한 목표에서 시작했습니다.",
          en: "3D viewers are everywhere, but most of them stutter or feel off on a phone. This project started with one simple goal — the same model should look just as good on a phone as on a desktop.",
        },
      },
      {
        type: "heading",
        level: 2,
        text: { ko: "기존 뷰어의 한계", en: "Limits of existing viewers" },
      },
      {
        type: "paragraph",
        text: {
          ko: "기존 뷰어 대부분은 데스크탑 GPU를 가정하고 만들어져, 셰이더가 무겁고 LOD가 거의 없었습니다. 그 결과 저사양 디바이스에서는 첫 프레임이 뜨기까지 수 초가 걸리고, 이후에도 30fps 아래로 떨어지는 경우가 잦았습니다.",
          en: "Most existing viewers assume a desktop GPU. Heavy shaders, almost no LOD, and a long first-frame on low-end devices — frame rates often dropped below 30fps once interaction started.",
        },
      },
      {
        type: "list",
        items: [
          {
            ko: "큰 텍스처를 그대로 업로드해 GPU 메모리 사용이 큼",
            en: "Large textures uploaded as-is, ballooning GPU memory",
          },
          {
            ko: "머티리얼이 모델별로 분리되어 드로콜이 폭증",
            en: "Per-model materials caused a draw-call explosion",
          },
          {
            ko: "카메라 컨트롤이 데스크탑 기준이라 모바일 제스처가 뻑뻑함",
            en: "Camera controls were desktop-first; touch gestures felt clunky",
          },
        ],
      },
      {
        type: "callout",
        emoji: "🎯",
        text: {
          ko: "초기 목표 한 줄: '아이폰 SE에서 60fps'.",
          en: "One-line target: '60fps on an iPhone SE.'",
        },
      },
      { type: "divider" },
      {
        type: "heading",
        level: 2,
        text: { ko: "접근 방식", en: "Approach" },
      },
      {
        type: "paragraph",
        text: {
          ko: "처음부터 모바일을 1순위로 두고, 데스크탑은 '모바일 파이프라인 + 더 높은 품질 옵션'으로 다루기로 했습니다. 이 결정 하나가 이후 모든 트레이드오프의 기준이 되었습니다.",
          en: "Mobile first, desktop second — with desktop treated as 'the same pipeline plus higher-quality options.' That single decision shaped every trade-off that followed.",
        },
      },
      {
        type: "quote",
        text: {
          ko: "최저 사양에서 잘 도는 코드는 최고 사양에서도 잘 돈다. 반대는 거의 성립하지 않는다.",
          en: "Code that runs well on the worst hardware also runs well on the best. The reverse rarely holds.",
        },
      },
    ],
  },
  {
    id: "pipeline-optimization",
    title: {
      ko: "렌더 파이프라인 최적화",
      en: "Optimizing the render pipeline",
    },
    summary: {
      ko: "드로콜을 줄이고 인스턴싱 / LOD를 도입한 과정.",
      en: "Reducing draw calls and introducing instancing and LOD.",
    },
    body: {
      ko: "GPU 프로파일러로 핫스팟을 찾고, 머티리얼을 공유 가능한 단위로 쪼갠 뒤 인스턴싱을 적용했습니다. 결과적으로 평균 프레임 타임이 22ms → 12ms로 감소했습니다.",
      en: "I profiled on a real GPU, split materials into shareable units, and added instancing. Average frame time dropped from 22ms to 12ms.",
    },
    publishedAt: "2024-05-30",
    readingMinutes: 6,
    tags: ["Performance", "WebGL"],
    content: [
      {
        type: "paragraph",
        text: {
          ko: "성능 작업을 시작할 때 가장 먼저 한 일은 '느낌'을 '숫자'로 바꾸는 거였습니다. Chrome DevTools와 Spector.js로 프레임을 캡처해 어디서 시간이 새는지 확인했습니다.",
          en: "The first move when chasing performance was turning gut feel into numbers. Chrome DevTools and Spector.js captured frames so I could see where time was actually leaking.",
        },
      },
      {
        type: "heading",
        level: 2,
        text: { ko: "병목 식별", en: "Finding the bottlenecks" },
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            ko: "드로콜 수 — 모델 1개당 30~50회까지 올라감",
            en: "Draw call count — climbed to 30–50 per model",
          },
          {
            ko: "텍스처 업로드 — 첫 프레임 직전 큰 스파이크",
            en: "Texture uploads — a large spike just before the first frame",
          },
          {
            ko: "오버드로 — 반투명 머티리얼이 너무 많이 겹침",
            en: "Overdraw — too many translucent materials stacking",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        text: { ko: "인스턴싱 적용", en: "Adding instancing" },
      },
      {
        type: "paragraph",
        text: {
          ko: "같은 메시가 여러 번 반복되는 경우가 많아 InstancedMesh로 모았습니다. 메모리 사용은 약간 늘었지만 드로콜은 한 자릿수로 떨어졌습니다.",
          en: "A lot of meshes were repeated, so I batched them into InstancedMesh. Memory ticked up a bit, but draw calls dropped into the single digits.",
        },
      },
      {
        type: "code",
        language: "ts",
        code: `const mesh = new THREE.InstancedMesh(geometry, material, count);
for (let i = 0; i < count; i++) {
  matrix.setPosition(positions[i]);
  mesh.setMatrixAt(i, matrix);
}
mesh.instanceMatrix.needsUpdate = true;`,
      },
      {
        type: "callout",
        emoji: "⚠️",
        text: {
          ko: "주의: 모든 메시를 인스턴싱하면 오히려 느려질 수 있어요. 동일 머티리얼 + 충분한 개수일 때만 효과가 큽니다.",
          en: "Watch out: instancing everything can backfire. The win shows up when material is shared and count is high.",
        },
      },
      { type: "divider" },
      {
        type: "heading",
        level: 2,
        text: { ko: "LOD와 텍스처 다운스케일", en: "LOD and texture downscaling" },
      },
      {
        type: "paragraph",
        text: {
          ko: "디바이스 픽셀비와 화면 면적을 보고 텍스처 해상도를 동적으로 조절했습니다. 모바일에서는 4096px 텍스처를 1024px로 내려도 사용자가 차이를 거의 느끼지 못했습니다.",
          en: "I scaled texture resolution at runtime based on device pixel ratio and visible area. Going from 4096px down to 1024px on phones was nearly invisible to users.",
        },
      },
      {
        type: "heading",
        level: 3,
        text: { ko: "결과", en: "Results" },
      },
      {
        type: "list",
        items: [
          {
            ko: "평균 프레임 타임: 22ms → 12ms",
            en: "Average frame time: 22ms → 12ms",
          },
          {
            ko: "드로콜: 모델당 ~40 → ~6",
            en: "Draw calls: ~40 → ~6 per model",
          },
          {
            ko: "iPhone SE에서 60fps 유지",
            en: "Held 60fps on an iPhone SE",
          },
        ],
      },
      {
        type: "quote",
        text: {
          ko: "측정하지 않으면 최적화도 추측이다.",
          en: "Optimizing without measuring is just guessing.",
        },
      },
    ],
  },
  {
    id: "lessons",
    title: {
      ko: "배운 점과 다음 단계",
      en: "Lessons and next steps",
    },
    summary: {
      ko: "도구 만들기와 제품 만들기의 차이.",
      en: "The difference between building a tool and building a product.",
    },
    body: {
      ko: "라이브러리를 쓰는 것과 라이브러리를 다듬어 제품에 맞추는 것은 전혀 다른 일이라는 걸 배웠습니다. 다음 버전에서는 자체 WebGPU 백엔드를 실험하려 합니다.",
      en: "Using a library and shaping one into a product are very different jobs. The next version will experiment with a native WebGPU backend.",
    },
    publishedAt: "2024-09-04",
    readingMinutes: 3,
    tags: ["Reflection", "Roadmap"],
    content: [
      {
        type: "paragraph",
        text: {
          ko: "Three.js를 6개월 가까이 다루면서 가장 크게 깨달은 것은, 라이브러리는 그저 출발점이라는 점이었습니다. '라이브러리 사용법'에서 '제품 요구사항에 맞게 라이브러리를 휘는 능력'으로 시야가 넓어졌습니다.",
          en: "After six months in Three.js, the biggest takeaway is that a library is only a starting point. My focus shifted from 'how do I use this library' to 'how do I bend it around the product.'",
        },
      },
      {
        type: "heading",
        level: 2,
        text: { ko: "다음 단계", en: "Next steps" },
      },
      {
        type: "list",
        items: [
          {
            ko: "WebGPU 백엔드 실험 — 동일 API 표면, 다른 렌더 코어",
            en: "WebGPU backend experiment — same API surface, different render core",
          },
          {
            ko: "에디터 모드 — 단순 뷰어가 아닌 가벼운 편집",
            en: "Editor mode — not just viewing, light editing too",
          },
          {
            ko: "오프라인 캐싱 — 한 번 본 모델은 즉시 다시 열림",
            en: "Offline caching — models you've seen open instantly",
          },
        ],
      },
      {
        type: "callout",
        emoji: "🚀",
        text: {
          ko: "지금까지의 학습을 바탕으로 다음 버전은 처음부터 다시 설계할 예정입니다.",
          en: "With everything learned so far, the next version gets a clean redesign.",
        },
      },
    ],
  },
];
