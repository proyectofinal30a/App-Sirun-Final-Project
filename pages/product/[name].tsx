import HEAD from "../../src-client/components/HEAD";
import NavOnSearch from "../../src-client/components/NavBar/NavOnSearch";
import Footer from "../../src-client/components/Footer/Footer";
import FilterAndOrder from "../../src-client/components/FiltersAndOrders/FiltersAndOrders";
import ProductsByName from "../../src-client/components/ProductByName/ProductsByName";

export default function ProductsByNamePage() {
  return (
    <div>
      <HEAD />
      <NavOnSearch />

      <main>
        <FilterAndOrder />
        <ProductsByName />
      </main>

      <Footer />
    </div>
  );
}
