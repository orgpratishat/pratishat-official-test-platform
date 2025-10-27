// src/components/analytics/ChapterChart.jsx

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const ChapterChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="label" interval={0} angle={-30} textAnchor="end" height={60} />
      <YAxis />
      <Tooltip formatter={(value) => `${value}%`} />
      <Legend />
      <Bar dataKey="value" name="Accuracy %" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

export default ChapterChart;
