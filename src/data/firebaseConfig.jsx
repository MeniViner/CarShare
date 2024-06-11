// ייבוא ספריות Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// קובץ ההגדרות מ-Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAY6t3L5XfYOou-aMHO4GKpJ0dS-OIERHg",
  authDomain: "we-car-share.firebaseapp.com",
  projectId: "we-car-share",
  storageBucket: "we-car-share.appspot.com",
  messagingSenderId: "44167050649",
  appId: "1:44167050649:web:f637988d1905d83bbe4f08",
  measurementId: "G-N41GZRXK22"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };