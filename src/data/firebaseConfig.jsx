import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKUT,
//   messagingSenderId: process.env.REACT_APP_MESSEGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID
// };

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
export const db = getFirestore(app);
export const auth = getAuth(app);



// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// export { auth, db };

