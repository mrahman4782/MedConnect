import axios from 'axios';

export async function userRegister(email, password) {
  try {

    // Make request to backend
    const response = await axios.post('http://localhost:3000/api/registerUser', { email: email, password: password });

    return response;

  } catch (error) {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // console.log("Code: ", errorCode);
    // console.log("Msg :", errorMessage);
    // console.log('AHHHHHHHHHHHHHHHHHhh');

    // return error; 
    throw error; //worked better for me
  }
}

export default userRegister;