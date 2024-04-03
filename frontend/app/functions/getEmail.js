import { axios } from "axios";

const url = ""

export async function getEmail() {
    try {
        const res = await axios.post(url,
            {});
        return res.data;

    } catch (err) {

    }
}