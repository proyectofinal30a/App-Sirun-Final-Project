import HEAD from "../src-client/components/HEAD";
import Nav from "../src-client/components/NavBar/Nav";
import Footer from "../src-client/components/Footer/Footer";
import Wishlist from "../src-client/components/Wishlist/Wishlist";

export default function WishlistPage() {
  return (
    <div>
      <HEAD />
      <Nav />

      <main>
        <Wishlist />
      </main>

      <Footer />
    </div>
  );
}