import { initializeApp, cert } from 'firebase-admin/app';
import dotenv from 'dotenv';


//Created separate initialization module to prevent reinitialization for every single firebase call. Import as needed.


function initializeFirebaseApp(){
    dotenv.config({path: '../../.env'}); 
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
    initializeApp({
    credential: cert(serviceAccount)
});
}

export default initializeFirebaseApp;