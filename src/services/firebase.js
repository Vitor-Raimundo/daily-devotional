import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8Bxb04DMJsML0AEqUCmD6gKSr0luseF4",
  authDomain: "mydevotionalgroup.firebaseapp.com",
  projectId: "mydevotionalgroup",
  storageBucket: "mydevotionalgroup.firebasestorage.app",
  messagingSenderId: "972190781780",
  appId: "1:972190781780:web:6110517186b72d4374f8c1",
  measurementId: "G-F8BG69GERZ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
