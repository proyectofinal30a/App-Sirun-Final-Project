import React from "react";
import Link from "next/link";
import Menu from "./Menu";
import SearchBarOnSearch from "../SearchBar/SearchBarOnSearch";
import styles from "../../styles/Nav.module.css";

const Nav = () => {
  return (
    <>
      <header className={styles.header_container}>
        <Link href="/" className={styles.header__title}>Sirun Pâtisserie</Link>
        
        <div className={styles.header__nav_container}>
          <Menu />
          <SearchBarOnSearch />
        </div>
      </header>
    </>
  );
};

export default Nav;
