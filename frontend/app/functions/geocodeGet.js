import axios from "axios";
import sessionStorage from './sessionStorage.js';

let token = sessionStorage.sessionKey;

export async function geocodeGet(location){

    try {
        const response = await axios.post('http://localhost:3000//api/getGeocode', { token: token, data: location });
        return response;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Code: ", errorCode);
        console.log("Msg :", errorMessage);
        throw error;
    }
}