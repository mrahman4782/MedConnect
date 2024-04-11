import { getFirestore } from 'firebase-admin/firestore';
import admin from 'firebase-admin'; // Import the default export for auth
import {loginVerify} from './loginHandler.js';

const db = getFirestore();
// db.settings({
//     ignoreUndefinedProperties: true,
//   });

let response = {
  status: '',
  data: ''
}

export async function zocdocExtracter2(specialty, session){

    let checkUserLogin = await loginVerify(session);

    if (checkUserLogin.status == 200){
        
        try {
            const docRef = db.collection('providers').doc(specialty);
            const doc = await docRef.get();
            response.status = 200;
            response.data = doc.data();
            
        } catch (error) {
            response.status = 408;
            response.data = "Failed Request";
            console.log(error);
        }
    }
    else {
        response.status = 403;
        response.data = "Unable to authorize user";
    }
    return response;
}
