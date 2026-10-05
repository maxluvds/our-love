// src/firebase/config.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBVoWzQDMKoKJwYEW_fHYAvEMT-yokyCCY",
  authDomain: "our-love-9db74.firebaseapp.com",
  projectId: "our-love-9db74",
  storageBucket: "our-love-9db74.firebasestorage.app",
  messagingSenderId: "927617769877",
  appId: "1:927617769877:web:4e48d60a1dc5bfb230569c",
  measurementId: "G-J750869W06"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;