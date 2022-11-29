import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import styles from "../../../styles/Dashboard.module.css";
import { Bar, XAxis, YAxis, Tooltip, CartesianGrid, ComposedChart, Legend, ResponsiveContainer} from 'recharts';
import { convertMonth } from '../../../controllers/adminGraphs';
import { getSales } from '../../../redux/slice/admin-graphs/admin-graphs';

const Sales = () => {
  const thisMonthAcorted = Date().split(" ")[1];
  const thisMonth = convertMonth(thisMonthAcorted);
  const [selectedMonth, setSelectedMonth] = useState(thisMonth);
  const sales = useSelector((state: any) => state.adminGraphs.salesGraph)
  const dispatch: Function = useDispatch()
  console.log(sales);
  

  const monthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.target.value === "Now"
      ? setSelectedMonth(thisMonth)
      : setSelectedMonth(e.target.value);
  }
  useEffect(() =>{
    if(!sales[2022]) dispatch(getSales())
  }, [sales])

  


  if(sales[2022]){
    const optionsGenerator = () => {
      const array: string[] = []
    for(const props in sales[2022]){
      array.push(props)
    }
    return array
  } 

  const options = optionsGenerator()
    return (
      <div className={styles.dashboard_control}>
        <select onChange={(e) => monthChange(e)} className={styles.dashboard__secondary_select} defaultValue="">
          <option value="Now" disabled>Select period</option>
          <option value="Now">Now</option>
          {options?.map((month: any) => {
            return (
              <option value={`${month}`}>{`${month}`}</option>
            )
          })}
        </select>
  
        <div className={styles.dashboard__graphic}>

          <ResponsiveContainer width={500} height={400}>
            <ComposedChart margin={{top: 0, bottom: 0, left: 0, right: 0}} className={styles.graphic} height={400} width={500} data={selectedMonth? sales[2022][selectedMonth] : sales[2022]['November'] }>

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

export default Sales;
