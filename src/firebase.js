import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDzicICcId5qBcWuXsqDVkbgUWr4IN748Q",
  authDomain: "talk-d7044.firebaseapp.com",
  projectId: "talk-d7044",
  storageBucket: "talk-d7044.appspot.com",
  messagingSenderId: "63696275443",
  appId: "1:63696275443:web:8c90de3ce7b68854afb486"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
