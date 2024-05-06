import { signInWithEmailAndPassword, getIdToken } from "firebase/auth";
import axios from 'axios';
import sessionStorage from './sessionStorage.js';
import { FIREBASE_APP, FIREBASE_AUTH } from "../FireBaseConfig.js";
import apiRoute from '../../config/apiRoute.json';


export async function userLogin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    
    // Signed in
    const user = userCredential.user;
    console.log('Signed in!');
    console.log(user);
    const token = await getIdToken(user, true);

    // Make request to backend. Response handling needed

    const response = await axios.post(`${apiRoute.endpoint}/api/verifyLogin`, { token: token });


    // Store Async session token to Async Storage
    sessionStorage.setSessionKey(token);
    return response;

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error Code: ", errorCode);
    console.log("Error Msg: ", errorMessage);
    throw error;
  }
}

export default userLogin;