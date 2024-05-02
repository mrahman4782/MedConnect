import axios from "axios";

export async function chatWithBaseGPT(message) {
  try {
    const response = await axios.post("http://localhost:3000/api/chat", {
      message: message,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export default chatWithBaseGPT;
