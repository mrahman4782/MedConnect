import { initializeApp, cert } from 'firebase-admin/app';
import admin from 'firebase-admin'; // Import the default export for auth
import dotenv from 'dotenv';
import 'firebase/auth';

dotenv.config({path: '../../.env'}); 
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
initializeApp({
  credential: cert(serviceAccount)
});

let response = {
  status: '',
  data: ''
}

export async function loginVerify(token){
  
  try {

    let decodedToken = await admin.auth().verifyIdToken(token);
    console.log(decodedToken);
    response.status = '200';
    response.data = decodedToken;
    return response;

  } catch (error) {
    console.error("Unable to verify token. Error: ", error.message);
    // Handle errors here, such as showing an alert to the user
    response.status = '403';
    response.data = error.message;
    return response;
  }
}

