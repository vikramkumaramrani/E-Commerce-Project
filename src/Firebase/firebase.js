import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

//  Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNK-5ZHw2tGVLjfnwhoVQDvnA8e48Iltw",
  authDomain: "e-commerce-project-2f93d.firebaseapp.com",
  projectId: "e-commerce-project-2f93d",
  storageBucket: "e-commerce-project-2f93d.appspot.com",
  messagingSenderId: "460051385010",
  appId: "1:460051385010:web:18a9e363a2e5d5f3f797ab",
  measurementId: "G-MCGB4NB127",
};

//  Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//  Export commonly used Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

//  VISITOR COUNTER FUNCTION
export async function countVisitor() {
  const countRef = doc(db, "analytics", "visitors");
  const key = "my_unique_visitor";

  try {
    // Check if already counted
    const alreadyVisited = localStorage.getItem(key);

    if (!alreadyVisited) {
      localStorage.setItem(key, "true"); // mark as counted
      const snap = await getDoc(countRef);

      if (snap.exists()) {
        await updateDoc(countRef, { total: increment(1) });
      } else {
        await setDoc(countRef, { total: 1 });
      }
    }

    // Get latest total count
    const updatedSnap = await getDoc(countRef);
    const total = updatedSnap.exists() ? updatedSnap.data().total : 0;
    console.log("🔥 Total Visitors:", total);

    return total;
  } catch (error) {
    console.error("Visitor counter error:", error);
  }
}
