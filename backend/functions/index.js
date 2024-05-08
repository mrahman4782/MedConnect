import * as functions from 'firebase-functions';
import app from './server';  // Import your Express app

export const api = functions.https.onRequest(app);