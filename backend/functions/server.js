
import express from 'express';
import cors from 'cors';

import initializeFirebaseApp from './firebaseAdminInit.js';
initializeFirebaseApp();

import {createUser} from './register.js';
import {loginVerify} from './loginHandler.js';
import {chat} from './openAI.js';


const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());

// GET Requests
app.get('/', (req, res) => {
    res.status(200).send(`<h1>Successfully Connected to Server</h1>`)
})


// POST Requests
app.post('/api/verifyLogin', async(req, res) => {

    console.log(req);
    let token = req.body.token;
    let checkUserLogin = await loginVerify(token);
    
    console.log(checkUserLogin);
    res.status(checkUserLogin.status).send(`Logged in! Expiration time: ${checkUserLogin.data.exp}`);
    
})

app.post('/api/registerUser', async(req, res) => {

    console.log(req);
    let email = req.body.email;
    let password = req.body.password;
    let checkUserLogin = await createUser(email, password);
    
    console.log(checkUserLogin);
    res.status(checkUserLogin.status).send(`Registered!`);
    
})

app.post('/api/chat', async(req, res) => {

    console.log(req);
    let message = req.body.message;
    let checkAPIOutput = await chat(message);
    
    console.log(checkAPIOutput);
    res.status(checkAPIOutput.status).send(checkAPIOutput.data);
    
})

app.listen(port, () => console.log(`Listening on port ${port}`));