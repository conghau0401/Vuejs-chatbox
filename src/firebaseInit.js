// src/firebaseInit.js
import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCCiQ68tRVjVtnZ34iUXGT7mSxZ5w2vZ50",
    authDomain: "chatbox-c9447.firebaseapp.com",
    projectId: "chatbox-c9447",
    storageBucket: "chatbox-c9447.appspot.com",
    messagingSenderId: "96398128995",
    appId: "1:96398128995:web:e8451f8dc6ee7a684e4556",
    measurementId: "G-S3XE60WXF8"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);