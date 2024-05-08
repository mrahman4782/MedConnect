import axios from "axios";
import dotenv from 'dotenv';
dotenv.config({path: '../../.env'}); 
import {loginVerify} from './loginHandler.js';
import * as functions from 'firebase-functions';


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
    function reformatAddress(inputString) {
        return inputString.replace(/\s+/g, '+');
    }

export async function geocodeHandler(address, session){

    address = reformatAddress(address);
    const urlNew = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${functions.config().geocode.key}`
    
    //const url = `https://geocode.maps.co/search?q=${address}&api_key=${process.env.GEOCODE_KEY}`;

    //let checkUserLogin = await loginVerify(session);
    let checkUserLogin = {};
    checkUserLogin.status = 200;

    if (checkUserLogin.status == 200){
        try {    
            
            let output = await axios.get(urlNew);
            response.data.lat = output.data.results[0].geometry.location.lat;
            response.data.lon = output.data.results[0].geometry.location.lng;
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

