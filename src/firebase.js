import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD1QtSVrbBuUtj4TTsnKEInVcwJE0zAubo",
  authDomain: "mo9ef-a0575.firebaseapp.com",
  projectId: "mo9ef-a0575",
  storageBucket: "mo9ef",
  messagingSenderId: "913423771143",
  appId: "1:913423771143:web:04747362c5aeaab78b6ca2",
  measurementId: "G-4X8YE44RXQ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
