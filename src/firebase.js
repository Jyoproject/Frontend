// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, setPersistence, browserSessionPersistence, RecaptchaVerifier} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdfArRlDxi06OaPizln7OOb4vxSTf1cXs",
  authDomain: "copilot-for-lawyers.firebaseapp.com",
  projectId: "copilot-for-lawyers",
  storageBucket: "copilot-for-lawyers.appspot.com",
  messagingSenderId: "592228213073",
  appId: "1:592228213073:web:d86d1cb228466201a47370",
  measurementId: "G-F05Z96YC5L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
firebase.auth().useDeviceLanguage();
export default firebase

export const db = getFirestore(app);
export const auth = getAuth(app)

//providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log('Auth persistence enabled');
  })
  .catch((error) => {
    console.error('Error setting auth persistence:', error);
  });



const analytics = getAnalytics(app);
