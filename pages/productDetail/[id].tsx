import HEAD from "../../src-client/components/HEAD";
import Nav from "../../src-client/components/NavBar/Nav";
import Footer from "../../src-client/components/Footer/Footer";
import ProductDetail from "../../src-client/components/ProductDetail/ProductDetail";


export default function DetailPage() {
  return (
    <div>
      <HEAD />
      <Nav />

      <main>
        <ProductDetail />
      </main>

      <Footer />
    </div>
  );
}