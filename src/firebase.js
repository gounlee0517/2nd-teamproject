// firebase.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, arrayUnion as _arrayUnion } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA6Bcpp8K69CNSpLL9HkHuqL_FAo_pz_Cg',
  authDomain: 'nd-teamproject.firebaseapp.com',
  projectId: 'nd-teamproject',
  storageBucket: 'nd-teamproject.appspot.com',
  messagingSenderId: '632000691466',
  appId: '1:632000691466:web:40a453daf193a21fd24ef3',
  measurementId: 'G-WL7E6ZKHHL'
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const arrayUnion = _arrayUnion;
