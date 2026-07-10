import { getAuth } from 'firebase/auth'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCxF4xEf9ZC3WhtdEf9Ser54U5e33J-b-U",
  authDomain: "gti-motorhouse.firebaseapp.com",
  projectId: "gti-motorhouse",
  storageBucket: "gti-motorhouse.firebasestorage.app",
  messagingSenderId: "749114018603",
  appId: "1:749114018603:web:afbbca265d4d66e159d36e",
  measurementId: "G-RZB2N1F9J4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth}