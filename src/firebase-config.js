// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore'
import  {getAuth,GoogleAuthProvider,setPersistence, browserLocalPersistence } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCutaql5fEYQEsYu3T-nUQDzTP5Cvt3zxc",
  authDomain:"blogproject-6999e.firebaseapp.com",
  projectId: "blogproject-6999e",
  storageBucket: "blogproject-6999e.appspot.com",
  messagingSenderId: "447836516864",
  appId: "1:447836516864:web:92da2970a818a57330dee5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app);
export const auth=getAuth(app)
setPersistence(auth, browserLocalPersistence);

export const provider = new GoogleAuthProvider();
