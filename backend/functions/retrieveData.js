import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin"; // Import the default export for auth
import { loginVerify } from "./loginHandler.js";

const db = getFirestore();

let response = {
  status: "",
  data: "",
};

export async function retrieveUserData(session) {
  // verify the user is logged in
  let checkUserLogin = await loginVerify(session);

  if (checkUserLogin.status == 200) {
    try {
      let docRef = await db.collection("users").doc(checkUserLogin.data.uid);
      const doc = await docRef.get();
      console.log("dataRetrieved", doc.data());
      response.status = 200;
      response.data = doc.data();
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
