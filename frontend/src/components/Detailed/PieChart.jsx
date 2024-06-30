import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const CustomPieChart = ({ positive, neutral, negative }) => {
  console.log('PieChart Data:', { positive, neutral, negative });

  const data = [
    { name: 'Positive', value: positive },
    { name: 'Neutral', value: neutral },
    { name: 'Negative', value: negative },
  ];

  const COLORS = ['#4CAF50', '#FFC107', '#F44336'];

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Sentiment Breakdown</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default CustomPieChart;
