import HEAD from "../src-client/components/HEAD";
import Nav from "../src-client/components/NavBar/Nav";
import Footer from "../src-client/components/Footer/Footer";
import ContactUs from "../src-client/components/ContactUs/ContactUs";
import React from "react";

export default function AboutPage() {
  return (
    <div>
      <HEAD />
      <Nav />

      <main>
        <ContactUs />
      </main>

      <Footer />
    </div>
  );
}