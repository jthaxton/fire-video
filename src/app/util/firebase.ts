import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC04ca1-tIztsaw-S4m5ybibsIFcU2R7_o",
    authDomain: "video-f8691.firebaseapp.com",
    projectId: "video-f8691",
    storageBucket: "video-f8691.firebasestorage.app",
    messagingSenderId: "228143931593",
    appId: "1:228143931593:web:5b7fe3daee5d2d1b15ed18",
    measurementId: "G-TPZ22453P1"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
