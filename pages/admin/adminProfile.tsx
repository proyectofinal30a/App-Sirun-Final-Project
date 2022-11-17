import HEAD from "../../src-client/components/HEAD";
import Nav from "../../src-client/components/NavBar/Nav";
import Footer from "../../src-client/components/Footer/Footer";
import AdminSideBar from "../../src-client/components/Administration/AdminSideBar"; // estilos generales de layout de user administrador
import styles from "../../src-client/styles/AdminSideBar.module.css";

export default function AdminProfilePage() {
  return (
    <div>
      <HEAD />
      <Nav />

      <main className={styles.general__container}>
        <div className={styles.general__container_first_col}>
          <AdminSideBar />
        </div>
        <div className={styles.general__container_second_col}>
          {/* Falta crear componente AdminProfile */}
        </div>
      </main>

      <Footer />
    </div>
  );
}
