import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATBPOYJgAAadue6-lalDlokkdJLxshq1w",
  authDomain: "avo-cooks.firebaseapp.com",
  projectId: "avo-cooks",
  storageBucket: "avo-cooks.firebasestorage.app",
  messagingSenderId: "916894603653",
  appId: "1:916894603653:web:45cd79f4b913f80a9d8cec"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);