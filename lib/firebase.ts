import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqq5FsQ3Jj74uJEPAzOuamlChNfjh7WnQ",
  authDomain: "kognitiam.firebaseapp.com",
  projectId: "kognitiam",
  storageBucket: "kognitiam.firebasestorage.app",
  messagingSenderId: "677100005642",
  appId: "1:677100005642:web:8fc332fe96b923813f32f3",
  measurementId: "G-PSS2DN7PNR",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
