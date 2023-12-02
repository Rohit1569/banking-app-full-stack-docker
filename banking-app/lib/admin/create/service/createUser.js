import axios from "axios";
export const CreateUser = async (name, age, gender, username, password) => {

    const res = await axios.post('http://127.0.0.1:20200/api/v1/user', { name, age, gender, username, password }, { headers: { auth: localStorage.getItem("auth") } })
    return res
}