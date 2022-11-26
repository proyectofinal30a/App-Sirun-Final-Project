import React, { useEffect, useState } from "react";
import styles from "../../../styles/FormCheckout.module.css";
import { useSelector, useDispatch } from "react-redux";
import CardUserAddress from "../cardCart/cardUserAddress";
import { resetCart } from "../../../redux/slice/cart-redux/cart-redux";
import { IDataAddress, Ireducers, Iaddresses } from '../../../../lib/types'
import { useSession } from "next-auth/react";
import ModalConfirm from "../modal/ confirmData";
import CardCart from "../cardCart/cardCart";
import MyFormAdd from "../formAddress/formAdres";
import { useRef } from "react";
import ButtonConfirmInf from '../bottonSubmitForm/confirmInf'
const FormCheckout = (): JSX.Element => {
  const dispatch: Function = useDispatch();
  const [address, setAddress] = useState(1000)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [buttonInput, setButtonInput] = useState(false)
  const { confirmed, payLink, products } = useSelector((state: Ireducers) => state.reducerCart);
  const myFormAddress = useSelector((state: Ireducers) => state.reducerUser.user.addresses);
  const { data } = useSession()
  useEffect(() => {
    return () => dispatch(resetCart())
  }, [])

  const personInfo: IDataAddress = {
    name_address: '',
    street_name: '',
    street_number: '',
    zip_code: '',
    number: '',
    area_code: ''
  };




  interface current {
    current: Iaddresses
  }

  const mySelect: current = useRef({
    name_address: '',
    phone: {
      number: "",
      area_code: ""
    },
    street_name: '',
    street_number: '',
    zip_code: '',
  })
  const [inputAddres, setInputAddres] = useState(personInfo);
  const [errors, setErrors] = useState(personInfo);



  console.log(mySelect);


  const isOpenModal = () => setIsOpen((current: Boolean) => !current)

  const total = products.map((elem) => elem.subTotal).reduce((elem, acc: number) => elem + acc)
  const totalQuantity = products.map((elem) => elem.quantity).reduce((elem, acc: number) => elem + acc)

  if (!data?.user.email || !products || !products[0]) return <div>Loading</div>
  const myDataUser = {
    name: data.user.name,
    email: data.user.email
  }

  return (
    <div className={styles.checkout__container}>

      <CardUserAddress data={data}
        mySelect={mySelect}
        address={address}
        setAddress={setAddress}
        styles={styles}
        addresses={myFormAddress}
        setButtonInput={setButtonInput}
        buttonInput={buttonInput}
        personInfo={personInfo}
        setInputAddres={setInputAddres}
      />
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
      />
      <ModalConfirm
        user={myDataUser}
        address={inputAddres}
        styles={styles}
        addressRef={mySelect}
        isOpenModal={isOpenModal}
        modalIsOpen={modalIsOpen}
      />
      <ButtonConfirmInf
        errors={errors}
        mySelect={mySelect}
        styles={styles}
        isOpenModal={isOpenModal}
        inputAddres={inputAddres}
      />
      <CardCart arrayCard={products} total={total} styles={styles} totalQuantity={totalQuantity} />

    </div>
  );
};

export default FormCheckout;
