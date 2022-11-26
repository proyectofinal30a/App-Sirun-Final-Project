import React from "react"
import { Iaddresses, IDataAddress, IproductModelCart, IUserBuyer } from "../../../../lib/types"
import * as action from '../../../redux/slice/cart-redux/cart-redux'
import { useDispatch } from 'react-redux'
interface prop {
    data: {
        name: string
        email: string
    }
    mySelect: {
        current: Iaddresses
    }
    styles: any
    inputAddres: IDataAddress
    forButtonMercadoPago: {
        confirmed: Boolean
        payLink: string
    }
    product: IproductModelCart[]

}
export default function ButtonSumbitMercadoPago({ data, product, mySelect, forButtonMercadoPago, inputAddres, styles, }: prop): JSX.Element {

    const { confirmed, payLink } = forButtonMercadoPago
    const dispatch: Function = useDispatch()
    action.sendOrderDetail


    const handleOnclick = () => {
        if (mySelect.current.phone.number) {
            const { zip_code, name_address, id, street_name, street_number, phone } = mySelect.current
            const myUser: IUserBuyer = {
                name: data.name,
                email: data.email,
                address: {
                    id,
                    zip_code,
                    name_address,
                    street_name,
                    street_number,

                },

                phone: {
                    number: phone.number,
                    area_code: phone.area_code
                }
            }

            dispatch(action.sendOrderDetail(myUser, product))
            return
        }
        if (inputAddres.area_code) {
            const { area_code, number, name_address, street_name, street_number, zip_code } = inputAddres
            const myUser: IUserBuyer = {
                name: data.name,
                email: data.email,
                address: {
                    zip_code,
                    name_address,
                    street_name,
                    street_number,
                },

                phone: {
                    number: number,
                    area_code: area_code
                }
            }

            dispatch(action.sendOrderDetail(myUser, product))
            return
        }

    }



    return confirmed ? (
        <div className={styles.btn__align}>
            <a
                href={payLink}
                className={styles.form__input_btn}
                onClick={() => action.resetCart()}
            >
                To go Mercado Pago
            </a>
        </div>
    ) : (
        <div className={styles.btn__align}>
            <button
                className={styles.form__input_btn}
                onClick={handleOnclick}
            >
                Get the payment market link
            </button>
        </div>
    )
} 