import axios from "axios";
import dotenv from 'dotenv';
dotenv.config({path: '../../.env'}); 
import {loginVerify} from './loginHandler.js';

let response = {
    status: '',
    data: {
        lat: '',
        lon: ''
    }
  }

  function waitOneSecond() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('1 second has passed.');
            resolve(); // Resolve the promise after 1 second
        }, 1000);
    });
}

export async function geocodeHandler(address, session){

    const url = `https://geocode.maps.co/search?q=${address}&api_key=${process.env.GEOCODE_KEY}`;

    let checkUserLogin = await loginVerify(session);

    if (checkUserLogin.status == 200){
        try {    
            await waitOneSecond();
            let output = await axios.get(url);
            response.data.lat = output.data[0].lat;
            response.data.lon = output.data[0].lon;
            response.status = 200;
    
        } catch (error) {
            console.error('Error creating user:', error);
            response.status = 404;
            response.data = error;
        }
    } else {

        response.status = 403;
        response.data = "Unable to authorize user";
    }

    return response;
}
