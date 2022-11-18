import HEAD from "../../src-client/components/HEAD";
import Nav from "../../src-client/components/NavBar/Nav";
import Footer from "../../src-client/components/Footer/Footer";
import styles from "../../src-client/styles/AdminSideBar.module.css";
import UserSideBar from "../../src-client/components/User/UserSideBar";
import Profile from "../../src-client/components/User/Profile";
export default function UserProfile() {
  return (
    <div>
      <HEAD />
      <Nav />

      <main className={styles.general__container}>
        <div className={styles.general__container_first_col}>
          <UserSideBar />
        </div>
        <div className={styles.general__container_second_col}>
          <Profile />
        </div>
      </main>

      <Footer />
    </div>
  );
}
