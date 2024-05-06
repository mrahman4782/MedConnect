import axios from "axios";
import sessionStorage from './sessionStorage.js';


export async function getUserInfo() {
    try {

        let token = sessionStorage.sessionKey;
        // Make request to backend
        const response = await axios.post(`http://localhost:3000/api/getUser`, { token: token});
        console.log("Success!");
        console.log(response);
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