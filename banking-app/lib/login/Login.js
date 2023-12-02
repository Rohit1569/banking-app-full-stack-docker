import axios from "axios"

export const Login = async (username, password) => {
    console.log("hello")
    const res = await axios.post('http://127.0.0.1:20200/api/v1/login', {
        username,
        password
    }
    )
    return res
}