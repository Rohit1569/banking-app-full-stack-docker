import axios from "axios"

export const Reset = async (username, oldPassword, newPassword) => {
    console.log("hello")
    const res = await axios.post('http://127.0.0.1:20200/api/v1/user/password', {
        username,
        oldPassword,
        newPassword,

    },
        { headers: { auth: localStorage.getItem("auth") } }
    )
    return res
}