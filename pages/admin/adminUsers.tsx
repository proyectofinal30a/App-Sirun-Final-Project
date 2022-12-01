import HEAD from "../../src-client/components/HEAD";
import Nav from "../../src-client/components/NavBar/Nav";
import Footer from "../../src-client/components/Footer/Footer";
import AdminSideBar from "../../src-client/components/Administration/AdminSideBar"; 
import AdminManageUsers from "../../src-client/components/Administration/AdminManageUsers";
import styles from "../../src-client/styles/AdminSideBar.module.css";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function AdminUsersPage() {
  const router = useRouter()
  const {data: session, status} = useSession()
  if(session?.user.role === 'admin' || session?.user.role === 'super admin'){
  return (
    <div>
      <HEAD />
      <Nav />

      <main className={styles.general__container}>
        <div className={styles.general__container_first_col}>
          <AdminSideBar />
        </div>
        <div className={styles.general__container_second_col}>
          <AdminManageUsers />
        </div>
      </main>

      <Footer />
    </div>
  );
  }  else if(session?.user.role === 'user') {
    router.push('https://sirunnpatisserie.vercel.app/')
  } else {
    signIn('auth0')
  }
}
