// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
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
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};
const analytics = getAnalytics(app);