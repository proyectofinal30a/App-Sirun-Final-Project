import HEAD from "../src-client/components/head";
import Nav from "../src-client/components/NavBar/Nav";
import Footer from "../src-client/components/Footer/Footer";
import About from "../src-client/components/About/About";
import React from "react";

export default function AboutPage() {
  return (
    <div>
      <HEAD />
      <Nav />

      <main>
        <About />
      </main>

      <Footer />
    </div>
  );
}
