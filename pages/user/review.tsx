import HEAD from "../../src-client/components/HEAD";
import Nav from "../../src-client/components/NavBar/Nav";
import Footer from "../../src-client/components/Footer/Footer";
import styles from "../../src-client/styles/AdminSideBar.module.css";
import UserSideBar from "../../src-client/components/User/UserSideBar";
import ReciewAndRating from "../../src-client/components/User/ReviewAndRating";
export default function AdminProductsPage() {
  return (
    <div>
      <HEAD />
      <Nav />

      <main className={styles.general__container}>
        <div className={styles.general__container_first_col}>
          <UserSideBar />
        </div>
        <div className={styles.general__container_second_col}>
          <ReciewAndRating />
        </div>
      </main>

      <Footer />
    </div>
  );
}
