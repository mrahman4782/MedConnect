import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin"; // Import the default export for auth
import { loginVerify } from "./loginHandler.js";

const db = getFirestore();

let response = {
  status: "",
  data: "",
};

export async function updateThreadId(threadId, session) {
  let data = {
    threadId: threadId,
  };
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
