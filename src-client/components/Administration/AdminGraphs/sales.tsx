import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import styles from "../../../styles/Dashboard.module.css";
import { Bar, XAxis, YAxis, Tooltip, CartesianGrid, ComposedChart, Legend, Line } from 'recharts';
import { convertMonth } from '../../../controllers/adminGraphs';
import { getSales } from '../../../redux/slice/admin-graphs/admin-graphs';

const Sales = () => {
  const thisMonthAcorted = Date().split(" ")[1];
  const thisMonth = convertMonth(thisMonthAcorted);
  const [selectedMonth, setSelectedMonth] = useState(thisMonth);
  const sales = useSelector((state: any) => state.adminGraphs.salesGraph)
  const dispatch: Function = useDispatch()
  

  const monthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.target.value === "Now"
      ? setSelectedMonth(thisMonth)
      : setSelectedMonth(e.target.value);
  }
  useEffect(() =>{
    dispatch(getSales())
  })


  if(sales[2022]){
    return (
      <>
        <select onChange={(e) => monthChange(e)} className={styles.dashboard__secondary_select} defaultValue="">
          <option value="" disabled>Select period</option>
          <option value="Now">Now</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
  
        <div className={styles.dashboard__graphic}>
            <ComposedChart className={styles.graphic} height={400} width={500} data={selectedMonth? sales[2022][selectedMonth] : sales[2022][thisMonth? thisMonth : 'December'] }>
              <XAxis dataKey="week"/>
              <YAxis />
              <Bar type="monotone" dataKey="confirmed" barSize={10} fill="#84d8af"/>
              <Bar type="monotone" dataKey="fulfilled" barSize={10} fill="#3bc636"/>
              <Bar type="monotone" dataKey="in_process" barSize={10} fill="#8884d8"/>
              <Bar type="monotone" dataKey="in_transit" barSize={10} fill="#352fa0"/>
              <Bar type="monotone" dataKey="canceled" barSize={10} fill="#bd4343"/>
              <Tooltip />
              <Legend />
              <CartesianGrid />
            </ComposedChart>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h2>Loading...</h2>
      </>
    )
  }

  
};

export default Sales;
