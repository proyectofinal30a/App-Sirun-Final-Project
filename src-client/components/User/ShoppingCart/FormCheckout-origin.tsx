// import React, { useEffect } from "react";
// import styles from "../../../styles/FormCheckout.module.css";
// import { useSelector, useDispatch } from "react-redux";
// import Image from "next/image";

// import { sendOrderDetail, resetCart } from "../../../redux/slice/cart-redux/cart-redux";
// import validate from "../../../controllers/validateFormCheckout";
// import { IUserBuyer, Ireducers } from '../../../../lib/types'
// import vericationSubminObj from "../../../controllers/verificationFormCart";
// import { useSession } from "next-auth/react";
// import ModalConfirm from "../modal/ confirmData";

// // PARA DATOS DE ENTREGA

// const FormCheckout = (): JSX.Element => {
//   const dispatch: Function = useDispatch();
//   const { confirmed, payLink, products } = useSelector((state: Ireducers) => state.reducerCart);
//   const  myAddresses = useSelector((state: Ireducers) => state.reducerUser.user.addresses);

//   const { data } = useSession()
//   useEffect(() => {
//     return () => dispatch(resetCart())
//   }, [])
//   type buttonEvenOnclik = React.MouseEvent<HTMLButtonElement, MouseEvent>
//   type EventInputChange = React.ChangeEvent<HTMLInputElement>

 
//   // MODAL
//   const openCheckModal = (e: buttonEvenOnclik, person: IUserBuyer) => {
//     e.preventDefault();
//     setIsOpen(true);
//     setInputUser({ ...inputUser, email: data?.user.email || '', name: data?.user.name || "", address: { ...inputUser.address, name_address: 'casa', id: "13aa5057-089f-4cda-a0d8-f53acd5e8311" } })


//     if (vericationSubminObj(person)[0]) {
//       return alert("Please complete the form correctly");
//     }
//   };



//   // Submitea cuando se cliquea el botón del modal (el form esta dentro del modal)
//   async function handleSubmit(e: buttonEvenOnclik) {
//     e.preventDefault();

//     const prueba = { ...inputUser, email: data?.user.email || '', name: data?.user.name || "", address: { ...inputUser.address, name_address: 'CASA DE MI MADRE', id: 'zsiqI7QH-DUyDsIXXKhJq' } }

//     dispatch(sendOrderDetail(prueba, products));
//   }

//   const total = products.map((elem) => elem.subTotal).reduce((elem, acc: number) => elem + acc)
//   const totalQuantity = products.map((elem) => elem.quantity).reduce((elem, acc: number) => elem + acc)



//   return (

//     <div className={styles.checkout__container}>
//       <div className={styles.first__column}>
//         <h2 className={styles.column__title}>Checkout</h2>
//         <fieldset className={styles.fieldset__conteiner}>
//           <p>Name: {data?.user.name}</p>
//           <p>Email: {data?.user.email}</p>
//         </fieldset>
//       </div>

//       <div className={styles.second__column}>
//         <h2 className={styles.column__title}>Order Summary</h2>
//         <div className={styles.item__container}>
//           {products.map((elem) => {
//             return (
//               <div className={styles.item} key={elem.id}>
//                 <div className={styles.product__img_container}>
//                   <Image
//                     key={elem.picture_url}
//                     src={elem.picture_url}
//                     width={100}
//                     alt={elem.picture_url}
//                     height={100}
//                     priority
//                     className={styles.product_card__img}
//                   />
//                 </div>

//                 <div className={styles.item__info}>
//                   <h3>{elem.title.toLowerCase()}</h3>
//                   <p>Quantity: {elem.quantity}</p>
//                   <p>Price x 1: ${elem.unit_price}</p>
//                 </div>

//                 <h2 className={styles.item__subtotal}>
//                   Subtotal: <br /> ${elem.subTotal}
//                 </h2>
//               </div>
//             );
//           })}
//         </div>

//         <div className={styles.total__container}>
//           <p className={styles.__shipping}>Items in shopping cart ({totalQuantity})</p>
//           <div className={styles.__shipping_line}>
//             <p className={styles.__shipping}>Shipping cost</p>
//             <p className={styles.__shipping}>$...</p>
//           </div>
//           <div className={styles.__total_line}>
//             <h2 className={styles.__total}>TOTAL </h2>
//             <h2 className={styles.__total}>${total}</h2>
//           </div>
//         </div>

//         <div className={styles.btn__align}>
//           <button
//             className={styles.form__input_btn}
//             //disabled={vericationSubminObj(errors)[0]}
//             onClick={(e) => openCheckModal()}
//           >
//             Continue to payment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormCheckout;
