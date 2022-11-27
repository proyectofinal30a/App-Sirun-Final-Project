import React, { useEffect, useState } from "react";
import styles from "../../../styles/FormCheckout.module.css";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Modal from "react-modal";
import {
  sendOrderDetail,
  resetCart,
} from "../../../redux/slice/cart-redux/cart-redux";
import validate from "../../../controllers/validateFormCheckout";
import {
  IUserBuyer,
  Ireducers,
  Iaddresses,
  IDataAddress,
} from "../../../../lib/types";
import vericationSubminObj from "../../../controllers/verificationFormCart";
import { useSession } from "next-auth/react";

interface state {
  buttonInput: boolean;
  setButtonInput: Function;
  setAddress: Function;
  inputAddres: IDataAddress;
  setInputAddres: any;
  setErrors: Function;
  errors: IDataAddress;
  mySelect: any;
  personInfo: IDataAddress;
}

export default function MyFormAdd({
  buttonInput,
  personInfo,
  inputAddres,
  mySelect,
  setErrors,
  setInputAddres,
  errors,
  setButtonInput,
  setAddress,
}: state) {
  type buttonEvenOnclik = React.MouseEvent<HTMLButtonElement, MouseEvent>;
  type EventInputChange = React.ChangeEvent<HTMLInputElement>;

  const handleInputChange = (event: EventInputChange) => {
    const { name, value } = event.target;
    setInputAddres({ ...inputAddres, [name]: value });
    setErrors(validate({ ...inputAddres, [name]: value }));
  };

  const mycondicion = buttonInput ? "Don't add new address" : "Add new address";

  return (
    <div>
      <input
        type="button"
        value={mycondicion}
        className={styles.checkout_form__btn}
        onClick={() => {
          setButtonInput(!buttonInput);
          setInputAddres(personInfo);
          setAddress(1000);
          mySelect.current = {
            name_address: "",
            phone: {
              number: "",
              area_code: "",
            },
            street_name: "",
            street_number: "",
            zip_code: "",
          };
        }}
      />
      {buttonInput && (
        <div className={styles.fieldset__container}>
          <div className={styles.container__row_column}>
            <label className={styles.form__label} htmlFor="areaCode">
              Address name
            </label>
            <input
              className={styles.form__input}
              type="text"
              name="name_address"
              value={inputAddres.name_address}
              onChange={handleInputChange}
              placeholder="Address name"
              autoComplete="on"
              required
            />
            {errors.name_address && (
              <p className={styles.error}>{errors.name_address}</p>
            )}
          </div>

          <div className={styles.input__unifier}>
            <div className={styles.container__row_column_three_inputs}>
              <label
                className={styles.form__label_three_inputs}
                htmlFor="areaCode"
              >
                Area code
              </label>
              <input
                className={styles.form__input_1}
                type="text"
                name="area_code"
                value={inputAddres.area_code}
                onChange={handleInputChange}
                placeholder="Area code"
                autoComplete="on"
                required
              />
              {errors.area_code && (
                <p className={styles.error}>{errors.area_code}</p>
              )}
            </div>

            <div className={styles.container__row_column_three_inputs}>
              <label className={styles.form__label_three_inputs} htmlFor="phone">
                Phone number
              </label>
              <input
                className={styles.form__input_2}
                type="text"
                name="number"
                value={inputAddres.number}
                onChange={handleInputChange}
                placeholder="Phone number"
                autoComplete="on"
                required
              />
              {errors.number && <p className={styles.error}>{errors.number}</p>}
            </div>

            <div className={styles.container__row_column_three_inputs}>
              <label
                className={styles.form__label_three_inputs}
                htmlFor="zipCode"
              >
                Zip code
              </label>
              <input
                className={styles.form__input_3}
                type="text"
                name="zip_code"
                value={inputAddres.zip_code}
                onChange={handleInputChange}
                placeholder="Zip code"
                autoComplete="on"
                required
              />
              {errors.zip_code && (
                <p className={styles.error}>{errors.zip_code}</p>
              )}
            </div>
          </div>

          <div className={styles.input__unifier}>
            <div className={styles.container__row_column_two_inputs}>
              <label
                className={styles.form__label_two_inputs}
                htmlFor="streetName"
              >
                Street name
              </label>
              <input
                className={styles.form__input_first_input}
                type="text"
                name="street_name"
                value={inputAddres.street_name}
                onChange={handleInputChange}
                placeholder="Street name"
                autoComplete="on"
                required
              />
              {errors.street_name && (
                <p className={styles.error}>{errors.street_name}</p>
              )}
            </div>

            <div className={styles.container__row_column_two_inputs}>
              <label
                className={styles.form__label_two_inputs}
                htmlFor="streetNumber"
              >
                Street number
              </label>
              <input
                className={styles.form__input_second_input}
                type="text"
                name="street_number"
                value={inputAddres.street_number}
                onChange={handleInputChange}
                placeholder="Street number"
                autoComplete="on"
                required
              />
              {errors.street_number && (
                <p className={styles.error}>{errors.street_number}</p>
              )}
            </div>


          </div>

        </div>
      )}
    </div>
  );
}
