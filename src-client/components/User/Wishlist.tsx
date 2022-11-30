import styles from "../../styles/Wishlist.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { IconContext } from "react-icons";
import { FaHeart } from "react-icons/fa";
import { Ireducers } from "../../../lib/types";
import * as acctionFav from '../../redux/slice/favorite-user-redux/favorite-redux'


export default function Wishlist(): JSX.Element {
  const router = useRouter();
  const dispatch: Function = useDispatch();
  const { data} = useSession<boolean>();

  const myFavorite = useSelector((state: Ireducers) => state.reducerFavoriteUser.favoriteId);
  const myProduct = useSelector((state: Ireducers) => state.reducerProducts.products)

  const myProductFav = myFavorite?.[0] && myProduct?.[0] && myProduct?.filter(elem => myFavorite.includes(elem.id))


  if (!data) return (<div className={styles.wishlist__loading}>Loading...</div>);

  const handleFavorite = (id: string) => {
    let deleteConfirmation = confirm("Are you sure you want to delete this product from your wishlist?");
    if (deleteConfirmation === false) return;
    dispatch(acctionFav.deleteOneFavorite(data.user.email, id));
  }

  return (
    <div className={styles.wishlist__container}>
      <h3 className={myProductFav?.[0] ? styles.wishlist_title : styles.wishlist_title_hidden}>My Wishlist</h3>

      {Array.isArray(myProductFav) && myProductFav[0] ?
        myProductFav?.map((elem) => {
          if (!elem.name) return null

          const myImage: string = typeof elem?.image?.[0].image === "string" ? elem.image[0].image : "Loading...";

          return (
            <div key={elem.id} className={styles.wishlist_product_container}>
              <div className={styles.wishlist_product_img_container}>
                <Image
                  src={myImage}
                  width="300"
                  height="300"
                  alt={elem.name}
                  className={styles.wishlist_product_img}
                />
              </div>

              <div className={styles.wishlist_product_info_container}>
                <h3 className={styles.wishlist_product_name}>{elem.name.toLowerCase()}</h3>

                <Link href={`/productDetail/${elem.id}`} className={styles.wishlist_product_details_btn}>
                  View product details
                </Link>
              </div>

              <div className={styles.wishlist_fav_btn_container} onClick={() => handleFavorite(elem.id)}>
                <IconContext.Provider value={{ color: "red", size: "1.5em" }}>
                  <p className={styles.wishlist_fav_btn}>
                    <FaHeart />
                  </p>
                </IconContext.Provider>
              </div>
            </div>
          )
        })

        :
        <div className={styles.empty_cart__container}>
          <p className={styles.empty_cart__message}>Your wishlist is empty.</p>
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
}
