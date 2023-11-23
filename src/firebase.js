// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDATLWR0lyJfBV8IOL4JTfs9VDugTZFKzU',
  authDomain: 'thanksdiary-8e621.firebaseapp.com',
  projectId: 'thanksdiary-8e621',
  storageBucket: 'thanksdiary-8e621.appspot.com',
  messagingSenderId: '911804512418',
  appId: '1:911804512418:web:96cff6d012f98ca2f87ffb'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//firestore 불러오기
export const db = getFirestore(app);
export default app;
