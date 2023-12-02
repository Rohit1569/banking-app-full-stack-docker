import axios from "axios"

export const authorize = async () => {
    const res = await axios.post(`http://127.0.0.1:20200/api/v1/lock`, { username: localStorage.getItem("username") },
        { headers: { auth: localStorage.getItem("auth") } })
    return res
}