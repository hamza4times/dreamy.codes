import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // TODO - .env fill in values
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, // TODO - create firebase
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

export const app = initializeApp(firebaseConfig);