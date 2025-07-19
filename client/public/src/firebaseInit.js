// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // For Cloud Firestore
import { getFunctions } from "firebase/functions"; // For Cloud Functions
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMv4MvTShE5dQRfsk_JvamuS2sS2uu4Iw",
  authDomain: "protect-okeeheelee.firebaseapp.com",
  projectId: "protect-okeeheelee",
  storageBucket: "protect-okeeheelee.firebasestorage.app",
  messagingSenderId: "676581086567",
  appId: "1:676581086567:web:ed727f99fa2f67d3bfcbc2",
  measurementId: "G-VEF8C636C8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase services
export const db = getFirestore(app);
export const functions = getFunctions(app); // For Cloud Functions