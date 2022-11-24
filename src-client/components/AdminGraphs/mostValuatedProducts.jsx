import React from 'react'
import {ResponsiveContainer, Bar, XAxis, YAxis, Line, Tooltip, CartesianGrid, ComposedChart, Legend, BarChart} from 'recharts'
import { Products } from './mostValuated'

 export const MostValuatedProducts = () => {
  
  return (
    <>
    <ResponsiveContainer height='100%' width={500}>
      <BarChart data={Products}>
        <XAxis dataKey='name' gap={50} />
        <YAxis domain={[1, 5]}/>
        <Tooltip />
        <Legend />
        <CartesianGrid />
        <Bar type='monotone' dataKey='rating' barSize={50} fill='#3c5473' />
      </BarChart>
    </ResponsiveContainer>
    </>
  )
}
