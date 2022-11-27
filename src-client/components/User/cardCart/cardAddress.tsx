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
        <div className={styles.addresses_container}>
            <h1>Address name: {addresses[index].name_address}</h1>
            <h3>Street: {addresses[index].street_name} {addresses[index].street_number}</h3>
            <h3>Zip code: {addresses[index].zip_code}</h3>
            <h3>Phone: +{addresses[index].phone.area_code} {addresses[index].phone.number}</h3>
        </div>
        : <h2>Select Address</h2>
} 