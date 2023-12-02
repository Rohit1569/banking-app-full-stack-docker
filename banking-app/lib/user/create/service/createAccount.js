import axios from "axios";
export const CreateAccount = async (id, bankId) => {

    const res = await axios.post(`http://127.0.0.1:20200/api/v1/user/${id}/account`, { bankId }, { headers: { auth: localStorage.getItem('auth') } })
    return res
}