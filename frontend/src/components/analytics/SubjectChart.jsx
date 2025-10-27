import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LabelList } from 'recharts';

const SubjectChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
      <XAxis dataKey="subject" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="accuracy" fill="#0ea5e9" barSize={30}>
        <LabelList dataKey="accuracy" position="top" formatter={(val) => `${val}%`} />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export default SubjectChart;
