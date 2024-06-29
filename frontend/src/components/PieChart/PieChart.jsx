import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ positive, neutral, negative }) => {
  const total = positive + neutral + negative;

  const data = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [
          (positive / total) * 100,
          (neutral / total) * 100,
          (negative / total) * 100,
        ],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'], // Colors for the slices
        hoverBackgroundColor: ['#66BB6A', '#FFD54F', '#E57373'], // Colors on hover
      },
    ],
  };

  return (
    <div>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
