import { initializeApp } from "firebase/app";
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import getStorage function
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// import { } from 'firebase/<service>';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  databaseURL:"https://testproject-a3f78-default-rtdb.firebaseio.com/",
  apiKey: "AIzaSyBJZxuUWdZNcDIMN9U6K2w_GxRc89gJO1c",
  authDomain: "testproject-a3f78.firebaseapp.com",
  projectId: "testproject-a3f78",
  storageBucket: "testproject-a3f78.appspot.com",
  messagingSenderId: "57451582276",
  appId: "1:57451582276:web:0bcffe60d36fdecf6f3d11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const Storage =getStorage(app);
// const storageRef =  app.Storage().ref();
const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, db, auth, Storage }; 
