import axios from "axios"


export const deleteUser = async (id) => {
    console.log(id, ">>>>>>>>>>>>>>>>>>.");
    const res = await axios.delete(`http://127.0.0.1:20200/api/v1/user/${id}`, { headers: { auth: localStorage.getItem('auth') } })
    return res
}
