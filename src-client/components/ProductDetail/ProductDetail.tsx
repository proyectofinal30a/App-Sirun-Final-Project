import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetail, cleanProductDetail } from "../../redux/slice/products-client/Product-detail";
import { Iproduct, Ireducers } from "../../../lib/types";
import { addToCart, addOne, removeOne, trashItem } from "../../redux/slice/cart-redux/cart";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/ProductDetail.module.css";
import Modal from "react-modal";
import { BsFillTrashFill } from "react-icons/bs";
import Link from "next/link";


const ProductDetail = () => {
  const { query } = useRouter();
  const id = query.id;

  const dispatch: Function = useDispatch();
  const product: any = useSelector<Ireducers>((state) => state.reducerProductDetail.productDetail);
  const cart: any = useSelector<Ireducers>(
    (state) => state.reducerCart.products
  );

  useEffect(() => {
    dispatch(getProductDetail(id));
    return () => dispatch(cleanProductDetail());
  }, [dispatch, id]);



  // Shopping cart modal
  const [modalIsOpen, setIsOpen] = useState(false);
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
  };

  let total = 0;
  cart.map((elem: any) => {
    return (total += elem.subTotal);
  });

  // Images switch
  const [activeImage, setActiveImage] = useState("");
  const detail = product?.image?.[0] ? product?.image?.[0] : "https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif";

  const handleMouseOver = (url: string, index: number) => {
    setActiveImage(url);
  };

  let url2 = ""
  activeImage ? url2 = activeImage : url2 = detail


  return (
    <div>
      {product && (
        <div className={styles.detail__container}>
          {/* Zona izquierda */}
          <div className={styles.detail__container__images}>
            <div className={styles.image__secondary__container}>
              {product.image?.map((url: string, index: number) => {
                return (
                  <div key={index} className={styles.image_individual__container}>
                    <Image
                      src={url}
                      width={300}
                      alt={product.name}
                      height={156}
                      onMouseOver={() => handleMouseOver(url, index)}
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

          {/* Zona derecha */}
          <div className={styles.detail__info}>
            <h1 className={styles.detail__info_title}>{product.name}</h1>
            <p className={styles.detail__info_price}>$ {product.price}</p>

            <div className={styles.detail__info_extra}>
              <p className={styles.detail__info_extras}>{product.type}</p>
              <p className={styles.detail__info_extras}>{product.category}</p>
            </div>

            <div className={styles.detail_info_description}>
              <p className={styles.detail_info_description_title}>Product description</p>
              <p>{product.description}</p>
            </div>
            <button
              className={styles.add_to_cart__btn}
              // onClick={(e: any) => handlerAdd(e, product)}
              onClick={(e: any) => addProductOpenModal(e, product)}
            >
              Add to cart
            </button>
          </div>
        </div>

      )}

      {/* Shopping cart */}
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modal}
        contentLabel="Example Modal"
      >
        <form>
          <div className={styles.right}>
            <button className={styles.button__close} onClick={closeModal}>x</button>
          </div>
          <h2>Shopping Cart</h2>

          {cart?.map((elem: any, index: number) => {
            return (
              <div key={index}>
                <p>Product Name: {elem.product.name}</p>

                <Image
                  key={index}
                  src={elem?.product?.image?.[0]}
                  width={100}
                  alt={elem.product.name}
                  height={100}
                  priority
                  className={styles.modal_product_card__img}
                />
                <p>Quantity: {elem.quantity}</p>
                <p>Price: {elem.product.price}</p>
                <p>subTotal: {elem.subTotal}</p>

                <button
                  onClick={(e: any) => handlerAddOne(e, elem.product)}
                >
                  {" "}
                  +{" "}
                </button>
                <button
                  onClick={(e: any) => handlerRemoveOne(e, elem.product)}
                >
                  {" "}
                  -{" "}
                </button>
                <button
                  onClick={(e: any) => handlerTrash(e, elem.product)}
                >
                  <BsFillTrashFill />
                </button>
              </div>
            );
          })}

          <p>TOTAL: ${total}</p>
          <Link className="button" href="/checkout">
            <button>Iniciar compra</button>
          </Link>

        </form>
      </Modal>
    </div>
  );
};

export default ProductDetail;
