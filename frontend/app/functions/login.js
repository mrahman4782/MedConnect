import { getAuth, signInWithEmailAndPassword, getIdToken } from "firebase/auth";
import { initializeApp } from "firebase/app";
//import firebaseConfig from '../../config/firebaseConfig.json';
import axios from 'axios';
import sessionStorage from './sessionStorage.js';
import { FIREBASE_APP, FIREBASE_AUTH } from "../FireBaseConfig.js";

// let firebaseConfig = {
//   "apiKey": "AIzaSyArF2BJ3f9xNt3-7FR57jIP_0nSAgz_rhg",
//   "authDomain": "medconnect-app.firebaseapp.com",
//   "databaseURL": "https://medconnect-app-default-rtdb.firebaseio.com",
//   "projectId": "medconnect-app",
//   "storageBucket": "medconnect-app.appspot.com",
//   "messagingSenderId": "908877767175",
//   "appId": "1:908877767175:web:e04f43e729bc122f6f80a2",
//   "measurementId": "G-207Q92EDR7"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth();

export async function userLogin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);

    // Signed in
    const user = userCredential.user;
    // console.log('Signed in!');
    console.log(user);

    const token = await getIdToken(user, true);
    // console.log(token);

    // Make request to backend. Response handling needed
    const response = await axios.post('http://localhost:3000/api/verifyLogin', { token: token });

    // Store Async session token to Async Storage

    sessionStorage.setSessionKey(token);

    return response;

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error Code: ", errorCode);
    console.log("Error Msg: ", errorMessage);
    // console.log('AHHHHHHHHHHHHHHHHHhh');
    // return error;
    throw error;
  }
}

export default userLogin;