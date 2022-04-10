// import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA5AuCPgKqS5aHyaQiLZWI5YitsUPNIIJA",
    authDomain: "workshop-8d07d.firebaseapp.com",
    projectId: "workshop-8d07d",
    storageBucket: "workshop-8d07d.appspot.com",
    messagingSenderId: "475503748184",
    appId: "1:475503748184:web:cd13f24cac4e3d8ffc562d",
    measurementId: "G-1815WBWHZR"
}

let Firebase;

Firebase = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();

const db = firebase.firestore();

const storage = firebase.storage();

export { auth, db, storage, Firebase };