import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";   // ✅ Auth import

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNK-5ZHw2tGVLjfnwhoVQDvnA8e48Iltw",
  authDomain: "e-commerce-project-2f93d.firebaseapp.com",
  projectId: "e-commerce-project-2f93d",
  storageBucket: "e-commerce-project-2f93d.firebasestorage.app",
  messagingSenderId: "460051385010",
  appId: "1:460051385010:web:18a9e363a2e5d5f3f797ab",
  measurementId: "G-MCGB4NB127",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Export Auth instance (named export)
export const auth = getAuth(app);
