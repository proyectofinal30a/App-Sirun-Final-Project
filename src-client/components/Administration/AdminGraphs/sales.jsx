import React, {useState} from 'react';
import styles from "../../../styles/Dashboard.module.css";
import { ResponsiveContainer, Bar, XAxis, YAxis, Line, Tooltip, CartesianGrid, ComposedChart, Legend} from 'recharts';
import { convertMonth } from '../../../controllers/adminGraphs';
import { data } from './salesData';

const Sales = () => {
  const thisMonthAcorted = Date().split(" ")[1];
  const thisMonth = convertMonth(thisMonthAcorted);
  const [selectedMonth, setSelectedMonth] = useState(thisMonth);

  const monthChange = (e) => {
    e.target.value === "Now"
      ? setSelectedMonth(thisMonth)
      : setSelectedMonth(e.target.value);
  };

  return (
    <>
      <select onChange={(e) => monthChange(e)} className={styles.dashboard__secondary_select}>
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
          <ComposedChart data={data[selectedMonth]}>
            <XAxis dataKey="week" gap={50} />
            <YAxis />
            <Bar type="monotone" dataKey="sales" barSize={50} fill="#3c5473" />
            <Line type="monotone" dataKey="approved" stroke="#18d10e" />
            <Line type="monotone" dataKey="rejected" stroke="#d1320e" />
            <Tooltip />
            <Legend />
            <CartesianGrid />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Sales;