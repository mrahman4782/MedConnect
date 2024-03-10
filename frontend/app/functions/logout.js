import { axios } from "axios";

const url = ""

export async function logout(email) {
    try {
        const res = await axios.post(url,
            { email },
            { withCredentials: true });

        //remove token? firebase does this automatically?

    } catch (err) {
        throw err
    }
}