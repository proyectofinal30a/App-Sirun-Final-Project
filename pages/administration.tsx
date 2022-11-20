import AdminSideBar from "../src-client/components/Administration/AdminSideBar";
import Footer from "../src-client/components/Footer/Footer";
import HEAD from "../src-client/components/HEAD";
import Nav from "../src-client/components/NavBar/Nav";
import React from "react";

export default function ProductsPage() {
  return (
    <div>
      <HEAD />
      <Nav />

      <main>
        <AdminSideBar />

        {/* Próximamente acá abajo DASHBORD!!! */}
      </main>

      <Footer />
    </div>
  );
}
