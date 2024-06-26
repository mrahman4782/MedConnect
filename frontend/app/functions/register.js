import axios from 'axios';
import apiRoute from '../../config/apiRoute.json';

export async function userRegister(email, password) {
  try {
    // Make request to backend
    const response = await axios.post(`${apiRoute.endpoint}/api/registerUser`, { email: email, password: password });
    return response;

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Code: ", errorCode);
    console.log("Msg :", errorMessage);
    return error; 
  }
}

export default userRegister;