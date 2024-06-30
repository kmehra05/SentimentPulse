import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';

const CustomLineChart = ({ data }) => {
  const formattedData = data.map(item => ({
    "Sentiment Score": item.sentimentStats,
    "Date/Time": moment(item.dateTime).format('MM/DD/YYYY hh:mm'),
  }));

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Sentiment History</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={800}
          height={400}
          data={formattedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date/Time" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Sentiment Score" stroke="#8884d8" activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
