// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_SECRET,
  authDomain: "todo-app-bd895.firebaseapp.com",
  projectId: "todo-app-bd895",
  storageBucket: "todo-app-bd895.appspot.com",
  messagingSenderId: "911382002666",
  appId: "1:911382002666:web:433a69b8447a2a3307d093"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);