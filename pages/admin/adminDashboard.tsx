import AdminSideBar from "../../src-client/components/Administration/AdminSideBar";
import Footer from "../../src-client/components/Footer/Footer";
import HEAD from "../../src-client/components/HEAD";
import Nav from "../../src-client/components/NavBar/Nav";
import AdminDashboard from "../../src-client/components/Administration/Dashboard";
import styles from "../../src-client/styles/AdminSideBar.module.css";
import React from "react";
import { useSession, signIn } from "next-auth/react";
import {useRouter} from 'next/router'


export default function ProductsPage() {
  const {data: session, status} = useSession()
  const router = useRouter()
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
          <AdminDashboard />
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
