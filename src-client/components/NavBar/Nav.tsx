import React from "react";
import Link from "next/link";
import Menu from "./Menu";
import SearchBar from "../SearchBar/SearchBar";
import styles from "../../styles/Nav.module.css";

const Nav = () => {
  return (
    <>
      <header className={styles.header_container}>
        <Link href="/" className={styles.header__title}>Sirun Pâtisserie</Link>
        <div className={styles.header__nav_container}>
          <Menu />
          <SearchBar />
        </div>
      </header>
    </>
  );
};

export default Nav;
