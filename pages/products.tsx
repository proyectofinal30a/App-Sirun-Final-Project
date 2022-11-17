import HEAD from "../src-client/components/HEAD";
import NavOnSearch from "../src-client/components/NavBar/NavOnSearch";
import FilterAndOrder from "../src-client/components/FiltersAndOrders/FiltersAndOrders";
import AllProductsCards from "../src-client/components/AllProductsCards/AllProductsCards";
import Footer from "../src-client/components/Footer/Footer";

export default function ProductsPage() {
  return (
    <div>
      <HEAD />
      <NavOnSearch />

      <main>
        <FilterAndOrder />
        <AllProductsCards />
      </main>

      <Footer />
    </div>
  );
}
