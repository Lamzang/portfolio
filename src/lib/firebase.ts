import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey) {
  throw new Error(
    "Firebase 환경변수가 비어 있습니다. .env.example 을 참고해 .env.local 을 만들고 VITE_FIREBASE_* 값을 채워주세요.",
  );
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// ignoreUndefinedProperties: 선택 필드(undefined)를 그대로 저장 시도하면 에러가 나므로 무시하도록 설정
export const db = initializeFirestore(app, { ignoreUndefinedProperties: true });
