import axios from "axios";
import sessionStorage from './sessionStorage.js';
import apiRoute from '../../config/apiRoute.json';

export async function getUserInfo() {
    try {

        let token = sessionStorage.sessionKey;
        // Make request to backend
        const response = await axios.post(`${apiRoute.endpoint}/api/getUser`, { token: token});
        console.log("Success!");
        return response;

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        return error;
    }
}

export default getUserInfo;