import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen bg-gradient-to-b from-blue-200 to-white flex flex-col items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl px-12 py-10 flex flex-col items-center w-[400px]">
        {/* Title Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-black">VoteRight</h1>
          <p className="text-md text-gray-700 mt-1">Secure Opinion Poll Platform</p>
        </div>

        {/* Vertical Buttons Section */}
        <div className="flex flex-col items-center space-y-4 w-full">
          <button
            className="w-full py-3 bg-blue-400 text-white text-lg rounded-md shadow-md hover:bg-blue-700 transition"
            onClick={() => navigate('/login?type=user')}
          >
            User Login
          </button>
          <button
            className="w-full py-3 bg-blue-400 text-white text-lg rounded-md shadow-md hover:bg-blue-700 transition"
            onClick={() => navigate('/login?type=admin')}
          >
            Admin Login
          </button>
          <button
            className="w-full py-3 bg-blue-400 text-white text-lg rounded-md shadow-md hover:bg-blue-700 transition"
            onClick={() => navigate('/poll-result')}
          >
            View Poll Result
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;