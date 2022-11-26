import React from 'react';
import styles from "../../../styles/Dashboard.module.css";
import { ResponsiveContainer, Bar, XAxis, YAxis, Line, Tooltip, CartesianGrid, ComposedChart, Legend, BarChart } from 'recharts';
import { Products } from './mostValuated';

 export const MostValuatedProducts = () => {
   return (
     <div className={styles.dashboard__graphic}>
       <ResponsiveContainer height={400} width={500}>
         <BarChart data={Products}>
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
 };
