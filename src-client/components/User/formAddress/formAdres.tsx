import React, { useEffect, useState } from "react";
import styles from "../../../styles/FormCheckout.module.css";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Modal from "react-modal";
import { sendOrderDetail, resetCart } from "../../../redux/slice/cart-redux/cart-redux";
import validate from "../../../controllers/validateFormCheckout";
import { IUserBuyer, Ireducers, Iaddresses, IDataAddress } from '../../../../lib/types'
import vericationSubminObj from "../../../controllers/verificationFormCart";
import { useSession } from "next-auth/react";

interface state {
    buttonInput: boolean
    setButtonInput: Function
    setAddress: Function
    inputAddres: IDataAddress
    setInputAddres: any
    setErrors: Function
    errors: IDataAddress
    mySelect: any
    personInfo: IDataAddress
}

export default function MyFormAdd({ buttonInput, personInfo, inputAddres, mySelect, setErrors, setInputAddres, errors, setButtonInput, setAddress }: state) {


    type buttonEvenOnclik = React.MouseEvent<HTMLButtonElement, MouseEvent>
    type EventInputChange = React.ChangeEvent<HTMLInputElement>


    const handleInputChange = (event: EventInputChange) => {
        const { name, value } = event.target;
        setInputAddres({ ...inputAddres, [name]: value })
        setErrors(validate({ ...inputAddres, [name]: value }))
    }
    console.log(errors);
    const mycondicion = buttonInput ? "reset Inputs" : "Agree Address";
    return (
        <div>
            <input type="button" value={mycondicion} onClick={() => {
                setButtonInput(!buttonInput)
                setInputAddres(personInfo)
                setAddress(1000)
                mySelect.current = {
                    name_address: '',
                    phone: {
                        number: "",
                        area_code: ""
                    },
                    street_name: '',
                    street_number: '',
                    zip_code: '',
                }
            }} />
            {buttonInput &&
                <div>
                    <fieldset className={styles.fieldset__conteiner}>
                        <div className={styles.conteiner__2col_row}>
                            <div className={styles.container__row_column}>
                                <label className={styles.form__label} htmlFor="areaCode">
                                    Name Addres
                                </label>
                                <input
                                    className={styles.form__input}
                                    type="text"
                                    name="name_address"
                                    value={inputAddres.name_address}
                                    onChange={handleInputChange}
                                    placeholder="Name Address"
                                    autoComplete="on"
                                    required
                                />
                                {errors.name_address && (
                                    <p className={styles.error}>{errors.name_address}</p>
                                )}
                            </div>

                            <div className={styles.container__row_column}>
                                <label className={styles.form__label} htmlFor="areaCode">
                                    Area Code
                                </label>
                                <input
                                    className={styles.form__input}
                                    type="text"
                                    name="area_code"
                                    value={inputAddres.area_code}
                                    onChange={handleInputChange}
                                    placeholder="Area Code"
                                    autoComplete="on"
                                    required
                                />
                                {errors.area_code && (
                                    <p className={styles.error}>{errors.area_code}</p>
                                )}
                            </div>

                            <div className={styles.container__row_column}>
                                <label className={styles.form__label} htmlFor="phone">
                                    Phone
                                </label>
                                <input
                                    className={styles.form__input}
                                    type="text"
                                    name="number"
                                    value={inputAddres.number}
                                    onChange={handleInputChange}
                                    placeholder="Phone"
                                    autoComplete="on"
                                    required
                                />
                                {errors.number && <p className={styles.error}>{errors.number}</p>}
                            </div>
                        </div>
                    </fieldset>

                    <fieldset className={styles.fieldset__conteiner}>
                        <div className={styles.conteiner__3col_row}>
                            <div className={styles.container__row_column}>
                                <label className={styles.form__label} htmlFor="streetName">
                                    Street Name
                                </label>
                                <input
                                    className={styles.form__input}
                                    type="text"
                                    name="street_name"
                                    value={inputAddres.street_name}
                                    onChange={handleInputChange}
                                    placeholder="Street Name"
                                    autoComplete="on"
                                    required
                                />
                                {errors.street_name && (
                                    <p className={styles.error}>{errors.street_name}</p>
                                )}
                            </div>
                            <div className={styles.container__row_column}>
                                <label className={styles.form__label} htmlFor="streetNumber">
                                    Street Number
                                </label>
                                <input
                                    className={styles.form__input}
                                    type="text"
                                    name="street_number"
                                    value={inputAddres.street_number}
                                    onChange={handleInputChange}
                                    placeholder="Street Number"
                                    autoComplete="on"
                                    required
                                />
                                {errors.street_number && (
                                    <p className={styles.error}>{errors.street_number}</p>
                                )}
                            </div>
                            <div className={styles.container__row_column}>
                                <label className={styles.form__label} htmlFor="zipCode">
                                    Zip Code
                                </label>
                                <input
                                    className={styles.form__input}
                                    type="text"
                                    name="zip_code"
                                    value={inputAddres.zip_code}
                                    onChange={handleInputChange}
                                    placeholder="Zip Code"
                                    autoComplete="on"
                                    required
                                />
                                {errors.zip_code && (
                                    <p className={styles.error}>{errors.zip_code}</p>
                                )}
                            </div>
                        </div>
                    </fieldset>
                </div>
            }
        </div>
    )
}


