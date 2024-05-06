import { initializeApp } from "@firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from '../config/firebaseConfig.json';

// const firebaseConfig = {
//     "apiKey": "AIzaSyArF2BJ3f9xNt3-7FR57jIP_0nSAgz_rhg",
//     "authDomain": "medconnect-app.firebaseapp.com",
//     "databaseURL": "https://medconnect-app-default-rtdb.firebaseio.com",
//     "projectId": "medconnect-app",
//     "storageBucket": "medconnect-app.appspot.com",
//     "messagingSenderId": "908877767175",
//     "appId": "1:908877767175:web:e04f43e729bc122f6f80a2",
//     "measurementId": "G-207Q92EDR7"
// };
console.log(firebaseConfig);

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);