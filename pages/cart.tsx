import HEAD from "../src-client/components/HEAD";
import Nav from "../src-client/components/NavBar/Nav";
import Footer from "../src-client/components/Footer/Footer";
import ShoppingCart from "../src-client/components/ShoppingCart/ShoppingCart";

export default function CartPage() {
  return (
    <div>
      <HEAD />
      <Nav />

      <main>
        <ShoppingCart />
      </main>

      <Footer />
    </div>
  );
}