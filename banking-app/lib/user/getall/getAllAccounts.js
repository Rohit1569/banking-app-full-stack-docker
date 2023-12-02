import axios from "axios"


export const GetAllAccount = async (id, params) => {
    const res = await axios.get(`http://127.0.0.1:20200/api/v1/user/${id}/account`, { headers: { auth: localStorage.getItem('auth') }, params: params })
    return res
}