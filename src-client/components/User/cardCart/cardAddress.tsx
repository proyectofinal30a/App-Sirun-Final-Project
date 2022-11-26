import React from "react"
import { Iaddresses } from "../../../../lib/types"
interface prop {
    addresses: Iaddresses[]
    styles: any
    index: number
    mySelect: {
        current: any
    }
}
export default function CardAddress({ addresses, mySelect, styles, index }: prop) {


    mySelect.current = index === 1000 ? {
        name_address: '',
        phone: {
            number: "",
            area_code: ""
        },
        street_name: '',
        street_number: '',
        zip_code: '',
    } : addresses[index]


    return index !== 1000 ?
        <div>
            <h1>{addresses[index].name_address}</h1>
            <h3>Street Name:{addresses[index].street_name}</h3>
            <h3>Street Number:{addresses[index].street_number}</h3>
            <h3>zip_code:{addresses[index].zip_code}</h3>
            <h3>Phone</h3>
            <h4>+{addresses[index].phone.area_code} {addresses[index].phone.number}</h4>
        </div>
        : <h2>Select Address</h2>
} 