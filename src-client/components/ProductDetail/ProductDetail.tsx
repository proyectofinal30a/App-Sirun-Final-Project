import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetail, cleanProductDetail } from "../../redux/slice/products-client/Product-detail-redux";
import { Iproduct, Ireducers } from "../../../lib/types";
import { addToCart, addOne, removeOne, trashItem } from "../../redux/slice/cart-redux/cart";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-modal";
import { BsFillTrashFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { IconContext } from "react-icons";
import { removeFromFavorites, addToFavorites } from "../../redux/slice/user-detail-redux/user-redux";
import { useSession } from "next-auth/react";
import { getUserDetail } from "../../redux/slice/user-detail-redux/user-redux";
import { UserReview } from "./UserReview";
import styles from "../../styles/ProductDetail.module.css";
import Average from "./StarsAverage"
import styless from "../../styles/UserReview.module.css";
import { Ievaluations } from '../../../lib/types';
import { FaStar } from "react-icons/fa";

const ProductDetail = () => {
  const { query } = useRouter();
  const id = query.id;

  const { data } = useSession();
  const myNuEmail = data?.user?.email;
  const myInfUser = useSelector((state: Ireducers) => state.reducerUser);
  const [activeImage, setActiveImage] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const dispatch: Function = useDispatch();
  const myProfile = useSelector((state: Ireducers) => state.reducerUser.user);
  const product = useSelector((state: Ireducers) => state.reducerProductDetail.detail);
  const cart: any = useSelector<Ireducers>((state) => state.reducerCart.products);

  useEffect(() => {
    dispatch(cleanProductDetail());
    typeof id === 'string' && dispatch(getProductDetail(id));
  }, [dispatch, id]);


  useEffect(() => {
    if (!myInfUser?.user?.id) {
      dispatch(getUserDetail(myNuEmail));

    }

  }, [dispatch, data, myInfUser?.user?.id, myNuEmail]);

  if (id !== product.id || !product?.evaluation) return <div className={styles.loading}>Loading...</div>


  const { evaluation } = product
  // SHOPPING CART
  function closeModal() {
    setIsOpen(false);
  }

  const addProductOpenModal = (e: Event, product: Iproduct) => {
    e.preventDefault();
    setIsOpen(true);
    const { id, name, price, image }: any = product;
    const productToAdd = {
      id: id,
      name: name,
      price: price,
      image: image,
    };
    dispatch(addToCart(productToAdd));
  };


  const handlerAddOne = (e: Event, product: Iproduct) => {
    e.preventDefault();
    const { id, name, price, image }: any = product;

    const productToAdd = {
      id: id,
      name: name,
      price: price,
      image: image,
    };
    dispatch(addOne(productToAdd));
  };

  const handlerRemoveOne = (e: Event, product: Iproduct) => {
    e.preventDefault();
    const { id, name, price, image }: any = product;
    const productToAdd = {
      id: id,
      name: name,
      price: price,
      image: image,
    };
    dispatch(removeOne(productToAdd));
  };

  const handlerTrash = (e: Event, product: Iproduct) => {
    e.preventDefault();
    const { id }: any = product;
    dispatch(trashItem(id));
    if (cart.length === 1 || cart.length === 0) { return setIsOpen(false); }
  };

  let total = 0;
  cart.map((elem: any) => {
    return (total += elem.subTotal);
  });


  // IMAGES SWITCHER

  if (!product?.image?.[0]?.image) return <div className={styles.loading}>Loading...</div>

  const detail = product.image[0].image

  const handleMouseOver = (url: string, index: number) => {
    setActiveImage(url);
  };

  const url2 = activeImage ? activeImage : detail;


  // FAVORITE 

  const biblioteca: any = {};
  myProfile?.favorites.forEach(fav => {
    if (fav.id) biblioteca[fav.id] = true;
  })

  const handleFavorite = (id: any) => {
    const userId: string = myProfile?.id;
    const productId: string = id;

    if (biblioteca[productId]) {
      removeFromFavorites(userId, productId);
      return dispatch(getUserDetail(myNuEmail));
    };
    addToFavorites(userId, productId);
    return dispatch(getUserDetail(myNuEmail));
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
            </div>
            <button
              className={styles.add_to_cart__btn}
              onClick={(e: any) => addProductOpenModal(e, product)}
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
          {/* FALTA: Close modal when cart is empty */}
          {cart?.map((elem: any, index: number) => {
            const myUrl = elem?.product?.image?.[0]?.image
            return (
              <div key={index} className={styles.modal__product_container}>
                <p className={styles.modal__product_name}>
                  {elem.product.name.toLowerCase()}
                </p>

                <div className={styles.modal_info_container}>
                  <div className={styles.modal__product_img_container}>
                    <Image
                      key={index}
                      src={myUrl}
                      width={400}
                      alt={elem.product.name}
                      height={400}
                      priority
                      className={styles.modal__product_img}
                    />
                  </div>

                  <div className={styles.modal__product_mobile_separator}>
                    <div className={styles.modal__product_info}>
                      <p className={styles.modal__product_data}>Quantity: {elem.quantity}</p>
                      <p className={styles.modal__product_data}>Price: {elem.product.price}</p>
                      <p className={styles.modal__product_data}>Subtotal: {elem.subTotal}</p>
                    </div>

                    <div className={styles.modal__product_btns_container}>
                      <button
                        className={styles.modal__product_btn}
                        onClick={(e: any) => handlerAddOne(e, elem.product)}
                      >
                        {" "}+{" "}
                      </button>
                      <button
                        className={styles.modal__product_btn}
                        onClick={(e: any) => handlerRemoveOne(e, elem.product)}
                      >
                        {" "}-{" "}
                      </button>
                      <button
                        className={[styles.modal__product_btn, styles.modal__product_btn_trash].join(" ")}
                        onClick={(e: any) => handlerTrash(e, elem.product)}
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
      </Modal>

      <div className={styles.reviews__container}>
        <UserReview />
      </div>
    </div>
  );
};

export default ProductDetail;
