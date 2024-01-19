// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, setPersistence, browserSessionPersistence, signInAnonymously, onAuthStateChanged} from "firebase/auth";
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
export const auth = getAuth(app);
const signInAnonymouslyIfNeeded = async () => {
  if (!auth.currentUser) {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error('Error signing in anonymously:', error);
    }
  }
};

signInAnonymouslyIfNeeded();

onAuthStateChanged(auth, (user) => {
  // Handle auth state changes
  if (user) {
    // User is signed in
    const uid = user.uid;
    console.log('User is signed in:', uid);
  } else {
    // User is signed out
    console.log('User is signed out');
  }
});



//providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');




const analytics = getAnalytics(app);
