import axios from "axios";
export const UpdateBank = async (bankName, id) => {

    const res = await axios.put(`http://127.0.0.1:20200/api/v1/bank/${id}`, { bankName }, { headers: { auth: localStorage.getItem("auth") } })
    return res
}