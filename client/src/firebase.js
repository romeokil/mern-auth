// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-3262d.firebaseapp.com",
  projectId: "mern-auth-3262d",
  storageBucket: "mern-auth-3262d.appspot.com",
  messagingSenderId: "1014107149436",
  appId: "1:1014107149436:web:c9f894193f957599f765f9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);