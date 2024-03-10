import { axios } from "axios";

const url = ""

export async function getUserInfo() {
    try {
        const res = await axios.post(url,
            {});

        return res.data;

    } catch (err) {
        throw err
    }
}