import axios from "axios";
import sessionStorage from "./sessionStorage.js";

export async function chatWithGPT(message, chatHistory) {
  try {
    // Make request to backend
    console.log("enteredFunction");
    let token = await sessionStorage.sessionKey;
    console.log("message frontend", message);
    console.log("token", token);
    const response = await axios.post("http://localhost:3000/api/chat", {
      message: message,
      token: token,
      conversationHistory: chatHistory,
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
