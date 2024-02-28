import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import admin from 'firebase-admin'; // Import the default export for auth
import dotenv from 'dotenv';

dotenv.config({path: '../../.env'}); 
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

export async function createUser(email, password) {

  let data = {
    'address' : '',
    'city' : '',
    'dob' : '',
    'email' : '',
    'ethnicity' : '',
    'firstName' : '',
    'lastName' : '',
    'q_any_allergies?' : '',
    'q_any_medications?' : '',
    'q_do_you_drink_alcohol?' : '',
    'q_do_you_smoke?' : '',
    'q_medical_history' : '',
    'sex' : '',
    'state' : '',
    'zip' : '',
  }
  
  try {
    const userRecord = await admin.auth().createUser({
      email: `${email}`,
      password: `${password}`,
      emailVerified: false,
      disabled: false,
    });

    // Update users collection
    let docRef = db.collection('users').doc(userRecord.uid);
    data.email = email;
    await docRef.set(data);

    console.log('Successfully created user:', userRecord.uid);
    return userRecord;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}


