import axios from 'axios';
import sessionStorage from './sessionStorage.js';
import apiRoute from '../../config/apiRoute.json';

export async function providerRetrieve(userData) {
    try {

        let token = sessionStorage.sessionKey;
        let userId = sessionStorage.userId;
        const response = await axios.post(`http://localhost:3000/api/getProviders`, { token: token, data: userData});
        console.log("Successfully retrieved providers!");
        return response;

    } catch (error) {
        
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        return error;
    }
}

export default providerRetrieve;