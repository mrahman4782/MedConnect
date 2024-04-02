import axios from 'axios';

// this can be used to get users input

async function fetchPlaceDetails() {
 const apiKey = 'AIzaSyA-a5E85PYhJh7UOxhs7eMfMn_toz99-vA';
 const query = 'City College of New York';
 const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`;
 try {
   const response = await axios.get(url);
   console.log(JSON.stringify(response.data, null, 2));
 } catch (error) {
   console.error('Error', error);
 }
}
//Museum of Contemporary Art Australia
fetchPlaceDetails();