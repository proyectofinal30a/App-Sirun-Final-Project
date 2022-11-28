import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import styles from "../../../styles/Dashboard.module.css";
import { ResponsiveContainer, Bar, XAxis, YAxis, Line, Tooltip, CartesianGrid, ComposedChart, Legend, BarChart, PieChart, Pie } from 'recharts';
import { getSolds } from '../../../redux/slice/admin-graphs/admin-graphs';


const MostSoldProduct = () => {
  const products = useSelector((state) => state.adminGraphs.productMS)
  const [type, setType] = useState('all')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSolds(type))
  }, [type])
  const changeType = (e) => {
    setType(e.target.value)
  }
  if(products){
    return (
      <>
      <select onChange={(e)=> changeType(e)}>
        <option value="all">All</option>
        <option value="muffins">Muffins</option>
        <option value="cakes">Cakes</option>
        <option value="cookies">Cookies</option>
        <option value="bakery">Bakery</option>
        <option value="desserts">Desserts</option>
        <option value="others">Others</option>
      </select>
    <div className={styles.dashboard__graphic}>
      <ResponsiveContainer height={400} width={700}>
        <BarChart data={products.slice(0, 5)}>
          <Tooltip />
          <XAxis dataKey="name" gap={70} />
          <YAxis />
          <Legend />
          <CartesianGrid />
          <Bar type="monotone" dataKey="orders" barSize={50} fill="#3c5473" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div>
      <h1>All sold products</h1>
      <ResponsiveContainer width={700} height={700}>
      <PieChart >
        <Tooltip />
        <Pie  data={products} dataKey="orders" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" />
      </PieChart>
      </ResponsiveContainer>
    </div>
    </>
  );
  } else {
    return (
      <>
      <h1>Loading</h1>
      </>
    )
  }
  
};

export default MostSoldProduct;