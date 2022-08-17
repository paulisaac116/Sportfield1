// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import * as admin from 'firebase-admin';


// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID
// };

// PAST FIRESTORE DATABASE

// const firebaseConfig = {
//   apiKey: "AIzaSyCYWq_FnVtSUTx4FXm0dcCDK-vc7y1WfTc",
//   authDomain: "sportfield-489a8.firebaseapp.com",
//   databaseURL: "https://sportfield-489a8-default-rtdb.firebaseio.com",
//   projectId: "sportfield-489a8",
//   storageBucket: "sportfield-489a8.appspot.com",
//   messagingSenderId: "137685770818",
//   appId: "1:137685770818:web:da1fa91eaa7b1c796a03db",
//   measurementId: "G-1H108RMX8H"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDfg76WHkKwOQF12-1kNV5TcAqJbuTMYiA",
  authDomain: "sportfield.firebaseapp.com",
  projectId: "sportfield",
  storageBucket: "sportfield.appspot.com",
  messagingSenderId: "225682973089",
  appId: "1:225682973089:web:13b23f73fe6cea17872be0",
  measurementId: "G-BM6VWYKBTM"
};

// var admin = require('firebase-admin')
// const app = firebase.initializeApp(firebaseConfig);

const app = admin.initializeApp(firebaseConfig)



export const db = app.firestore();
export const auth = app.auth();
