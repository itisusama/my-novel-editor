import { initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUVBKQxe3x26bqhCoyw1H4IuQEyO2elMw",
  authDomain: "noveller-fcc59.firebaseapp.com",
  projectId: "noveller-fcc59",
  storageBucket: "noveller-fcc59.firebasestorage.app",
  messagingSenderId: "20928600017",
  appId: "1:20928600017:web:448def1a77f9e04e3632f0",
  measurementId: "G-0TFV6CVCYX"
};

let app: FirebaseApp;
let db: Firestore;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw error;
}

export { app, db };