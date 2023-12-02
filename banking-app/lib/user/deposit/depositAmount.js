import axios from "axios";
export const DepositAmount = async (id, accountId, amount) => {
    console.log(id, 'idd', accountId, "aaaaaaaaaaaaaaaaaaaaaaaaa");
    const res = await axios.put(`http://127.0.0.1:20200/api/v1/user/${id}/account/${accountId}/transaction/deposite`, { amount }, { headers: { auth: localStorage.getItem("auth") } })
    return res
}