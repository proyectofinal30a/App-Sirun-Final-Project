import React, {useState} from "react";
import Image from "next/image";
import styles from "../../styles/Dashboard.module.css";
import Sales from "../AdminGraphs/sales";
import MostSoldProduct from "../AdminGraphs/mostSoldProduct";
import {MostValuatedProducts} from "../AdminGraphs/mostValuatedProducts";



const AdminDashboard = () => {
const [Dashboard, setDashboard] = useState('sales')
const changeDashboard = (e: any) => {
  setDashboard(e.target.value)
}

  return (
    <div className={styles.dashboard__container}>
      <select onChange={(e) => changeDashboard(e)}>
      <option value="sales">Sales dashboard</option>
      <option value="mostSoldProduct">Most sold product</option>
      <option value="mostValuatedProduct">Most valuated product</option>
    </select>
        {Dashboard === 'sales' && <><h1>SALES DASHBOARD</h1>
        <Sales /></>}
        {Dashboard === 'mostSoldProduct' && <>
        <h1>MOST SOLD PRODUCT</h1>
        <MostSoldProduct />
        </>}
        {Dashboard === 'mostValuatedProduct' && <>
        <h1>MOST VALUATED PRODUCT</h1>
        <MostValuatedProducts />
        </>}
    </div>
  );
};

export default AdminDashboard;
