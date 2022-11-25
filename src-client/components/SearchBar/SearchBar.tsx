import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Ireducers } from "../../../lib/types";
import { getProductsByName } from "../../redux/slice/filter-product-client/filters-redux";
import { getProductByName } from "../../redux/slice/product-Admin-redux/GetProAdm-Redux"
import styles from "../../styles/SearchBar.module.css";
import { useRouter } from "next/router";


const SearchBar = () => {
  const dispatch: Function = useDispatch();
  const allProducts: any = useSelector<Ireducers>((state) => state.reducerProducts.products);
  const router = useRouter()

  const [name, setName] = useState("");

  let url = "/products"
  if (router.pathname === "/admin/productManage") {
    url = "/admin/adminProducts"
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (router.pathname === "/admin/productManage") {
      name.toLocaleLowerCase()
      const obj: any = {
        name: name,
        allProducts: allProducts,
      }
      dispatch(getProductByName(obj))
      return;
    }
    dispatch(getProductsByName(name.toLowerCase(), allProducts));
  };


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
          onChange={(e) => handleChange(e)}
        />
        {/* //ocultar boton de search en adminManageProducts en busqueda dejar porque redirecciona */}

        {router.pathname === "/admin/productManage" ? null : <Link
          href={`${url}`}
          className={name ? styles.search_bar__link : styles.search_bar__disabled_link}
        >
          Search
        </Link>
        }

      </div>
    </div>
  );
};

export default SearchBar;


