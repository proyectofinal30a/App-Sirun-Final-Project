import React from 'react'
import {ResponsiveContainer, Bar, XAxis, YAxis, Line, Tooltip, CartesianGrid, ComposedChart, Legend, BarChart} from 'recharts'
import { convertMonth } from '../../controllers/adminGraphs'
import { Products } from './mostSoldData'

const MostSoldProduct = () => {
  return (
    <>
    <ResponsiveContainer height='100%' width={500}>
        <BarChart data={Products}>
            <Tooltip />
            <XAxis dataKey='name' gap={40} />
            <YAxis />
            <Legend />
            <CartesianGrid />
            <Bar type='monotone' dataKey='sales' barSize={50} fill='#3c5473' />
        </BarChart>
    </ResponsiveContainer>
    </>
  )
}

export default MostSoldProduct