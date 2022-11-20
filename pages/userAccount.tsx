import HEAD from "../src-client/components/HEAD";
import Nav from "../src-client/components/NavBar/Nav";
import Footer from "../src-client/components/Footer/Footer";
import UserAccount from "../src-client/components/UserAccount/UserAccount";
import React from "react";

export default function AccountPage() {
  return (
    <div>
      <HEAD />
      <Nav />

      <main>
        <UserAccount />
      </main>

      <Footer />
    </div>
  );
}