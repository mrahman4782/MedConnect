import axios from "axios";
import dotenv from 'dotenv';
dotenv.config({path: '../../.env'}); 

export async function geocodeHandler(address){

    let response = {
        status: '',
        data: {
            lat: '',
            long: ''
        }
      }
    
    const url = `https://geocode.maps.co/search?q=${address}&api_key=${process.env.GEOCODE_KEY}`


    try {
    
        await axios.get()
    } catch (error) {
        
    }
}