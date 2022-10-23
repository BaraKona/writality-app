// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// setup firebase interface
interface Firebase {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig: Firebase = {
  apiKey: "AIzaSyCnX1kBqdWm-u2v59Bfa5czFlwID7EfFak",
  authDomain: "writality-5c151.firebaseapp.com",
  projectId: "writality-5c151",
  storageBucket: "writality-5c151.appspot.com",
  messagingSenderId: "208677024718",
  appId: "1:208677024718:web:7973a1f3aef4e35e33b19f",
  measurementId: "G-5XMRQGTPYJ",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
