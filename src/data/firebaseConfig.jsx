import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyAY6t3L5XfYOou-aMHO4GKpJ0dS-OIERHg",
  authDomain: "we-car-share.firebaseapp.com",
  projectId: "we-car-share",
  storageBucket: "we-car-share.appspot.com",
  messagingSenderId: "44167050649",
  // databaseURL: "https://we-car-share-default-rtdb.asia-southeast1.firebasedatabase.app",
  appId: "1:44167050649:web:f637988d1905d83bbe4f08",
  measurementId: "G-N41GZRXK22"
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


