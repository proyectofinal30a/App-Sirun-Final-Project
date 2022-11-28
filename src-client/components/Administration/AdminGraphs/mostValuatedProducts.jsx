import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import styles from "../../../styles/Dashboard.module.css";
import { ResponsiveContainer, Bar, XAxis, YAxis, Line, Tooltip, CartesianGrid, ComposedChart, Legend, BarChart } from 'recharts'
import { getMVP } from '../../../redux/slice/admin-graphs/admin-graphs';


 export const MostValuatedProducts = () => {
  const products = useSelector((state) => state.adminGraphs.MVProduct)
  const dispatch = useDispatch()
  const [type, setType] = useState('all')

  useEffect(() => {
    dispatch(getMVP(type))
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
       <ResponsiveContainer height={400} width={500}>
         <BarChart data={products}>
           <XAxis dataKey="name" gap={50} />
           <YAxis domain={[1, 5]} />
           <Tooltip />
           <Legend />
           <CartesianGrid />
           <Bar type="monotone" dataKey="rating" barSize={50} fill="#3c5473" />
         </BarChart>
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
