import express from "express";
import cors from "cors";

import initializeFirebaseApp from "./firebaseAdminInit.js";
initializeFirebaseApp();

import { createUser } from "./register.js";
import { loginVerify } from "./loginHandler.js";
import { chat } from "./openAI.js";
import { assistantAI } from "./assistantai.js";
import { updateProfile } from "./updateProfile.js";
import { zocdocExtracter2 } from "./zocdocExtracter2.js";
import { geocodeHandler } from "./geocode.js";
import { retrieveUserData } from "./retrieveData.js";


const app = express();
const port = 3000;

app.use(cors());
app.set('trust proxy', 1);
app.use(express.json());

// GET Requests
app.get("/", (req, res) => {
  res.status(200).send(`<h1>Successfully Connected to Server</h1>`);
});
app.post("/api/getUser", async (req, res) => {
  console.log(req);
  let token = req.body.token;
  let returnMessage = await retrieveUserData(token);
  console.log(returnMessage);
  res.status(returnMessage.status).send(returnMessage.data);
});


// POST Requests
app.post("/api/verifyLogin", async (req, res) => {
  console.log(req);
  let token = req.body.token;
  let checkUserLogin = await loginVerify(token);

  console.log(checkUserLogin);
  res
    .status(checkUserLogin.status)
    .send(`Logged in! Expiration time: ${checkUserLogin.data.exp}`);
});

app.post("/api/registerUser", async (req, res) => {
  console.log(req);
  let email = req.body.email;
  let password = req.body.password;
  let checkUserLogin = await createUser(email, password);

  console.log(checkUserLogin);
  res.status(checkUserLogin.status).send(`Registered!`);
});

app.post("/api/chat", async (req, res) => {
  let message = req.body.message;
  let token = req.body.token;
  let conversationHistory = req.body.conversationHistory;
  let checkAPIOutput = await chat(message, conversationHistory, token);
  res.status(checkAPIOutput.status).send(checkAPIOutput.data);
});

app.post("/api/assistantai", async (req, res) => {
  let message = req.body.message;
  let token = req.body.token;
  let checkAPIOutput = await assistantAI(message, token);

  res.status(checkAPIOutput.status).send(checkAPIOutput.data);
});

app.post("/api/updateUser", async (req, res) => {
  console.log(req);
  let token = req.body.token;
  let data = req.body.data;

  let returnMessage = await updateProfile(data, token);
  //let checkUserLogin = await loginVerify(token);

  console.log(returnMessage);
  res.status(returnMessage.status).send(returnMessage.data);
});

app.post("/api/getProviders", async (req, res) => {
  console.log(req);
  let token = req.body.token;
  let data = req.body.data;

  let returnMessage = await zocdocExtracter2(data, token);
  //let checkUserLogin = await loginVerify(token);

  console.log(returnMessage);
  res.status(returnMessage.status).send(returnMessage.data);
});

// Function & route no longer needed.
app.post("/api/getGeocode", async (req, res) => {
  console.log(req);
  let token = req.body.token;
  let data = req.body.data;

  let returnMessage = await geocodeHandler(data, token);
  //let checkUserLogin = await loginVerify(token);

  console.log(returnMessage);
  res.status(returnMessage.status).send(returnMessage.data);
});




app.listen(port, () => console.log(`Listening on port ${port}`));
