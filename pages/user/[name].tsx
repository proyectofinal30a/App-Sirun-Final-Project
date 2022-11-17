import Footer from "../../src-client/components/Footer/Footer";
import HEAD from "../../src-client/components/HEAD";
import Nav from "../../src-client/components/NavBar/Nav";
import UserSideBar from "../../src-client/components/User/UserSideBar";
import { useRouter } from "next/router";
export default function ProductsPage() {

  const { query } = useRouter()
  const name = query.name;
  if (!name) return
  return (
    <div>
      <HEAD />
      <Nav />
      <main>
        <UserSideBar name={name} />
      </main>
      <Footer />
    </div>
  );
}

