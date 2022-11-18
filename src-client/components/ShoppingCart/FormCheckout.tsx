import React, { useState } from 'react'
import styles from "../../styles/FormCheckout.module.css";
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image';
import Modal from 'react-modal';
import { sendOrderDetail } from "../../redux/slice/cart-redux/cart";
import validate from '../../controllers/validateFormCheckout';
//PROBLEMA AL VALIDAR CON AUTOCOMPLETADO!!


/// PARA DATOS DE ENTREGA
const FormCheckout = (): JSX.Element => {
    const productsInCart = useSelector((state: any) => state.reducerCart.products)

    const personInfo = {
        name: '',
        email: '',
        phone: '',
        areaCode: '',
        zipCode: '',
        streetName: '',
        streetNumber: '',
    }
    const [inputUser, setInputUser] = useState(personInfo);
    const [errors, setErrors] = useState(personInfo)
    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setInputUser({ ...inputUser, [name]: value })
        setErrors(validate({ ...inputUser, [name]: value }))
    }

    // MODAL
    const [modalIsOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false);
    }

    //modal 
    const openCheckModal = (e: Event, person: any) => {
        e.preventDefault();
        setIsOpen(true);
        const errorSave = validate(person);

        if (Object.values(errorSave).length !== 0) {
            alert('Please complete the form correctly')
        }
    }

    //submitea cuando se cliquea el boton del modal
    async function handleSubmit(e: Event) {
        e.preventDefault();
        const info = {
            products: productsInCart,
            infoBuyer: inputUser
        }
        sendOrderDetail(info)
    }

    let total = 0;
    productsInCart.map((elem: any) => { return total += elem.subTotal })

    return (
        <div className={styles.checkout__container}>
            <div className={styles.first__column}>
                <h2 className={styles.column__title}>Checkout</h2>
                <fieldset className={styles.fieldset__conteiner}>
                    <label className={styles.form__label} htmlFor="name">Full Name</label>
                    <input className={styles.form__input} type="text" name="name" value={inputUser.name} onChange={(e: any) => handleInputChange(e)} placeholder="Name" autoComplete='on' required />
                    {errors.name && <p className={styles.error}>{errors.name}</p>}
                   
                    <label className={styles.form__label} htmlFor="email">Email</label>
                    <input className={styles.form__input} type="email" name="email" value={inputUser.email} onChange={(e: any) => handleInputChange(e)} placeholder="Email" autoComplete='on' required />
                    {errors.email && <p className={styles.error}>{errors.email}</p>}
                </fieldset>

                <fieldset className={styles.fieldset__conteiner}>
                    <div className={styles.conteiner__2col_row}>
                        <div className={styles.container__row_column}>
                            <label className={styles.form__label} htmlFor="areaCode">Area Code</label>
                            <input className={styles.form__input} type="text" name="areaCode" value={inputUser.areaCode} onChange={(e: any) => handleInputChange(e)} placeholder="Area Code" autoComplete='on' required />
                            {errors.areaCode && <p className={styles.error}>{errors.areaCode}</p>}
                         </div>

                    <div className={styles.container__row_column}>
                        <label className={styles.form__label} htmlFor='phone' >Phone</label>
                        <input className={styles.form__input} type="tel" name="phone" value={inputUser.phone} onChange={(e: any) => handleInputChange(e)} placeholder="Phone" autoComplete='on' required />
                        {errors.phone && <p className={styles.error}>{errors.phone}</p>}
                    </div>
                </div>
                </fieldset>

                <fieldset className={styles.fieldset__conteiner}>
                   <div className={styles.conteiner__3col_row}>
                   <div className={styles.container__row_column}>
                        <label className={styles.form__label} htmlFor="streetName">Street Name</label>
                        <input className={styles.form__input} type="text" name='streetName' value={inputUser.streetName} onChange={(e: any) => handleInputChange(e)} placeholder="Street Name" autoComplete='on' required />
                        {errors.streetName && <p className={styles.error}>{errors.streetName}</p>}
                    </div>
                    <div className={styles.container__row_column}>
                        <label className={styles.form__label} htmlFor="streetNumber">Street Number</label>
                        <input className={styles.form__input} type="text" name="streetNumber" value={inputUser.streetNumber} onChange={(e: any) => handleInputChange(e)} placeholder="Street Number" autoComplete="on" required />
                        {errors.streetNumber && <p className={styles.error}>{errors.streetNumber}</p>}
                    </div>
                    <div className={styles.container__row_column}>
                        <label className={styles.form__label} htmlFor="zipCode">Zip Code</label>
                        <input className={styles.form__input} type="text" name="zipCode" value={inputUser.zipCode} onChange={(e: any) => handleInputChange(e)} placeholder="Zip Code" autoComplete='on' required />
                        {errors.zipCode && <p className={styles.error}>{errors.zipCode}</p>}
                    </div>
                    </div>
                </fieldset>
        
            <div className={styles.btn__align}>
                <button className={styles.form__input_btn} disabled={Object.values(errors).length !== 0} onClick={(e: any) => openCheckModal(e, inputUser)} >Continue</button>
            </div>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className={styles.modal}
                    contentLabel="Example Modal"
                >
                    <h2>Confirm your information</h2>
                    <button onClick={closeModal}>x</button>

                    <p>{inputUser.name}</p>
                    <p>{inputUser.email}</p>
                    <p>{inputUser.phone}</p>
                    <p>{inputUser.areaCode}</p>
                    <p>{inputUser.zipCode}</p>
                    <p>{inputUser.streetName}</p>
                    <p>{inputUser.streetNumber}</p>

                    <form className={styles.first__column} onSubmit={(e: any) => handleSubmit(e)}>
                        <button className={styles.form__input_btn} type="submit">Confirmar Datos</button>
                    </form>
                </Modal>
            </div>

            <div className={styles.second__column}>
                <h2 className={styles.column__title}>Order Summary</h2>
                <div className={styles.item__container}>
                    {productsInCart?.map((elem: any) => {
                        return (
                            <div className={styles.item} key={elem.product.id}>

                            <div className={styles.product__img_container}>
                                <Image
                                    key={elem.product.image[0]}
                                    src={elem.product.image[0]}
                                    width={100}
                                    alt={elem.product.name}
                                    height={100}
                                    priority
                                    className={styles.product_card__img}
                                />
                            </div>

                      
                                <div className={styles.item__info}>
                                    <h3>{elem.product.name}</h3>
                                    <p>Quantity: {elem.quantity}</p>
                                    <p>Price x 1: ${elem.product.price}</p>
                                </div>

                                <h2 className={styles.item__subtotal}>Subtotal: <br/> ${elem.subTotal}</h2>
                              
                            </div>
                        );
                    })}
                </div>

                <div className={styles.total__container}>   
                    {/* //para cuando implementemos el envio */}
                    {/* <h2 className={styles.__total}>Costos de envio:</h2> */}
                    <h2 className={styles.__total}>TOTAL: ${total}</h2>
                </div>
            </div>
        </div >
    )
}

export default FormCheckout;
