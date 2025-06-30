// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvLIKmqZ6B2xj5SxcgcbgJ1HgNkOlqwkU",
  authDomain: "aptitude-master-b7433.firebaseapp.com",
  projectId: "aptitude-master-b7433",
  storageBucket: "aptitude-master-b7433.firebasestorage.app",
  messagingSenderId: "323288714770",
  appId: "1:323288714770:web:47eab1ab09de0a524752cb"
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Export Auth & Firestore services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };