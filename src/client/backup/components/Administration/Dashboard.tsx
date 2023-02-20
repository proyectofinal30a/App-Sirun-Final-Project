import React, { useState } from "react";
import styles from "../../styles/Dashboard.module.css";
import Sales from "../Administration/AdminGraphs/sales";
import MostSoldProduct from "../Administration/AdminGraphs/mostSoldProduct";
import { MostValuatedProducts } from "../Administration/AdminGraphs/mostValuatedProducts";


const AdminDashboard = () => {
  const [Dashboard, setDashboard] = useState("sales");

  const changeDashboard = (e: any) => setDashboard(e.target.value);

  return (
    
    <div className={styles.dashboard__container}>
      <select onChange={(e) => changeDashboard(e)} className={styles.dashboard__select} defaultValue="">
        <option value="" disabled>Select graphic</option>
        <option value="sales">Sales</option>
        <option value="mostSoldProduct">Best selling product</option>
        <option value="mostValuatedProduct">Best ranked product</option>
      </select>

      {Dashboard === "sales" && (
        <div className={styles.dashboard__individual_container}>
          <h1 className={styles.dashboard__title}>Sales</h1>
          <div className={styles.dashboard__graphic_container}>
            <Sales />
          </div>
        </div>
      )}

      {Dashboard === "mostSoldProduct" && (
        <div className={styles.dashboard__graphic_container}>
          <h1 className={styles.dashboard__title}>Best selling product</h1>
          <MostSoldProduct />
        </div>
      )}

      {Dashboard === "mostValuatedProduct" && (
        <div className={styles.dashboard__graphic_container}>
          <h1 className={styles.dashboard__title}>Best ranked product</h1>
          <MostValuatedProducts />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
