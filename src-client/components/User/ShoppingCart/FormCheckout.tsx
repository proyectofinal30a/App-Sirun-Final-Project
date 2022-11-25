import React, { useEffect, useState } from "react";
import styles from "../../../styles/FormCheckout.module.css";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Modal from "react-modal";
import { sendOrderDetail, resetCart } from "../../../redux/slice/cart-redux/cart-redux";
import validate from "../../../controllers/validateFormCheckout";
import { IUserBuyer, Ireducers } from '../../../../lib/types'
import vericationSubminObj from "../../../controllers/verificationFormCart";
import { useSession } from "next-auth/react";


// PARA DATOS DE ENTREGA

const FormCheckout = (): JSX.Element => {
  const dispatch: Function = useDispatch();
  const { confirmed, payLink, products } = useSelector((state: Ireducers) => state.reducerCart);

  const { data } = useSession()
  useEffect(() => {
    return () => dispatch(resetCart())
  }, [])
  type buttonEvenOnclik = React.MouseEvent<HTMLButtonElement, MouseEvent>
  type EventInputChange = React.ChangeEvent<HTMLInputElement>

  const personInfo: IUserBuyer = {
    email: data?.user.email || "",
    name: data?.user.image || "",
    address: {
      street_name: '',
      street_number: '',
      zip_code: ''
    },
    phone: {
      number: '',
      area_code: ''
    }
  };

  const [inputUser, setInputUser] = useState(personInfo);
  const [errors, setErrors] = useState(personInfo);

  const handleInputChange = (event: EventInputChange) => {
    const { name, value } = event.target;
    if (name === 'number' || name === 'area_code') {
      setInputUser({
        ...inputUser,
        ["phone"]: {
          ...inputUser.phone,
          [name]: value
        }
      });

      setErrors(validate({
        ...inputUser, ["phone"]: {
          ...inputUser.phone,
          [name]: value
        }
      }));
      return
    }

    setInputUser({
      ...inputUser, ["address"]: {
        ...inputUser.address,
        [name]: value
      }
    });
    setErrors(validate({
      ...inputUser, ["address"]: {
        ...inputUser.address,
        [name]: value
      }
    }))

  };


  // MODAL
  const [modalIsOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  const openCheckModal = (e: buttonEvenOnclik, person: IUserBuyer) => {
    e.preventDefault();
    setIsOpen(true);
    setInputUser({ ...inputUser, email: data?.user.email || '', name: data?.user.name || "" })
    console.log(vericationSubminObj(person)[0], 'dasdsad');

    if (vericationSubminObj(person)[0]) {
      return alert("Please complete the form correctly");
    }
  };



  // Submitea cuando se cliquea el botón del modal (el form esta dentro del modal)
  async function handleSubmit(e: buttonEvenOnclik) {
    e.preventDefault();
    dispatch(sendOrderDetail(inputUser, products));
  }

  const total = products.map((elem) => elem.subTotal).reduce((elem, acc: number) => elem + acc)
  const totalQuantity = products.map((elem) => elem.quantity).reduce((elem, acc: number) => elem + acc)



  return (

    <div className={styles.checkout__container}>
      <div className={styles.first__column}>
        <h2 className={styles.column__title}>Checkout</h2>
        <fieldset className={styles.fieldset__conteiner}>
          <p>Name: {data?.user.name}</p>
          <p>Email: {data?.user.email}</p>
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
                name="area_code"
                value={inputUser.phone.area_code}
                onChange={handleInputChange}
                placeholder="Area Code"
                autoComplete="on"
                required
              />
              {errors.phone.area_code && (
                <p className={styles.error}>{errors.phone.area_code}</p>
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
                value={inputUser.phone.number}
                onChange={handleInputChange}
                placeholder="Phone"
                autoComplete="on"
                required
              />
              {errors.phone.number && <p className={styles.error}>{errors.phone.number}</p>}
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
                value={inputUser.address.street_name}
                onChange={handleInputChange}
                placeholder="Street Name"
                autoComplete="on"
                required
              />
              {errors.address.street_name && (
                <p className={styles.error}>{errors.address.street_name}</p>
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
                value={inputUser.address.street_number}
                onChange={handleInputChange}
                placeholder="Street Number"
                autoComplete="on"
                required
              />
              {errors.address.street_number && (
                <p className={styles.error}>{errors.address.street_number}</p>
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
                value={inputUser.address.zip_code}
                onChange={handleInputChange}
                placeholder="Zip Code"
                autoComplete="on"
                required
              />
              {errors.address.zip_code && (
                <p className={styles.error}>{errors.address.zip_code}</p>
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
                  {inputUser.phone.area_code}
                </p>
                <p>{inputUser.phone.number}</p>
              </div>

              <p>
                <span className={styles.client_info_span}>Zip code: </span>{inputUser.address.zip_code}
              </p>
              <div className={styles.modal__client_address_container}>
                <p className={styles.modal__client_street}>
                  <span className={styles.client_info_span}>Address: </span>{inputUser.address.street_name.toLowerCase()}
                </p>
                <p>, {inputUser.address.street_number}</p>
              </div>
            </div>

            {!confirmed && !payLink &&
              <div className={styles.modal__confirm_btn_container}>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={styles.modal__confirm_btn}
                >
                  Confirm information
                </button>
              </div>
            }
            <input type="button" value="dda" name="delete" onClick={() => dispatch(resetCart())} />
            {confirmed && payLink && (
              <div className={styles.modal__pay_btn_container}>
                <button
                  className={styles.modal__pay_btn}
                  onClick={() => dispatch(resetCart())}
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
          {products.map((elem) => {
            return (
              <div className={styles.item} key={elem.id}>
                <div className={styles.product__img_container}>
                  <Image
                    key={elem.picture_url}
                    src={elem.picture_url}
                    width={100}
                    alt={elem.picture_url}
                    height={100}
                    priority
                    className={styles.product_card__img}
                  />
                </div>

                <div className={styles.item__info}>
                  <h3>{elem.title.toLowerCase()}</h3>
                  <p>Quantity: {elem.quantity}</p>
                  <p>Price x 1: ${elem.unit_price}</p>
                </div>

                <h2 className={styles.item__subtotal}>
                  Subtotal: <br /> ${elem.subTotal}
                </h2>
              </div>
            );
          })}
        </div>

        <div className={styles.total__container}>
          <p className={styles.__shipping}>Items in shopping cart ({totalQuantity})</p>
          <div className={styles.__shipping_line}>
            <p className={styles.__shipping}>Shipping cost</p>
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
            //disabled={vericationSubminObj(errors)[0]}
            onClick={(e) => openCheckModal(e, errors)}
          >
            Continue to payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormCheckout;
