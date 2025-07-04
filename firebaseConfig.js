import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-irpk8juZtUXl82VlNJcSxqj7QrU_Mb4",
  authDomain: "mal-aware.firebaseapp.com",
  projectId: "mal-aware",
  storageBucket: "mal-aware.firebasestorage.app",
  messagingSenderId: "1099456116388",
  appId: "1:1099456116388:web:b44adf92146b9e5fa25831",
  measurementId: "G-6PZ4GC3GHJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
export const db = getFirestore(app);

// For web compatibility, you might need to initialize the web app separately
// This is handled automatically by React Native Firebase for mobile platforms