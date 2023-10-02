// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdaApNl2AfgFVjgBmJIAA5tnWtxv9qssA",
  authDomain: "technet-c2340.firebaseapp.com",
  projectId: "technet-c2340",
  storageBucket: "technet-c2340.appspot.com",
  messagingSenderId: "4812900656",
  appId: "1:4812900656:web:8d706980384a3713e7a0f5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);