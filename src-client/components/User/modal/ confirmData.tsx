import Modal from "react-modal";
import React from "react";
import {
  IDataAddress,
  Iaddresses,
  IproductModelCart,
} from "../../../../lib/types";
import ButtonSumbitMercadoPago from "../bottonSubmitForm/submitMercadopago";
interface myInfoUser {
  user: {
    name: string;
    email: string;
  };
  address: IDataAddress;
  styles: any;
  addressRef: {
    current: Iaddresses;
  };
  dateState: string
  isOpenModal: Function;
  modalIsOpen: boolean;

  forButtonMercadoPago: {
    confirmed: Boolean;
    payLink: string;
  };
  product: IproductModelCart[];
}

export default function ModalConfirm({
  user,
  product,
  forButtonMercadoPago,
  addressRef,
  isOpenModal,
  modalIsOpen,
  address,
  styles,
  dateState
}: myInfoUser): JSX.Element {
  const { name, email } = user;

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => isOpenModal()}
        className={styles.modal}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className={styles.modal__container}>
          <div className={styles.modal__btn_right_container}>
            <button
              className={styles.modal__close_modal_btn}
              onClick={() => isOpenModal()}
            >
              x
            </button>
          </div>

          <h2>Confirm your information</h2>

          <div className={styles.modal__client_container}>
            <p className={styles.modal__client_name}>
              <span className={styles.client_info_span}>Name: </span>
              {name.toLowerCase()}
            </p>

            <p className={styles.modal__client_email}>
              <span className={styles.client_info_span}>E-mail: </span>
              {email}
            </p>
            <p className={styles.modal__client_email}>
              <span className={styles.client_info_span}>Delivery Time : </span>
              {dateState}
            </p>
            <p className={styles.modal__client_phone}>
              <span className={styles.client_info_span}>Phone number: </span>
              +{address.area_code
                ? address.area_code
                : addressRef.current.phone.area_code}
              {" "}
              {address.number
                ? address.number
                : addressRef.current.phone.number}
            </p>

            <p className={styles.modal__client_address_name}>
              <span className={styles.client_info_span}>Address name: </span>
              {address.name_address
                ? address.name_address
                : addressRef.current.name_address}
            </p>

            <p className={styles.modal__client_address}>
              <span className={styles.client_info_span}>Street name: </span>
              {address.street_name
                ? address.street_name.toLowerCase()
                : addressRef.current.street_name.toLowerCase()}
              {", "}
              {address.street_number
                ? address.street_number
                : addressRef.current.street_number}
            </p>

            <p className={styles.modal__client_zipcode}>
              <span className={styles.client_info_span}>Zip code: </span>
              {address.zip_code
                ? address.zip_code
                : addressRef.current.zip_code}
            </p>
          </div>

          <ButtonSumbitMercadoPago
            dateState={dateState}
            mySelect={addressRef}
            inputAddres={address}
            data={user}
            forButtonMercadoPago={forButtonMercadoPago}
            product={product}
            styles={styles}
          />
        </div>
      </Modal>
    </>
  );
}
