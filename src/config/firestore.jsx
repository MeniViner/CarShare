// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKUT,
//   messagingSenderId: process.env.REACT_APP_MESSEGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyAOEc4qKjI4uIlx",
  authDomain: "employee-database-a283c.firebaseapp.com",
  projectId: "employee-database-a283c",
  storageBucket: "employee-database-a283c.appspot.com",
  messagingSenderId: "137735978066",
  appId: "1:137735978066:web:0069ef5a9a7e2414f7338b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);