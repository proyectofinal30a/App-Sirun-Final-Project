import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { removeFromFavorites } from "../../redux/slice/user-detail-redux/user-redux";
import { getUserDetail } from "../../redux/slice/user-detail-redux/user-redux";
import { Ireducers } from "../../../lib/types";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { IconContext } from "react-icons";
import { useSession } from "next-auth/react";
import styles from "../../styles/Wishlist.module.css";


export default function Wishlist(): JSX.Element {
  const dispatch: Function = useDispatch();
  const { data } = useSession();

  const myProfile = useSelector((state: Ireducers) => state.reducerUser.user);
  const myNuEmail = data?.user?.email;
  const myInfUser = useSelector((state: Ireducers) => state.reducerUser);

  const [isFavorited, setIsFavorited] = useState({ id: "", favorited: true });

  useEffect(() => {
    if (!myInfUser?.user?.id) {
      dispatch(getUserDetail(myNuEmail));
    }
  }, [dispatch, data, myInfUser?.user?.id, myNuEmail]);


  if (!myProfile) return (<div className={styles.wishlist__loading}>Loading...</div>);

  const handleClick = (id: any) => {
    const userId: string = myProfile.id;
    const productId = id;

    // setIsFavorited({ id: userId, favorited: false ? true : false });

    // Deleting from wishlist confirmation
    let deleteConfirmation = confirm("Are you sure you want to delete this product from your wishlist?");
    if (deleteConfirmation === false) return;
    removeFromFavorites(userId, productId);
  }


  return (
    <div className={styles.wishlist__container}>
      <h3 className={styles.wishlist_title}>My Wishlist</h3>
      
      {myProfile.favorites.map((elem) => {
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
      })}
    </div>
  );
}
