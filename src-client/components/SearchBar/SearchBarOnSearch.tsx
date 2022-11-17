import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ireducers } from "../../../lib/types";
import { getProductsByName } from "../../redux/slice/filter-product-client/filters-redux";
import styles from "../../styles/SearchBar.module.css";


const SearchBar = () => {
  const dispatch: Function = useDispatch();
  const allProducts: any = useSelector<Ireducers>((state) => state.reducerProducts.products);

  const [name, setName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim());
    dispatch(getProductsByName(name.toLowerCase(), allProducts));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (name) {
      if (e.key === "Enter") handleSearch();
    }
  }

  const handleSearch = () => {
    dispatch(getProductsByName(name.toLowerCase(), allProducts));
    setName("");
  }

  return (
    <div className={styles.search_bar__container}>
      <div className="search-engine-container">
        <input
          type="search"
          placeholder="Search product"
          className={styles.search_bar__input}
          autoComplete="off"
          name="name"
          value={name}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />

        <button
          type="submit"
          className={styles.search_bar__btn}
          disabled={!name ? true : false}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
