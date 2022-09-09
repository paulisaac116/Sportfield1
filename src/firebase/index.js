// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

// PAST FIRESTORE DATABASE

const firebaseConfig = {
  apiKey: "AIzaSyCYWq_FnVtSUTx4FXm0dcCDK-vc7y1WfTc",
  authDomain: "sportfield-489a8.firebaseapp.com",
  databaseURL: "https://sportfield-489a8-default-rtdb.firebaseio.com",
  projectId: "sportfield-489a8",
  storageBucket: "sportfield-489a8.appspot.com",
  messagingSenderId: "137685770818",
  appId: "1:137685770818:web:da1fa91eaa7b1c796a03db",
  measurementId: "G-1H108RMX8H"
};

const app = firebase.initializeApp( firebaseConfig );

export const db = app.firestore();
export const auth = app.auth();
