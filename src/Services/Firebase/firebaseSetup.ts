import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBY5u01vug1vPTS4mIkS-AwysSM3syYRYs",
    authDomain: "qarga-9ffdd.firebaseapp.com",
    projectId: "qarga-9ffdd",
    storageBucket: "qarga-9ffdd.appspot.com",
    messagingSenderId: "250716337603",
    appId: "1:250716337603:web:d99e405cb745bae5f5b976",
    measurementId: "G-DQSP14K80K"
  };

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
