import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import styles from "../../../styles/Dashboard.module.css";
import { ResponsiveContainer, Bar, XAxis, YAxis, Line, Tooltip, CartesianGrid, ComposedChart, Legend, BarChart } from 'recharts'
import { getMVP } from '../../../redux/slice/admin-graphs/admin-graphs';


 export const MostValuatedProducts = () => {
  const products = useSelector((state) => state.adminGraphs.MVProduct)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getMVP())
  })
  if(products){
    return (
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
   );
  } else {
    return (
      <>
      <h1>Loading</h1>
      </>
    )
  }
   
 };
