import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import axios from "axios";
import { retrieveUserData } from "./retrieveData.js";


let response = {
  status: "",
  data: "",
};

// Get user profile from database
async function getUserProfile(session){
  
  let user = {
    firstName: '',
    lastName: '',
    insurance: '',
  };

  try {
    let output = await retrieveUserData(session);
    user.firstName = output.data.firstName;
    user.lastName = output.data.lastName;
    user.insurance = output.data.insurer[0];
    return user;

  } catch (error) {
      console.log(error);
  }
}

// Setup AI model instructions
function createPrompt(firstName, insurance){

  let prompt = `
    Imagine you are a medical assistant AI. Give general answers about medical questions and make sure to refer to specialists. Also use this list of insurances costs for future reference:

    Tylenol | Out-Of-Pocket: $40 | Fidelis Care: $23 | Medicare: $0
    Benzol Peroxide | Self-Pay: $70 | Cigna: $15 | Medicare: $15

    I am a patient with the name ${firstName}. I have ${insurance}. 

    Greet me with my name. Be my medical assistant. Don't mention my insurance information unless I ask about it.
    `;

  return prompt;
}


const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
};

export async function chat(inputMessage, conversationHistory, token) {
  
  let userData, prompt;

  try {
    
    userData = await getUserProfile(token);
    prompt = createPrompt(userData.firstName, userData.lastName);

  } catch (error) {
    console.log(error);
  }

  console.log(conversationHistory);
  const requestData = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: `${prompt}` },
      conversationHistory ? { role: "system", content: `The last user messages from this conversation are: ${conversationHistory}` } : '',
      { role: "user", content: `${inputMessage}` },
    ],
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
    console.log(output.data.choices[0].message);
    return response;
  } catch (error) {
    //console.error("Error:", error);
    console.log(error.response)
    response.status = 403;
    response.data = error;
    return response;
  }
}

//await chat("Also leg hurts? What should I do?", ["Hey I have a question", "My head hurts"], 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc2MDI3MTI2ODJkZjk5Y2ZiODkxYWEwMzdkNzNiY2M2YTM5NzAwODQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWVkY29ubmVjdC1hcHAiLCJhdWQiOiJtZWRjb25uZWN0LWFwcCIsImF1dGhfdGltZSI6MTcxNDY4ODEzMywidXNlcl9pZCI6IlN0TXd4ZUp1SVROVDhMUWJXRURBYko5c1p4dTEiLCJzdWIiOiJTdE13eGVKdUlUTlQ4TFFiV0VEQWJKOXNaeHUxIiwiaWF0IjoxNzE0Njg4MTM0LCJleHAiOjE3MTQ2OTE3MzQsImVtYWlsIjoiam9lQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJqb2VAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.kZHDJvwLc7kAeEBjYmJdl6mxOUPhNZpF9YEa4hbt84nPXpWhAD0DwSu4ijSq1Nru9mECSeH61iEbLFP2X1re1LvBBg4QsrzSgFzKpJnooJT27yY8J_kgo8HN8zUP_HSJbV9XXaS-Du3OrcL3jq-h0v1cnmR3UsDKDTsCQP7TdWmVuyloEWuqP1bG0spsDMRbFFTC996U8MoBYBP0iyrWMgBV1IkfxWeEvmEN6KCHxwqiJx5bs1JflQeekJQq1NjAygEc6nMYGvxeNS1NJdF4YSCGMRhwbHG-QWG-UzD3OysfJ-fGbWopv2IrQXx2r4Qbhw_gZl1Kx2MbES5wItJqkw');

//await getUserProfile('eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc2MDI3MTI2ODJkZjk5Y2ZiODkxYWEwMzdkNzNiY2M2YTM5NzAwODQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWVkY29ubmVjdC1hcHAiLCJhdWQiOiJtZWRjb25uZWN0LWFwcCIsImF1dGhfdGltZSI6MTcxNDY4MDQ1MSwidXNlcl9pZCI6IlN0TXd4ZUp1SVROVDhMUWJXRURBYko5c1p4dTEiLCJzdWIiOiJTdE13eGVKdUlUTlQ4TFFiV0VEQWJKOXNaeHUxIiwiaWF0IjoxNzE0NjgwNDUxLCJleHAiOjE3MTQ2ODQwNTEsImVtYWlsIjoiam9lQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJqb2VAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.AFHXUwNWSZW-5IR8TfJBTIIyPIhrdIACRVCY6tLuaVSme-N3WPaFVBe0j-RV3zuLkrOWLd2hfGPsIpjmiKF1cDd7U3BV5jeZ2ei7KX0Xb0quo1-0emoGbhlLsj-KFV4wrvUnfUcOSzuvDxP-uAJRvKkYYdmdyBqXncECBIVBGXMuBmjcbnv7o3I_9QUvNRQHIe-GWqpfN4fVBiT2AFR6ZHVLsP7ArJST1hsAM6BKlOLZUCMisdAemLmvpfSEdKYAWnB4XkC5ZNzM26KHiXktgLegWmKgkdasdQpNrBtB03ExZofXV6eM60BrEjZg58qQa-0eFsApIxierSCbWTAPjA');