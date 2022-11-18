import axios from "axios"


export function createPayment (data: any){
const info = axios({
    method: "post",
    url: '/api/mercadopago/createPayment',
    data: data,
}).then((response:any) => {
   return  {
        info: response.data,
        state: true
    }
})

return info
}