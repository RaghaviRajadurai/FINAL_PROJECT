// src/components/PollResult.jsx

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PollResult = () => {
  const data = {
    labels: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    datasets: [
      {
        label: 'VoteRight Poll Results',
        data: [40, 30, 20, 10],
        backgroundColor: ['#3b82f6', '#60a5fa', '#93c5fd', '#bae6fd'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="h-64">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PollResult;
