import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";   
import { getStorage } from "firebase/storage"; 


const firebaseConfig = {
  apiKey: "AIzaSyC69YVZy2KB2hjk8ZBs_fPpDu-RhSkF1Sg",
  authDomain: "e-commerce-project-1e70a.firebaseapp.com",
  projectId: "e-commerce-project-1e70a",
  storageBucket: "e-commerce-project-1e70a.firebasestorage.app",
  messagingSenderId: "228762628507",
  appId: "1:228762628507:web:3aff1826fbd3f64ab6313e",
  measurementId: "G-348WS1CB3M"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


<<<<<<< HEAD
=======
//  Export Auth instance (named export)
>>>>>>> 54c89e19c9e8fddf4f7bdc1b319f5f509e317480
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 
