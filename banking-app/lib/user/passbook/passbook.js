import axios from "axios";
export const passBook = async (id, accountId, params) => {
    const res = await axios.get(`http://127.0.0.1:20200/api/v1/user/${id}/account/${accountId}/transaction/passbook`, { headers: { auth: localStorage.getItem("auth") }, params: params })
    return res
}