import axios from 'axios';

export async function userRegister(email, password) {
    try {
        
      // Make request to backend
      const response = await axios.post('http://localhost:3000/api/registerUser', { email: email, password: password }); 

      return response;

    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      console.log('AHHHHHHHHHHHHHHHHHhh');

      return error;
    }
  }

export default userRegister;