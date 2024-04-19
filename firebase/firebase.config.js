import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  

 
const firebaseConfig = {
  apiKey: "AIzaSyARh2OyzxiHIascpyqpTwgUY7AO09M5RGw",
  authDomain: "openit-edu-b0f55.firebaseapp.com",
  projectId: "openit-edu-b0f55",
  storageBucket: "openit-edu-b0f55.appspot.com",
  messagingSenderId: "727117595751",
  appId: "1:727117595751:web:8f3016fe27136357d900c2"
};

export const app = initializeApp(firebaseConfig);
 
export const db = getFirestore(app);