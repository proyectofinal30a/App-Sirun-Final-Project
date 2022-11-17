import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { Iproduct } from "../../../lib/types";
import { addToCart } from "../../redux/slice/cart-redux/cart";
import styles from "../../styles/AllProductsCards.module.css";

const ProductsByName = ({ product }: any) => {
  const dispatch: Function = useDispatch();

  const searchedProducts: any = useSelector(
    (state: any) => state.reducerProductsByName.productsByName
  );

  const handlerAdd = (e: Event, product: Iproduct) => {
    e.preventDefault();
    const { id, name }: any = product;
    dispatch(addToCart(id));
    alert(`se agrego el producto ${name}`);
  };

  return (
    <div className={styles.products_container}>
      {searchedProducts[0] ? (
        searchedProducts.map((product: any) => {
          return (
            <div key={product.id} className={styles.product_card__container}>
              <Link
                href={`/productDetail/${product.id}`}
                className={styles.product_card__title}
              >
                <h1>{product.name}</h1>
              </Link>

              <Image
                key={product.image[0]}
                src={product.image[0]}
                width={250}
                alt={product.name}
                height={250}
                priority
                className={styles.product_card__img}
              />

              <div className={styles.product_card__info_container}>
                <p>$ {product.price}</p>
                <p>{product.type}</p>
                <br />
                <button
                  className={styles.add_to_cart__btn}
                  onClick={(e: any) => handlerAdd(e, product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className={styles.products_not_found}>
          <p>No se encontró ningún resultado en la búsqueda.</p>
        </div>
      )}
    </div>
  );
};

export default ProductsByName;
