import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import admin from 'firebase-admin'; // Import the default export for auth


import initializeFirebaseApp from './firebaseAdminInit.js';
initializeFirebaseApp();

const db = getFirestore();

let response = {
  status: '',
  data: ''
}

function passwordValid(password){
  
  // Ensure that the password has at least 8 characters and a number
  if (password.length < 8) {
    return false;
  }
  let containsNumber = /\d/.test(password);
  if (!containsNumber) {
      return false;
  }
  return true;  
}

export async function createUser(email, password) {

  let data = {
    'address' : '',
    'city' : '',
    'dob' : '',
    'email' : '',
    'ethnicity' : '',
    'firstName' : '',
    'lastName' : '',
    'primary_physician' : '',
    'q_any_allergies?' : '',
    'q_any_medications?' : '',
    'q_do_you_drink_alcohol?' : '',
    'q_do_you_smoke?' : '',
    'q_medical_history' : '',
    'sex' : '',
    'state' : '',
    'zip' : '',
  }

  if (!passwordValid(password)){
    response.status = '403';
    response.data = 'Password does not meet requirements';
    return response;
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

    response.status = '201';
    response.data = userRecord;

    console.log('Successfully created user:', userRecord.uid);
    return response;

  } catch (error) {
    console.error('Error creating user:', error);
    response.status = '500';
    response.data = error;
    return response;
  }
}


//console.log(passwordValid('66666a66'));
// let output = await createUser('jooe@gmdail.com', 'joe12345');
// console.log(output.providerData);
