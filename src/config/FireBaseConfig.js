import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZGuBsmoO0nXqVDNBzkeWAcekqNUB3utY",
  authDomain: "ecommerceweb-2acca.firebaseapp.com",
  projectId: "ecommerceweb-2acca",
  storageBucket: "ecommerceweb-2acca.appspot.com",
  messagingSenderId: "198710411308",
  appId: "1:198710411308:web:01db94004a1ae94d06d189",
  measurementId: "G-87QL9C00Q3",
};
 
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();