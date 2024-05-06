import axios from "axios";
import { auth } from 'firebase/auth';
import apiRoute from '../../config/apiRoute.json';

export async function authRequest() {
    const user = auth().currentUser;

    if (!user) throw new Error('No user signed in');

    try {
        const accessToken = await user.getIdToken();

        if (!accessToken) throw new Error("No access token available");

        const res = await axios.post(`http://localhost:3000/user/auth`, {}, {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true
        });
        return res.data;
        
    } catch (err) {
        throw err;
    }
}