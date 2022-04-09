import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";

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

Firebase = initializeApp(firebaseConfig)

const auth = getAuth(Firebase);

const db = getFirestore(Firebase);

export { auth, db, Firebase };