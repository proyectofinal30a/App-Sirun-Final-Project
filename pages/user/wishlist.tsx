import HEAD from "../../src-client/components/HEAD";
import Nav from "../../src-client/components/NavBar/Nav";
import Footer from "../../src-client/components/Footer/Footer";
import styles from "../../src-client/styles/AdminSideBar.module.css";
import UserSideBar from "../../src-client/components/User/UserSideBar";
import Wishlist from "../../src-client/components/User/Wishlist";
import React from "react";
import { signIn, useSession } from "next-auth/react";


export default function WishlistPage() {
  const {data: user, status} = useSession()
  if(user !== null){
    return (
    <div>
      <HEAD />
      <Nav />

      <main className={styles.general__container}>
        <div className={styles.general__container_first_col}>
          <UserSideBar />
        </div>
        <div className={styles.general__container_second_col}>
          <Wishlist />
        </div>
      </main>

      <Footer />
    </div>
    )
  } else {
    signIn('auth0')
  }
  
  
}
