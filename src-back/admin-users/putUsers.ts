import axios from "axios"

export const activeUser = async (id:any, status: string) =>{
    try {
        const user: any = await axios.put('/api/adminScope/put/updateUser',
        {
            id,
            role: status
        })
        return user
    } catch (error) {
        return error
    }
}