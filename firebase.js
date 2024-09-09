// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5G_5YMW72Y6QD5s1lTCw-dq3IWjQtvU4",
  authDomain: "quickcards-ai-c8e12.firebaseapp.com",
  projectId: "quickcards-ai-c8e12",
  storageBucket: "quickcards-ai-c8e12.appspot.com",
  messagingSenderId: "503841122281",
  appId: "1:503841122281:web:352f4591b84f54db7a4d78",
  measurementId: "G-G6JLZSRDBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };