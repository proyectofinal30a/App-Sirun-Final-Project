import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../../styles/Dashboard.module.css";
import {
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  BarChart,
} from "recharts";
import { getMVP } from "../../../redux/slice/admin-graphs/admin-graphs";

export const MostValuatedProducts = () => {
  const products = useSelector((state: any) => state.adminGraphs.MVProduct);
  const dispatch: Function = useDispatch();
  const [type, setType] = useState("all");

  useEffect(() => {
    dispatch(getMVP(type));
  }, [type]);

  const changeType = (e: any) => {
    setType(e.target.value);
  };

  if (products) {
    return (
      <div className={styles.dashboard_control}>
        <select
          onChange={(e) => changeType(e)}
          defaultValue=""
          className={styles.dashboard__secondary_select}
        >
          <option value="" disabled>
            Select category
          </option>
          <option value="all">All</option>
          <option value="muffins">Muffins</option>
          <option value="cakes">Cakes</option>
          <option value="cookies">Cookies</option>
          <option value="bakery">Bakery</option>
          <option value="desserts">Desserts</option>
          <option value="others">Others</option>
        </select>

        <div className={styles.dashboard__graphic_best_ranked_product}>
          <ResponsiveContainer width={500} height={400}>
            <BarChart
              margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
              className={styles.graphic}
              height={400}
              width={500}
              data={products}
            >
              <XAxis dataKey="name" />
              <YAxis domain={[1, 5]} />
              <Tooltip />
              <Legend />
              <CartesianGrid />
              <Bar
                type="monotone"
                dataKey="rating"
                barSize={50}
                fill="#3c5473"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <p className={styles.loading}>Loading...</p>
      </>
    );
  }
};
