import HEAD from "../src-client/components/head";
import Nav from "../src-client/components/NavBar/Nav";
import Footer from "../src-client/components/Footer/Footer";
import FormCheckout from "../src-client/components/User/ShoppingCart/FormCheckout";
import React from "react";

export default function CheckoutPage() {
  return (
    <div>
      <HEAD />
      <Nav />

      <main>
        <FormCheckout />
      </main>

      <Footer />
    </div>
  );
}
