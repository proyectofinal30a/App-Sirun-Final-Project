import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetail, cleanProductDetail } from "../../redux/slice/products-client/Product-detail";
import { addToCart } from "../../redux/slice/cart-redux/cart";
import { Iproduct, Ireducers } from "../../../lib/types";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/ProductDetail.module.css";


const ProductDetail = () => {
  const { query } = useRouter();
  const id = query.id;

  const dispatch: Function = useDispatch();
  const product: any = useSelector<Ireducers>((state) => state.reducerProductDetail.productDetail);

  useEffect(() => {
    dispatch(getProductDetail(id));
    return () => dispatch(cleanProductDetail());
  }, [dispatch, id]);


  // Shopping cart
  const handlerAdd = (e: Event, product: Iproduct) => {
    e.preventDefault();
    const { id, name }: any = product;
    dispatch(addToCart(id));
    alert(`Product ${name} added to shopping cart.`);
  };


  // Images switch
  const [activeImage, setActiveImage] = useState("");
  const detail = product?.image?.[0];

  const handleMouseOver = (url: string, index: number) => {
    setActiveImage(url);
  };


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
                      height={150}
                      onMouseOver={() => handleMouseOver(url, index)}
                      className={styles.image_individual__img}
                    />
                  </div>
                );
              })}
            </div>

            <div className={styles.image_main__container}>
              <Image
                src={activeImage ? activeImage : detail}
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
              onClick={(e: any) => handlerAdd(e, product)}
            >
              Add to cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
