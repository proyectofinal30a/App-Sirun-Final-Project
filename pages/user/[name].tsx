import Footer from "../../src-client/components/Footer/Footer";
import HEAD from "../../src-client/components/HEAD";
import Nav from "../../src-client/components/NavBar/Nav";
import UserSideBar from "../../src-client/components/User/UserSideBar";
export default function ProductsPage() {
  return (
    <div>
      <HEAD />
      <Nav />
      <main>
        <UserSideBar />
      </main>
      <Footer />
    </div>
  );
}

