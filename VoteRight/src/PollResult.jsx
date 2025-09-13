import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import apiClient from './apiclient';

ChartJS.register(ArcElement, Tooltip, Legend);

const PollResult = () => {
  const [pollData, setPollData] = useState(null);
  const [polls, setPolls] = useState([]);
  const [selectedPollId, setSelectedPollId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await apiClient.get('/polls');
      const pollsData = response.data;
      setPolls(pollsData);
      
      // Auto-select first poll if available
      if (pollsData.length > 0) {
        setSelectedPollId(pollsData[0]._id);
        await fetchPollResults(pollsData[0]._id);
      }
    } catch (error) {
      console.error('Error fetching polls:', error);
      alert('Error loading polls. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPollResults = async (pollId) => {
    if (!pollId) return;

    try {
      const response = await apiClient.get(`/polls/${pollId}/results`);
      setPollData(response.data);
    } catch (error) {
      console.error('Error fetching poll results:', error);
      alert('Error loading poll results. Please try again later.');
    }
  };

  const handlePollChange = (e) => {
    const pollId = e.target.value;
    setSelectedPollId(pollId);
    fetchPollResults(pollId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white p-4">
        <div className="text-lg">Loading poll results...</div>
      </div>
    );
  }

  if (polls.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Poll Results</h2>
          <p className="text-gray-600">No polls available at the moment.</p>
        </div>
      </div>
    );
  }

  const data = pollData ? {
    labels: pollData.results.map(result => result.option),
    datasets: [
      {
        label: 'Vote Count',
        data: pollData.results.map(result => result.votes),
        backgroundColor: ['#3b82f6', '#60a5fa', '#93c5fd', '#bae6fd', '#dbeafe', '#eff6ff'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  } : null;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const result = pollData.results[context.dataIndex];
            return `${result.option}: ${result.votes} votes (${result.percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Poll Results</h2>
        
        {/* Poll Selector */}
        {polls.length > 1 && (
          <div className="w-full mb-4">
            <select
              value={selectedPollId}
              onChange={handlePollChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {polls.map(poll => (
                <option key={poll._id} value={poll._id}>
                  {poll.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {pollData && (
          <>
            <h3 className="text-lg font-semibold mb-2 text-center">{pollData.title}</h3>
            <p className="text-sm text-gray-600 mb-4">Total Votes: {pollData.totalVotes}</p>
            
            <div className="w-full h-64 md:h-80">
              <Pie data={data} options={options} />
            </div>

            {/* Results Summary */}
            <div className="w-full mt-4 space-y-2">
              {pollData.results.map((result, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm font-medium">{result.option}</span>
                  <span className="text-sm text-gray-600">{result.votes} votes ({result.percentage}%)</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PollResult;