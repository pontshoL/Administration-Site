// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDHiAjB4BbcwqGZzgtVfOGi3NbizDC2Naw",
  authDomain: "booking-app-5eef2.firebaseapp.com",
  projectId: "booking-app-5eef2",
  storageBucket: "booking-app-5eef2.appspot.com",
  messagingSenderId: "351583053962",
  appId: "1:351583053962:web:397ded4385569c43382573",
  measurementId: "G-E01Z2HNV1R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth(app);
const storage = getStorage(app);
export {auth,db,storage};