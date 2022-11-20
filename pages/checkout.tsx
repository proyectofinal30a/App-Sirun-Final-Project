import HEAD from "../src-client/components/HEAD";
import Nav from "../src-client/components/NavBar/Nav";
import Footer from "../src-client/components/Footer/Footer";
// import About from "../src-client/components/About/About";
import FormCheckout from "../src-client/components/ShoppingCart/FormCheckout";
import React from "react";

export default function AboutPage() {
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