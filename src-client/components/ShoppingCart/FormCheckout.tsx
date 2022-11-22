import React, { useEffect, useState } from "react";
import styles from "../../styles/FormCheckout.module.css";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Modal from "react-modal";
import { sendOrderDetail, resetCart } from "../../redux/slice/cart-redux/cart-redux";
import validate from "../../controllers/validateFormCheckout";

import { symlink } from "fs";

// PARA DATOS DE ENTREGA

const FormCheckout = (): JSX.Element => {
  const dispatch:Function = useDispatch();

  const productsInCart = useSelector((state: any) => state.reducerCart.products);
  const confirmedCart = useSelector((state: any) => state.reducerCart.confirmed);
  const payLink = useSelector((state: any) => state.reducerCart.payLink);

  const personInfo = {
    name: "",
    email: "",
    phone: "",
    areaCode: "",
    zipCode: "",
    streetName: "",
    streetNumber: "",
  };

  useEffect(() => { }, [confirmedCart]);


  const [inputUser, setInputUser] = useState(personInfo);
  const [errors, setErrors] = useState(personInfo);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setInputUser({ ...inputUser, [name]: value });
    setErrors(validate({ ...inputUser, [name]: value }));
  };


  // MODAL
  const [modalIsOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  const openCheckModal = (e: Event, person: any) => {
    e.preventDefault();
    setIsOpen(true);
    const errorSave = validate(person);

    if (Object.values(errorSave).length !== 0) {
      alert("Please complete the form correctly");
    }
  };



  // Submitea cuando se cliquea el botón del modal (el form esta dentro del modal)
  async function handleSubmit(e: Event) {
    e.preventDefault();
    const info:any = {
      products: productsInCart,
      infoBuyer: inputUser,
    };

    dispatch(sendOrderDetail(info));
  }

  let total = 0;

  productsInCart.map((elem: any) => {
    return (total += elem.subTotal);
  });


  return (
    <div className={styles.checkout__container}>
      <div className={styles.first__column}>
        <h2 className={styles.column__title}>Checkout</h2>
        <fieldset className={styles.fieldset__conteiner}>
          <label className={styles.form__label} htmlFor="name">
            Full Name
          </label>
          <input
            className={styles.form__input}
            type="text"
            name="name"
            value={inputUser.name}
            onChange={(e: any) => handleInputChange(e)}
            placeholder="Name"
            autoComplete="on"
            required
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}

          <label className={styles.form__label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.form__input}
            type="email"
            name="email"
            value={inputUser.email}
            onChange={(e: any) => handleInputChange(e)}
            placeholder="Email"
            autoComplete="on"
            required
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </fieldset>

        <fieldset className={styles.fieldset__conteiner}>
          <div className={styles.conteiner__2col_row}>
            <div className={styles.container__row_column}>
              <label className={styles.form__label} htmlFor="areaCode">
                Area Code
              </label>
              <input
                className={styles.form__input}
                type="text"
                name="areaCode"
                value={inputUser.areaCode}
                onChange={(e: any) => handleInputChange(e)}
                placeholder="Area Code"
                autoComplete="on"
                required
              />
              {errors.areaCode && (
                <p className={styles.error}>{errors.areaCode}</p>
              )}
            </div>

            <div className={styles.container__row_column}>
              <label className={styles.form__label} htmlFor="phone">
                Phone
              </label>
              <input
                className={styles.form__input}
                type="tel"
                name="phone"
                value={inputUser.phone}
                onChange={(e: any) => handleInputChange(e)}
                placeholder="Phone"
                autoComplete="on"
                required
              />
              {errors.phone && <p className={styles.error}>{errors.phone}</p>}
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
                name="streetName"
                value={inputUser.streetName}
                onChange={(e: any) => handleInputChange(e)}
                placeholder="Street Name"
                autoComplete="on"
                required
              />
              {errors.streetName && (
                <p className={styles.error}>{errors.streetName}</p>
              )}
            </div>
            <div className={styles.container__row_column}>
              <label className={styles.form__label} htmlFor="streetNumber">
                Street Number
              </label>
              <input
                className={styles.form__input}
                type="text"
                name="streetNumber"
                value={inputUser.streetNumber}
                onChange={(e: any) => handleInputChange(e)}
                placeholder="Street Number"
                autoComplete="on"
                required
              />
              {errors.streetNumber && (
                <p className={styles.error}>{errors.streetNumber}</p>
              )}
            </div>
            <div className={styles.container__row_column}>
              <label className={styles.form__label} htmlFor="zipCode">
                Zip Code
              </label>
              <input
                className={styles.form__input}
                type="text"
                name="zipCode"
                value={inputUser.zipCode}
                onChange={(e: any) => handleInputChange(e)}
                placeholder="Zip Code"
                autoComplete="on"
                required
              />
              {errors.zipCode && (
                <p className={styles.error}>{errors.zipCode}</p>
              )}
            </div>
          </div>
        </fieldset>


        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className={styles.modal}
          contentLabel="Example Modal"
        >
          <div className={styles.modal__container}>
            <div className={styles.modal__btn_right_container}>
              <button className={styles.modal__close_modal_btn} onClick={closeModal}>x</button>
            </div>

            <h2>Confirm your information</h2>

            <div className={styles.modal__client_container}>
              <p className={styles.modal__client_name}>
                <span className={styles.client_info_span}>Name: </span>{inputUser.name.toLowerCase()}
              </p>
              <p>
                <span className={styles.client_info_span}>E-mail: </span>{inputUser.email}
              </p>
              <div className={styles.modal__client_phone}>
                <p>
                  <span className={styles.client_info_span}>Phone number: </span>
                  {inputUser.areaCode}
                </p>
                <p>{inputUser.phone}</p>
              </div>

              <p>
                <span className={styles.client_info_span}>Zip code: </span>{inputUser.zipCode}
              </p>
              <div className={styles.modal__client_address_container}>
                <p className={styles.modal__client_street}>
                  <span className={styles.client_info_span}>Address: </span>{inputUser.streetName.toLowerCase()}
                </p>
                <p>, {inputUser.streetNumber}</p>
              </div>
            </div>

            {!confirmedCart && !payLink &&
              <div className={styles.modal__confirm_btn_container}>
                <button
                  type="submit"
                  onClick={(e: any) => handleSubmit(e)}
                  className={styles.modal__confirm_btn}
                >
                  Confirm information
                </button>
              </div>
            }

            {confirmedCart && payLink && (
              <div className={styles.modal__pay_btn_container}>
                <button
                  className={styles.modal__pay_btn}
                  onClick={() => resetCart()}
                >
                  <a href={payLink}>Continue to MercadoPago</a>
                </button>
              </div>
            )}
          </div>
        </Modal>
      </div>

      <div className={styles.second__column}>
        <h2 className={styles.column__title}>Order Summary</h2>
        <div className={styles.item__container}>
          {productsInCart?.map((elem: any) => {
            const myUrl = elem?.product?.image?.[0]?.image
            return (
              <div className={styles.item} key={elem.product.id}>
                <div className={styles.product__img_container}>
                  <Image
                    key={myUrl}
                    src={myUrl}
                    width={100}
                    alt={elem.product.name.toLowerCase()}
                    height={100}
                    priority
                    className={styles.product_card__img}
                  />
                </div>

                <div className={styles.item__info}>
                  <h3>{elem.product.name.toLowerCase()}</h3>
                  <p>Quantity: {elem.quantity}</p>
                  <p>Price x 1: ${elem.product.price}</p>
                </div>

                <h2 className={styles.item__subtotal}>
                  Subtotal: <br /> ${elem.subTotal}
                </h2>
              </div>
            );
          })}
        </div>

        <div className={styles.total__container}>
          <div className={styles.__shipping_line}>
            <p className={styles.__shipping}>Shipping </p>
            <p className={styles.__shipping}>$...</p>
          </div>
          <div className={styles.__total_line}>
            <h2 className={styles.__total}>TOTAL </h2>
            <h2 className={styles.__total}>${total}</h2>
          </div>
        </div>

        <div className={styles.btn__align}>
          <button
            className={styles.form__input_btn}
            disabled={Object.values(errors).length !== 0}
            onClick={(e: any) => openCheckModal(e, inputUser)}
          >
            Continue to payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormCheckout;
