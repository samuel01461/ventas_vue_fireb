import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBz7srFwHRcJAeyUNCP-iCiifWIdVd0490",
  authDomain: "ventas-vuefireb.firebaseapp.com",
  projectId: "ventas-vuefireb",
  storageBucket: "ventas-vuefireb.firebasestorage.app",
  messagingSenderId: "581928800885",
  appId: "1:581928800885:web:e4cdf7b05b06680b47de3c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };