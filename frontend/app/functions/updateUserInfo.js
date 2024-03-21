import axios from 'axios';
import sessionStorage from './sessionStorage.js';


export async function updateUserInfo(userData) {
    try {

        let token = sessionStorage.sessionKey;

        // Make request to backend
        const response = await axios.post('http://localhost:3000/api/updateUser', { token: token, data: userData});
        console.log("MOOO");
        return response;

    } catch (error) {
        
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        return error;
    }
}


export default updateUserInfo;