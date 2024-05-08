import { initializeApp, cert, getApps } from 'firebase-admin/app';
import dotenv from 'dotenv';
import * as functions from 'firebase-functions';
dotenv.config({path: '../../.env'}); 
//Created separate initialization module to prevent reinitialization for every single firebase call. Import as needed.


function initializeFirebaseApp(){

    if (getApps().length === 0) {
        
        const serviceAccount = functions.config().fb_frontend_config.json;
        initializeApp({
        credential: cert(serviceAccount)
    });

    }
}

export default initializeFirebaseApp;