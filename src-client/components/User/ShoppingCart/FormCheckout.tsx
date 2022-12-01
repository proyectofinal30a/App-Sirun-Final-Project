import React, { useEffect, useState } from "react";
import styles from "../../../styles/FormCheckout.module.css";
import { useSelector, useDispatch } from "react-redux";
import CardUserAddress from "../cardCart/cardUserAddress";
import { resetCart } from "../../../redux/slice/cart-redux/cart-redux";
import { IDataAddress, Ireducers, Iaddresses } from "../../../../lib/types";
import { useSession } from "next-auth/react";
import ModalConfirm from "../modal/ confirmData";
import CardCart from "../cardCart/cardCart";
import MyFormAdd from "../formAddress/formAddress";
import { useRef } from "react";
import ButtonConfirmInf from "../bottonSubmitForm/confirmInf";
import { useRouter } from 'next/router'
const FormCheckout = (): JSX.Element => {
  const dispatch: Function = useDispatch();
  const [address, setAddress] = useState(1000);
  const router = useRouter()
  const [modalIsOpen, setIsOpen] = useState(false);
  const [buttonInput, setButtonInput] = useState(false);
  const { confirmed, payLink, products } = useSelector((state: Ireducers) => state.reducerCart);
  const myFormAddress = useSelector((state: Ireducers) => state.reducerUser.user.addresses);

  const { data } = useSession();

  useEffect(() => {
    if (payLink) dispatch(resetCart())
    return () => dispatch(resetCart());
  }, []);

  if (!products[0]) router.push('/')

  const personInfo: IDataAddress = {
    name_address: "",
    street_name: "",
    street_number: "",
    zip_code: "",
    number: "",
    area_code: "",
  };


  interface current {
    current: Iaddresses;
  }

  const mySelect: current = useRef({
    name_address: "",
    phone: {
      number: "",
      area_code: "",
    },
    street_name: "",
    street_number: "",
    zip_code: "",
  });

  const [inputAddres, setInputAddres] = useState(personInfo);
  const [errors, setErrors] = useState(personInfo);
  const [startNumber, setStartNumber] = useState(1000);
  const [dateState, setDateState] = useState<string>('')
  if (!data?.user.email || !products) return <div className={styles.loading}>Loading...</div>

  const isOpenModal = () => setIsOpen((current: Boolean) => !current)
  const total = products[0] && products.map((elem) => elem.subTotal).reduce((elem, acc: number) => elem + acc)
  const totalQuantity = products[0] && products.map((elem) => elem.quantity).reduce((elem, acc: number) => elem + acc)


  const myDataUser = {
    name: data.user.name,
    email: data.user.email,
  };

  const forButtonMercadoPago = { confirmed, payLink };



  // DELIVERY DATE CALCULATIONS
  const daysTillDeliveryDate =
    totalQuantity <= 4 ? 4
      : totalQuantity > 4 && totalQuantity <= 8 ? 6
        : totalQuantity > 8 && totalQuantity <= 12 ? 10
          : 14;
  const date1 = new Date()
  date1.setDate(date1.getDate() + daysTillDeliveryDate)
  const minDate = date1.toISOString().split('T')[0];
  const date2 = new Date()
  date2.setDate(date2.getDate() + 21)
  const maxDate = date2.toISOString().split('T')[0]
  const handleBlockedDates = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateState(e.target.value)
  }


  return (
    <div className={styles.checkout__container}>

      <div className={styles.address_form_container}>
        <h1 className={styles.column__title}>
          Checkout
        </h1>

        <div className={styles.card_user_address_container}>
          <div className={styles.input_calendar__container}>
            <label className={styles.input_calendar__label}>Choose the delivery date</label>
            <span className={styles.input_calendar__span}>
              Delivery time can vary between 1 to 2 days according to distance.
            </span>

            <input
              type="date"
              className={styles.input_calendar}
              min={minDate}
              onChange={handleBlockedDates}
              max={maxDate}
            />
          </div>

          <span className={styles.span}>Select or create a new address</span>
          <CardUserAddress
            data={data}
            mySelect={mySelect}
            address={address}
            setAddress={setAddress}
            styles={styles}
            addresses={myFormAddress}
            setButtonInput={setButtonInput}
            buttonInput={buttonInput}
            personInfo={personInfo}
            setInputAddres={setInputAddres}
            startNumber={startNumber}
            setStartNumber={setStartNumber}
          />
        </div>

        <MyFormAdd
          buttonInput={buttonInput}
          setAddress={setAddress}
          setButtonInput={setButtonInput}
          inputAddres={inputAddres}
          setInputAddres={setInputAddres}
          setErrors={setErrors}
          errors={errors}
          mySelect={mySelect}
          personInfo={personInfo}
          startNumber={startNumber}
        />

        <ButtonConfirmInf
          dateState={dateState}
          errors={errors}
          mySelect={mySelect}
          styles={styles}
          isOpenModal={isOpenModal}
          inputAddres={inputAddres}
        />

      </div>

      <ModalConfirm
        user={myDataUser}
        dateState={dateState}
        address={inputAddres}
        styles={styles}
        addressRef={mySelect}
        isOpenModal={isOpenModal}
        modalIsOpen={modalIsOpen}
        forButtonMercadoPago={forButtonMercadoPago}
        product={products}
      />

      <CardCart
        arrayCard={products}
        total={total}
        styles={styles}
        totalQuantity={totalQuantity}
      />
    </div>
  );
};

export default FormCheckout;
