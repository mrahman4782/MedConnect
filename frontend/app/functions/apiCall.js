import axios from 'axios';

export async function chatWithGPT(message) {
    try {
        
      // Make request to backend
        const response = await axios.post('http://localhost:3000/api/chat', { message: message }); 
        console.log(response.data.content);
        return response.data.content;

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        console.log('AHHHHHHHHHHHHHHHHHhh');

        return error;
    }
  }

export default chatWithGPT;
