import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCjy1EInUUExe3bP_YiPPDAYOK-387Ywg",
  authDomain: "sparta-2nd-teamproject.firebaseapp.com",
  projectId: "sparta-2nd-teamproject",
  storageBucket: "sparta-2nd-teamproject.appspot.com",
  messagingSenderId: "829024911968",
  appId: "1:829024911968:web:a00ba53aa2f581cdcaf905",
  measurementId: "G-J4E7JDMN53"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
