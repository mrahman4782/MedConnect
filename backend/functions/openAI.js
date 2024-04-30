import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import axios from "axios";

let response = {
  status: "",
  data: "",
};

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
};

export async function chat(inputMessage) {
  const requestData = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `${inputMessage}` }],
    temperature: 0.7,
  };

  try {
    const output = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      requestData,
      config
    );

    response.status = 200;
    response.data = output.data.choices[0].message;
    return response;
  } catch (error) {
    console.error("Error:", error);
    response.status = 403;
    response.data = error;
    return response;
  }
}
