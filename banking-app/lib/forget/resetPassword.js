import axios from "axios"

export const forget = async (username, newPassword) => {
    console.log("hello")
    const res = await axios.put('http://127.0.0.1:20200/api/v1/reset', {
        username,
        newPassword,
    },
        { headers: { auth: localStorage.getItem("auth") } }
    )
    return res
}