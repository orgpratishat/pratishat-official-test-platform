import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const Progress = ({ data }) => (
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
      <XAxis dataKey="date" tickFormatter={(d) => new Date(d).toLocaleDateString()} />
      <YAxis />
      <Tooltip labelFormatter={(l) => `Date: ${new Date(l).toLocaleDateString()}`} />
      <Line type="monotone" dataKey="accuracy" stroke="#0ea5e9" strokeWidth={2} dot />
    </LineChart>
  </ResponsiveContainer>
);

export default Progress;
