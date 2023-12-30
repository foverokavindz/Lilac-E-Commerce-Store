// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
//import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'lilac-auth.firebaseapp.com',
  projectId: 'lilac-auth',
  storageBucket: 'lilac-auth.appspot.com',
  messagingSenderId: '638174574747',
  appId: '1:638174574747:web:4876c9a8a4e0ac2cd36e3e',
  measurementId: 'G-0V0MQY2WE6',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
