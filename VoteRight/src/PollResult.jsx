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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Poll Results</h2>
        <div className="w-full h-64 md:h-80">
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PollResult;