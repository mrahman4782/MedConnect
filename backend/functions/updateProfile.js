
import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin"; // Import the default export for auth
import { loginVerify } from "./loginHandler.js";


const db = getFirestore();
db.settings({
  ignoreUndefinedProperties: true,
});

let response = {
  status: "",
  data: "",
};


export async function updateProfile(userData, session) {

    let data = {
        'address' : 'ga',
        'city' : "",
        'dob' : "",
        'email' : "",
        'ethnicity' : "",
        'firstName' : "",
        'insurer' : "",
        'lastName' : "",
        'phone' : "",
        'primary_physician' : "",
        'q_any_allergies?' : "",
        'q_any_medications?' : "",
        'q_do_you_drink_alcohol?' : "",
        'q_do_you_smoke?' : "",
        'q_medical_history' : "",
        'sex' : "",
        'threadId': "",
        'state' : "",
        'zip' : "",
    };

    data.address = userData.address;
    data['q_any_allergies?'] = userData.allergies;
    data.city = userData.city;
    data.dob = userData.dateOfBirth;
    data['q_do_you_drink_alcohol?'] = userData.drinkAlcohol;
    data.email = userData.emailAddress;
    data.ethnicity = userData.ethnicity;
    data.firstName = userData.firstName;
    data.insurer = userData.insurer;
    data.lastName = userData.lastName;
    data['q_medical_history'] = userData.medicalHistory;
    data['q_any_medications?'] = userData.medications;
    data.phone = userData.phoneNumber;
    data.primary_physician = userData.physician;
    data.sex = userData.sex;
    data['q_do_you_smoke?'] = userData.smoke;
    data.state = userData.stateUS;
    data.zip = userData.zip;
    data.threadId = userData.threadId;


  // verify the user is logged in
  let checkUserLogin = await loginVerify(session);
  //let checkUserLogin = {'status' : 200};
  console.log(checkUserLogin.data.uid);

  if (checkUserLogin.status == 200) {
    try {
      console.groupCollapsed(data);
      let docRef = await db
        .collection("users")
        .doc(checkUserLogin.data.uid)
        .update(data);
      response.status = 200;
      response.data = "Successfully updated user";
    } catch (error) {
      response.status = 408;
      response.data = "Request timeout";
      console.log(error);
    }
  } else {
    response.status = 403;
    response.data = "Unable to authorize user";
  }

  return response;
}
