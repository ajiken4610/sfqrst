// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFLcXGwS_RCF_jBV6D5SBIB6GPXRxOsZg",
  authDomain: "sfqrst.firebaseapp.com",
  projectId: "sfqrst",
  storageBucket: "sfqrst.appspot.com",
  messagingSenderId: "220577547558",
  appId: "1:220577547558:web:174ce5dbbf3ece42746de7",
  measurementId: "G-VNPDE50R19",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const useFirebaseApp = () => app;
export const useAnalytics = () => analytics;

import { getAuth } from "firebase/auth";
import * as firebaseui from "firebaseui";
const auth = getAuth(app);
export const useAuth = () => auth;
const ui = new firebaseui.auth.AuthUI(auth);
export const useUI = () => ui;

import { getFirestore } from "firebase/firestore";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const useDB = () => db;
