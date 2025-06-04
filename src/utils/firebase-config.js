import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKydM0k_EWmlXWyWRocYFCkn_VfQiYleU",
  authDomain: "react-netflix-clone-74c59.firebaseapp.com",
  projectId: "react-netflix-clone-74c59",
  storageBucket: "react-netflix-clone-74c59.appspot.com", // ✅ fixed here
  messagingSenderId: "1050957020938",
  appId: "1:1050957020938:web:ab01bacb1b75ebd67144f3",
  measurementId: "G-WQJWPDCMTT"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
