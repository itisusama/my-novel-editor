import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUVBKQxe3x26bqhCoyw1H4IuQEyO2elMw",
  authDomain: "noveller-fcc59.firebaseapp.com",
  projectId: "noveller-fcc59",
  storageBucket: "noveller-fcc59.firebasestorage.app",
  messagingSenderId: "20928600017",
  appId: "1:20928600017:web:448def1a77f9e04e3632f0",
  measurementId: "G-0TFV6CVCYX"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
