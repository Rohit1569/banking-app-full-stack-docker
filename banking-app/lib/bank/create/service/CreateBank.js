import axios from "axios";
export const CreateBank = async (bankName) => {

    const res = await axios.post('http://127.0.0.1:20200/api/v1/bank', { bankName }, { headers: { auth: localStorage.getItem("auth") } })
    return res
}