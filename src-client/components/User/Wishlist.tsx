import styles from "../../styles/Wishlist.module.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { IconContext } from "react-icons";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { Ireducers } from "../../../lib/types";
import { requestAddToFavorites, addToFavorites, getUserDetail } from "../../redux/slice/user-detail-redux/user-redux";


export default function Wishlist(): JSX.Element {
  const router = useRouter();
  const dispatch: Function = useDispatch();
  const { data, status } = useSession<boolean>();

  const myProfile = useSelector((state: Ireducers) => state.reducerUser.user);
  const myNuEmail = data?.user?.email;
  const myInfUser = useSelector((state: Ireducers) => state.reducerUser);
  

  useEffect(() => {
    if (!myInfUser?.user?.id) {
      dispatch(getUserDetail(myNuEmail));
    }
  }, [dispatch, data, myInfUser?.user?.id, myNuEmail]);


  interface IproduId {
    id: string;
  }

  let favorites2: Array<IproduId> = [];


  useEffect(() => {
    if (!myProfile) return;
    (async () => { await requestAddToFavorites(myProfile.id, favorites2) })();
  })


  if (!myProfile.name || !data) return (<div className={styles.wishlist__loading}>Loading...</div>);

  let biblioteca: any = {};

  if (myProfile) {
    favorites2 = myProfile.favorites.map((e) => { return { id: e.id } })
    favorites2.forEach(fav => {
      biblioteca[fav.id] = true;
    })
  }
  
  const handleFavorite = (id: string) => {
    const productToAdd = { id: id };
    let deleteConfirmation = confirm("Are you sure you want to delete this product from your wishlist?");
    if (deleteConfirmation === false) return;
    dispatch(addToFavorites(productToAdd));
  }


  return (
    <div className={styles.wishlist__container}>
      <h3 className={myProfile.favorites[0] ? styles.wishlist_title : styles.wishlist_title_hidden}>My Wishlist</h3>

      {myProfile.favorites[0] ? 
        myProfile.favorites.map((elem) => {
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
                    {biblioteca[elem.id] ? <FaHeart /> : <FiHeart /> }
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
