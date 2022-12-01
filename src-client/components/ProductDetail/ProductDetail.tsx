import styles from "../../styles/ProductDetail.module.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-modal";
import { IconContext } from "react-icons";
import { BsFillTrashFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { Iproduct, Ireducers, IproductModelCart } from "../../../lib/types";
import { getProductDetail, cleanProductDetail } from "../../redux/slice/products-client/Product-detail-redux";
import { addToCart, addOne, removeOne, trashItem } from "../../redux/slice/cart-redux/cart-redux";
import { getUserDetail } from "../../redux/slice/user-detail-redux/user-redux";
import * as action from '../../redux/slice/favorite-user-redux/favorite-redux'
import { getAllProducts } from "../../redux/slice/products-client/Products-all-redux"
import { UserReview } from "./UserReview";
import Average from "./StarsAverage";


const ProductDetail = () => {
  const dispatch: Function = useDispatch();

  const { query } = useRouter();
  const id = query.id;

  const { data, status } = useSession();
  const myNuEmail = data?.user?.email;
  const myInfUser = useSelector((state: Ireducers) => state.reducerUser);
  const [activeImage, setActiveImage] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const favoriteId = useSelector((state: Ireducers) => state.reducerFavoriteUser.favoriteId)
  const product = useSelector((state: Ireducers) => state.reducerProductDetail.detail);
  const cart = useSelector((state: Ireducers) => state.reducerCart.products);
  const allProducts = useSelector((state: Ireducers) => state.reducerProducts.products);


console.log(product);


  useEffect(() => {
    typeof id === 'string' && dispatch(getProductDetail(id));
    //return dispatch(cleanProductDetail());
  }, [dispatch, id]);


  useEffect(() => {
    if (!myInfUser?.user?.id) {
      dispatch(getUserDetail(myNuEmail));
    }
  }, [dispatch, data, myInfUser?.user?.id, myNuEmail]);



  const biblioteca = {}

  if (favoriteId?.[0]) {
    favoriteId.forEach(fav => {
      biblioteca[fav] = true;
    })
  }


  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  // if(!cart?.[0] || !allProducts?.[0]){
  //   return <div className={styles.loading}>The cart is empthy...</div>
  // }


  const productsInCartID = cart.map((elem) => elem.id)
  const allProductsID = allProducts.filter((elem) => elem.available !== false)
    .map((elem) => elem.id)
    .filter((elem) => productsInCartID.includes(elem))
  const productsInCart = cart.filter((elem) => allProductsID.includes(elem.id))





  if (id !== product.id || !product?.evaluation) return <div className={styles.loading}>Loading...</div>
  const { evaluation } = product;


  // SHOPPING CART
  const totalQuantity = productsInCart[0] ? productsInCart?.map((elem) => elem.quantity).reduce((elem, acc: number) => elem + acc) : 0;

  function closeModal() {
    setIsOpen(false);
  }

  const addProductOpenModal = (product: Iproduct) => {
    setIsOpen(true);
    
    const { id, name, price, image } = product;
    const productToAdd: IproductModelCart = {
      id: id,
      title: name,
      unit_price: price,
      picture_url: image[0].image,
      quantity: 1,
      subTotal: 0,
      currency_id: 'ARS'
    };
    dispatch(addToCart(productToAdd));
  };

  const handlerTrash = (id: string) => {
    dispatch(trashItem(id));
    if (productsInCart.length === 1 || productsInCart.length === 0) { return setIsOpen(false); }
  };

  let total = 0;
  productsInCart.map((elem: any) => {
    return (total += elem.subTotal);
  });


  // IMAGES SWITCHER

  if (!product?.image?.[0]?.image) return <div className={styles.loading}>Loading..</div>

  const detail = product.image[0].image

  const handleMouseOver = (url: string, index: number) => {
    setActiveImage(url);
  };

  const url2 = activeImage ? activeImage : detail;


  // FAVORITE 



  const handleFavorite = (id: string) => {
    if(myNuEmail !== undefined){
      status === "unauthenticated" && signIn("auth0");
    favoriteId.includes(id) ?
      dispatch(action.deleteOneFavorite(myNuEmail, id)) :
      dispatch(action.addOneFavorite(myNuEmail, id))
    }
  }



  return (
    <div className={styles.detail}>
      {product ?
        <div className={styles.detail__container}>

          <div className={styles.detail__container__images}>
            <div className={styles.image__secondary__container}>
              {product.image?.map((url: any, index: number) => {
                const myUrl = url?.image
                return (
                  <div key={index} className={styles.image_individual__container}>
                    <Image
                      src={myUrl}
                      width={250}
                      alt={product.name}
                      height={130}
                      onMouseOver={() => handleMouseOver(myUrl, index)}
                      className={styles.image_individual__img}
                    />
                  </div>
                );
              })}
            </div>

            <div className={styles.image_main__container}>
              <Image
                src={url2}
                width={500}
                alt="Product main image"
                height={500}
                className={styles.image_main__img}
              />
            </div>
          </div>


          <div className={styles.detail__info}>
            <h1 className={styles.detail__info_title}>{product.name && product.name.toLowerCase()}</h1>
            <Average evaluation={evaluation} />
            <p className={styles.detail__info_price}>$ {product.price}</p>

            <div className={styles.detail__info_extra}>
              <p className={styles.detail__info_extras}>{product.category}</p>
              <p className={styles.detail__info_extras}>{product.type}</p>
            </div>

            <div className={styles.detail_info_description}>
              <p className={styles.detail_info_description_title}>Product description</p>
              <p>{product.description}</p>
              <p>Dimention: {product.dimension} cm.</p>
            </div>
            <button
              className={styles.add_to_cart__btn}
              onClick={() => addProductOpenModal(product)}
              disabled={product.available? false: true}
            >
              Add to cart
            </button>

            <div className={styles.fav_btn_container} onClick={() => handleFavorite(product.id)}>
              <IconContext.Provider value={{ color: "red", size: "1.5em" }}>
                <p className={styles.fav_btn}>
                  {biblioteca[product.id]
                    ? <> <FaHeart /> <span className={styles.fav_span}>Remove from favorites</span> </>
                    : <> <FiHeart /> <span className={styles.fav_span}>Add to favorites</span> </>}
                </p>
              </IconContext.Provider>
            </div>

          </div>
        </div>
        :
        <div>
          <p className={styles.loader}>Loading...</p>
        </div>
      }

      {/* Shopping cart */}
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        contentLabel="Example Modal"
      >
        <form className={styles.modal__container}>
          <div className={styles.modal__btn_right_container}>
            <button className={styles.modal__close_modal_btn} onClick={closeModal}>x</button>
          </div>

          <h2>Shopping Cart</h2>

          {productsInCart?.map((elem, index: number) => {
            if (!elem.title) return null

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
                      alt={elem.title}
                      height={400}
                      priority
                      className={styles.modal__product_img}
                    />
                  </div>

                  <div className={styles.modal__product_mobile_separator}>
                    <div className={styles.modal__product_info}>
                      <p className={styles.modal__product_data}>Quantity: {elem.quantity}</p>
                      <p className={styles.modal__product_data}>Price: ${elem.unit_price}</p>
                      <p className={styles.modal__product_data}>Subtotal: ${elem.subTotal}</p>
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
                        className={[styles.modal__product_btn, styles.modal__product_btn_trash].join(" ")}
                        onClick={(e) => {
                          e.preventDefault()
                          handlerTrash(elem.id)
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
            <Link href="/checkout" className={styles.modal__purchase_btn_container}>
              <button className={styles.modal__start_purchase_btn}>Checkout</button>
            </Link>
          }

        </form>
      </Modal>

      <div className={styles.reviews__container}>
        <UserReview />
      </div>
    </div>
  );
};

export default ProductDetail;
