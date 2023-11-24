import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore, arrayUnion as _arrayUnion } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBCh9tXmI2ILr95XLpLkRPNt7FXOCvPB2c',
  authDomain: 'thanksdiary8.firebaseapp.com',
  projectId: 'thanksdiary8',
  storageBucket: 'thanksdiary8.appspot.com',
  messagingSenderId: '722091162582',
  appId: '1:722091162582:web:4553db6ba3e1a78c3bc277'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const arrayUnion = _arrayUnion;
