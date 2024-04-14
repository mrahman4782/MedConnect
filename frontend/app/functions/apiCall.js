import axios from "axios";

export async function chatWithGPT(message) {
  try {
    // Make request to backend
    console.log("message frontent", message);
    const response = await axios.post("http://localhost:3000/api/assistantai", {
      message: message,
    });
    console.log("Content", response.data);
    return response.data;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("error code", errorCode);
    console.log("error message", errorMessage);
    console.log("AHHHHHHHHHHHHHHHHHhh");

    return error;
  }
}

export default chatWithGPT;
