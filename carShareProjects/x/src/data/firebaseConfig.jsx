import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// //import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDxYcn4ULIrjsFJ4vFCh_A17ORnapG35Pc",
  authDomain: "car-share-data-app.firebaseapp.com",
  projectId: "car-share-data-app",
  storageBucket: "car-share-data-app.appspot.com",
  messagingSenderId: "1004761152491",
  appId: "1:1004761152491:web:e68f19739323526b94b7ae",
  measurementId: "G-6MZDSZP2W7"
};


const app = initializeApp(firebaseConfig);
// //const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};