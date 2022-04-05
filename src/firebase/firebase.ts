import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBxtYDhEh1y1gCkIXGNzdLpUPG1-pFrB68",

  authDomain: "auth.kryptos.news",

  projectId: "coinblog-2c68c",

  storageBucket: "coinblog-2c68c.appspot.com",

  messagingSenderId: "832632593443",

  appId: "1:832632593443:web:437d3aabf9722f7bdc2596",
};

// Initialize Firebase

export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);

export const firebaseStorage = getStorage(firebaseApp);

export const cloudFirestore = getFirestore(firebaseApp);
