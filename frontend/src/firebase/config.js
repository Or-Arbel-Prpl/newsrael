
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE8Nch2jQzc5ZB9GcPZxFmxcAqpiSNgnc",
  authDomain: "newsrael-e3191.firebaseapp.com",
  databaseURL: "https://newsrael-e3191-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "newsrael-e3191",
  storageBucket: "newsrael-e3191.appspot.com",
  messagingSenderId: "1026991614270",
  appId: "1:1026991614270:web:747e9b4ef53b605945e46f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectStorage = getStorage(app);
// const projectFirestore = firebase.firestore();

export {app, projectStorage};