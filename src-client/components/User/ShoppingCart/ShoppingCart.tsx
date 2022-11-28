import styles from "../../../styles/ShoppingCart.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { BsFillTrashFill } from "react-icons/bs";
import { Ireducers } from "../../../../lib/types";
import { addOne, removeOne, trashItem } from "../../../redux/slice/cart-redux/cart-redux";
import { useSession } from "next-auth/react";
import { log } from "console";

const ShoppingCart = () => {
  const router = useRouter();
  const dispatch: Function = useDispatch();
  const { status } = useSession()
  const cart = useSelector((state: Ireducers) => state.reducerCart.products);
  const allProducts = useSelector((state: Ireducers) => state.reducerProducts.products);

  const totalQuantity = cart[0] ? cart?.map((elem) => elem.quantity).reduce((elem, acc: number) => elem + acc) : 0;

  let total = 0;
  cart.map((elem) => {
    return (total += elem.subTotal);
  });


  
  const handleAvailable = (e : any) => {
    const productsInCart = cart.map((elem) => elem.id)
    console.log(productsInCart)
    const productsInStock = allProducts.filter((elem) => productsInCart.includes(elem.id) && elem.available === true)
    console.log(productsInStock)
    const productsNotAvailable = allProducts.filter((elem) => productsInCart.includes(elem.id) && elem.available === false)
    console.log(productsNotAvailable);

    if(productsInStock.length === productsInCart.length) {
      router.push("/checkout")    
    } else {
      alert("Some products are already sold out and there is no stock available")
      productsNotAvailable.map((elem) => dispatch(trashItem(elem.id)))
    }
}


  return (
    <div className={styles.cart__container}>
      {cart[0] ? 
        <form className={styles.modal__container}>
          <h2>Shopping Cart</h2>

          {cart?.map((elem, index: number) => {

            return (
              <div key={index} className={styles.modal__product_container}>
                <p className={styles.modal__product_name}>
                  {elem.title.toLowerCase()}
                </p>

                <div className={styles.modal_info_container}>
                  <div className={styles.modal__product_img_container}>
                    <Image
                      key={index}
                      src={elem.picture_url}
                      width={400}
                      alt={elem.picture_url}
                      height={400}
                      priority
                      className={styles.modal__product_img}
                    />
                  </div>

                  <div className={styles.modal__product_mobile_separator}>
                    <div className={styles.modal__product_info}>
                      <p className={styles.modal__product_data}>
                        Quantity: {elem.quantity}
                      </p>
                      <p className={styles.modal__product_data}>
                        Price: {elem.quantity}
                      </p>
                      <p className={styles.modal__product_data}>
                        Subtotal: {elem.subTotal}
                      </p>
                    </div>

                    <div className={styles.modal__product_btns_container}>
                      <input
                        className={styles.modal__product_btn}
                        onClick={() => dispatch(addOne(elem.id))}
                        value='+'
                        type='button'
                      />
                      <input
                        className={styles.modal__product_btn}
                        onClick={() => dispatch(removeOne(elem.id))}
                        value='-'
                        type='button'
                      />
                      <button
                        className={[
                          styles.modal__product_btn,
                          styles.modal__product_btn_trash,
                        ].join(" ")}
                        onClick={(e) => {
                          e.preventDefault()
                          dispatch(trashItem(elem.id))
                        }}
                      >
                        <BsFillTrashFill />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <p className={styles.modal__quantity_total}>Items in shopping cart ({totalQuantity})</p>

          <div className={styles.modal__total_container}>
            <p className={styles.modal__total}>TOTAL </p>
            <p className={styles.modal__total}>${total}</p>
          </div>


          {status === "unauthenticated" ?
            <div className={styles.modal__purchase_btn_container}>
              <input
                value="Sign in to checkout"
                type="button"
                onClick={() => signIn("auth0", { redirect: true, callbackUrl: "/checkout" })}
                className={styles.modal__start_purchase_btn}
              />
            </div>
            : 
            // <Link href="/checkout" >
            //   </Link> 
            <div className={styles.modal__purchase_btn_container}>

              <button className={styles.modal__start_purchase_btn} onClick={(e)=>handleAvailable(e)} >Checkout</button> 
            </div>
          }
        </form>
        :
        <div className={styles.empty_cart__container}>
          <p className={styles.empty_cart__message}>Your shopping cart is empty.</p>
          <button
            onClick={() => router.push("/products")}
            className={styles.empty_cart__btn}
          >
            View products
          </button>
        </div>
      }
    </div>
  );
};

export default ShoppingCart;
