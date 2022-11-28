import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import styles from "../../../styles/Dashboard.module.css";
import { ResponsiveContainer, Bar, XAxis, YAxis, Line, Tooltip, CartesianGrid, ComposedChart, Legend, PieChart, Pie} from 'recharts';
import { convertMonth } from '../../../controllers/adminGraphs';
import { getSales, cleanState } from '../../../redux/slice/admin-graphs/admin-graphs';

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
console.log(sales);

  if(sales[2022]){
    return (
      <>
        <select onChange={(e) => monthChange(e)} className={styles.dashboard__secondary_select}>
          <option value="Now" selected disabled>Select period</option>
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
          <ResponsiveContainer height={400} width={500}>
            <ComposedChart data={selectedMonth? sales[2022][selectedMonth] : sales[2022]['November'] }>
              <XAxis dataKey="week"/>
              <YAxis />
              <Bar type="monotone" dataKey="confirmed" barSize={30} fill="#3c7358" />
              <Bar type="monotone" dataKey="pending" barSize={30} fill="#b03d3d" />
              <Tooltip />
              <Legend />
              <CartesianGrid />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </>
    );
  } else {
    <>
    <h2>Loading</h2>
    </>
  }

  
};

export default Sales;
