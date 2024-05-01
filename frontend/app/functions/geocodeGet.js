import axios from "axios";
import sessionStorage from './sessionStorage.js';

let token = sessionStorage.sessionKey;

export default async function geocodeGet(location){

    try {
        const response = await axios.post('http://localhost:3000/api/getGeocode', { data: location, token: token });
        return response;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Code: ", errorCode);
        console.log("Msg :", errorMessage);
        throw error;
    }
}