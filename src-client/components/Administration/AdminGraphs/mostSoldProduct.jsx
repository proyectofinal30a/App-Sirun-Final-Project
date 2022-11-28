import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import styles from "../../../styles/Dashboard.module.css";
import { ResponsiveContainer, Bar, XAxis, YAxis, Line, Tooltip, CartesianGrid, ComposedChart, Legend, BarChart } from 'recharts';
import { convertMonth } from '../../../controllers/adminGraphs';
import { getSolds } from '../../../redux/slice/admin-graphs/admin-graphs';


const MostSoldProduct = () => {
  const products = useSelector((state) => state.adminGraphs.productMS)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSolds())
  })

  if(products){
    return (
    <div className={styles.dashboard__graphic}>
      <ResponsiveContainer height={400} width={700}>
        <BarChart data={products}>
          <Tooltip />
          <XAxis dataKey="name" gap={70} />
          <YAxis />
          <Legend />
          <CartesianGrid />
          <Bar type="monotone" dataKey="orders" barSize={50} fill="#3c5473" />
        </BarChart>
      </ResponsiveContainer>
    </div>
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