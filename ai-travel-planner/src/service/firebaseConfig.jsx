// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD2OQbvcyozal1ovDJ0R7BvOC-0AMxbKBc",
    authDomain: "ai-trip-planner-51820.firebaseapp.com",
    projectId: "ai-trip-planner-51820",
    storageBucket: "ai-trip-planner-51820.firebasestorage.app",
    messagingSenderId: "330009008263",
    appId: "1:330009008263:web:ee2a637f5c888b66494022",
    measurementId: "G-88068J24KG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);