import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import styles from "../../../styles/Dashboard.module.css";
import { ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, BarChart, PieChart, Pie } from 'recharts';
import { getSolds } from '../../../redux/slice/admin-graphs/admin-graphs';


const MostSoldProduct = () => {
  const products = useSelector((state : any) => state.adminGraphs.productMS);
  const [type, setType] = useState('all');
  const dispatch : Function = useDispatch();

  useEffect(() => {
    dispatch(getSolds(type));
  }, [type]);

  const changeType = (e:any) => {
    setType(e.target.value);
  }

  if(products.length > 0){
    return (
      <div className={styles.dashboard_control}>
        <select onChange={(e)=> changeType(e)} defaultValue="" className={styles.dashboard__secondary_select}>
          <option value="" disabled>Select category</option>
          <option value="all">All</option>
          <option value="muffins">Muffins</option>
          <option value="cakes">Cakes</option>
          <option value="cookies">Cookies</option>
          <option value="bakery">Bakery</option>
          <option value="desserts">Desserts</option>
          <option value="others">Others</option>
        </select>

      <div className={styles.dashboard__graphic_best_selling_product}>
        <ResponsiveContainer width={500} height={400}>
          <BarChart margin={{top: 0, bottom: 0, left: 0, right: 0}} className={styles.graphic} height={400} width={500} data={products.slice(0, 5)}>
            <Tooltip />
            <XAxis dataKey="name" />
            <YAxis />
            <Legend />
            <CartesianGrid />
            <Bar type="monotone" dataKey="orders" barSize={50} fill="#3c5473" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.dashboard__cake_graphic}>
        <h1 className={styles.dashboard__sub_title}>All sold products</h1>
        <ResponsiveContainer width={500} height={400}>
          <PieChart margin={{top: 0, bottom: 0, left: 0, right: 0}}>
            <Tooltip />
            <Pie className={styles.cake_graphic} width={500} height={350} data={products} dataKey="orders" nameKey="name" outerRadius={150} fill="#3c5473" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
  } else {
    return (
      <>
        <p className={styles.loading}>Loading...</p>
      </>
    )
  }
  
};

export default MostSoldProduct;