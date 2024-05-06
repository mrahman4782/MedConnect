import axios from 'axios';
import sessionStorage from './sessionStorage.js';
import apiRoute from '../../config/apiRoute.json';

export async function updateUserInfo(userData) {
    try {

        let token = sessionStorage.sessionKey;
        let userId = sessionStorage.userId;
        console.log(userId);
        const response = await axios.post(`http://localhost:3000/api/updateUser`, { token: token, data: userData});
        console.log("Successfully updated user!");
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