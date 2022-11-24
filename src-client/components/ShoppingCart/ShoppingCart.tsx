import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { addOne, removeOne, trashItem } from "../../redux/slice/cart-redux/cart-redux";
import { Ireducers } from "../../../lib/types";
import { BsFillTrashFill } from "react-icons/bs";
import styles from "../../styles/ShoppingCart.module.css";
const ShoppingCart = () => {
  const router = useRouter();
  const dispatch: Function = useDispatch();

  const cart = useSelector((state: Ireducers) => state.reducerCart.products);

  let total = 0;
  cart.map((elem) => {
    return (total += elem.subTotal);
  });


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

          <div className={styles.modal__total_container}>
            <p className={styles.modal__total}>TOTAL </p>
            <p className={styles.modal__total}>${total}</p>
          </div>

          <Link href="/checkout" className={styles.modal__purchase_btn_container}>
            <button className={styles.modal__start_purchase_btn}>Checkout</button>
          </Link>
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
