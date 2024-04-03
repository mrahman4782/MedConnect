import axios, { Axios } from "axios";

const url = ""

export async function getMap() {
    try {
        const res = await axios.post(url,
            {});
        return res;
    } catch (err) {
        throw err
    }
}