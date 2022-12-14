import styles from "../../../styles/ShoppingCart.module.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { BsFillTrashFill } from "react-icons/bs";
import { Ireducers } from "../../../../lib/types";
import { addOne, removeOne, trashItem } from "../../../redux/slice/cart-redux/cart-redux";
import { useSession } from "next-auth/react";
import { getAllProducts } from "../../../redux/slice/products-client/Products-all-redux";

const ShoppingCart = () => {
  
  const router = useRouter();
  const dispatch: Function = useDispatch();
  const { status } = useSession();
  const cart = useSelector((state: Ireducers) => state.reducerCart.products);
  const allProducts = useSelector((state: Ireducers) => state.reducerAdmin.products);
  
  
  useEffect(()=>{
    if(!allProducts.length)dispatch(getAllProducts())
    },[dispatch])
  
  const productsInCartID = cart.map((elem) => elem.id)
  const allProductsID =allProducts.filter((elem)=> elem.available === true)
  const allProductsaux =allProductsID.map((elem)=>elem.id)                             
  const allProductsaux2 = allProductsaux.filter((elem)=> allProductsaux.includes(elem))    
  const productsInCart = cart.filter((elem)=> allProductsaux2.filter((e) => elem.id === e ))
  const totalQuantity = productsInCart[0] ? productsInCart?.map((elem) => elem.quantity).reduce((elem, acc: number) => elem + acc) : 0;
  
  let total = 0;
  productsInCart.map((elem) => {
    return (total += elem.subTotal);
  });
  

  return (
    <div className={styles.cart__container}>
      {cart.length > 0 ? <form className={styles.modal__container}>
          <h2>Shopping Cart</h2>

          {productsInCart ? productsInCart?.map((elem, index: number) => {

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
                        Price: ${elem.unit_price}
                      </p>
                      <p className={styles.modal__product_data}>
                        Subtotal: ${elem.subTotal}
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
          }) 
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
             <Link href="/checkout" className={styles.modal__purchase_btn_container} >
              <button className={styles.modal__start_purchase_btn}>Checkout</button> 
               </Link> 
         
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
