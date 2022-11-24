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
import { removeFromFavorites, getUserDetail } from "../../redux/slice/user-detail-redux/user-redux";


export default function Wishlist(): JSX.Element {
  const router = useRouter();
  const dispatch: Function = useDispatch();
  const { data } = useSession();

  const myProfile = useSelector((state: Ireducers) => state.reducerUser.user);
  const myNuEmail = data?.user?.email;
  const myInfUser = useSelector((state: Ireducers) => state.reducerUser);


  useEffect(() => {
    if (!myInfUser?.user?.id) {
      dispatch(getUserDetail(myNuEmail));
    }
  }, [dispatch, data, myInfUser?.user?.id, myNuEmail]);


  if (!myProfile) return (<div className={styles.wishlist__loading}>Loading...</div>);

  const handleClick = (id: any) => {
    const userId: string = myProfile.id;
    const productId = id;

    // Deleting from wishlist confirmation
    let deleteConfirmation = confirm("Are you sure you want to delete this product from your wishlist?");
    if (deleteConfirmation === false) return;
    removeFromFavorites(userId, productId);
  }


  return (
    <div className={styles.wishlist__container}>
      <h3 className={myProfile.favorites[0] ? styles.wishlist_title : styles.wishlist_title_hidden}>My Wishlist</h3>

      {myProfile.favorites[0] ? 
        myProfile.favorites.map((elem) => {
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

              <div className={styles.wishlist_fav_btn_container} onClick={() => handleClick(elem.id)}>
                <IconContext.Provider value={{ color: "red", size: "1.3em" }}>
                  <p className={styles.wishlist_fav_btn}>
                    <FaHeart />
                    {/* <FiHeart /> */}
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
