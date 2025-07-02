// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase project configuration
const firebaseConfig = {
  apiKey: ".",
  authDomain: ".",
  projectId: ".",
  storageBucket: ".",
  messagingSenderId: ".",
  appId: "."
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Export Auth & Firestore services
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
