// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl9JaoWpcysmNTJTsfVG88XZBQvYr9mIg",
  authDomain: "marco-sandboxlive.firebaseapp.com",
  projectId: "marco-sandboxlive",
  storageBucket: "marco-sandboxlive.firebasestorage.app",
  messagingSenderId: "1062377625427",
  appId: "1:1062377625427:web:3d7d1aab6bc79ae87cf3a6",
//   measurementId: "G-S25CMFFWPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
