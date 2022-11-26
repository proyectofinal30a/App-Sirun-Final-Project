
import React from "react"
import { Iaddresses, IDataAddress } from "../../../../lib/types"
import CardAddress from "./cardAddress"

interface prop {
    data: {
        user: {
            email: string
            name: string
        }
    },
    addresses: Iaddresses[],
    styles: any
    mySelect: any
    setAddress: Function
    address: number
    setButtonInput: Function
    buttonInput: boolean
    personInfo: IDataAddress
    setInputAddres: Function

}

export default function CardUserAddress({
    data,
    mySelect,
    setButtonInput,
    buttonInput,
    address,
    setAddress,
    addresses,
    styles,
    personInfo,
    setInputAddres
}: prop) {
    if (!addresses[0]) return <div>NO Address</div>
    console.log('holis');

    return (
        <div className={styles.first__column}>
            <h2 className={styles.column__title}>Checkout</h2>
            <fieldset className={styles.fieldset__conteiner}>
                <p>Name: {data.user.name}</p>
                <p>Email: {data.user.email}</p>
            </fieldset>
            <div>
                <select
                    onClick={() => {
                        buttonInput && setButtonInput(!buttonInput);
                        setInputAddres(personInfo)
                    }}
                    onChange={(e) => setAddress(Number(e.target.value))}
                >
                    {addresses
                        .map((address, index) => {
                            return index === 0 ?
                                <><option key={index} value={1000}>Undo</option>
                                    <option key={index + 22} value={index}>{address.name_address}</option> </>
                                : <option key={index} value={index}>{address.name_address}</option>

                        })}
                </select>
                <CardAddress addresses={addresses} mySelect={mySelect} index={address} styles={styles} />
            </div>

        </div>
    )
} 