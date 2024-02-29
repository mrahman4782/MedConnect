import express from 'express';
import cors from 'cors';
import {createUser} from './functions/register.js';
import {loginVerify} from './functions/loginHandler.js';


import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import admin from 'firebase-admin'; // Import the default export for auth
import dotenv from 'dotenv';

dotenv.config({path: '../.env'}); 
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;
initializeApp({
  credential: cert(serviceAccount)
});


const app = express();
const port = 3000;
app.use(cors());


// GET Requests
app.get('/', (req, res) => {
    res.status(200).send(`<h1>Successfully Connected to Server</h1>`)
})


// POST Requests
app.post('/api/verifyLogin', async(req, res) => {

    let token = req.body.token;
    let checkUserLogin = await loginVerify(token);
    console.log(req);
    console.log(checkUserLogin);
    
})

app.listen(port, () => console.log(`Listening on port ${port}`));