import axios from "axios";
export const TransferAmount = async (id, accountId, receiverAccountId, transferAmount) => {
    // console.log(id, 'idd', accountId, "aaaaaaaaaaaaaaaaaaaaaaaaa");
    const res = await axios.put(`http://127.0.0.1:20200/api/v1/user/${id}/account/${accountId}/transaction/transfer`, { receiverAccountId, transferAmount }, { headers: { auth: localStorage.getItem("auth") } })
    return res
}