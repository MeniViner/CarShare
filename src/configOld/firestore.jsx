// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKUT,
  messagingSenderId: process.env.REACT_APP_MESSEGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBPGbd227eBPhTCWNP8tvBxFI8ndcxJuZ4",
//   authDomain: "car-share-react.firebaseapp.com",
//   projectId: "car-share-react",
//   storageBucket: "car-share-react.appspot.com",
//   messagingSenderId: "92813777463",
//   appId: "1:92813777463:web:c152b470da685afb533db2",
//   measurementId: "G-8E2HD380D8"
// };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

