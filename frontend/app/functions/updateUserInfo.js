import axios from "axios";

const url = ""

export async function updateUserInfo(userData) {
    try {
        const res = await axios.post(url,
            {});
        return console.log("UserData: ", userData)
        //remove token? firebase does this automatically?

    } catch (err) {
        throw err
    }
}