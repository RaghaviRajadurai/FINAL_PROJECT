import React from 'react';

const Home = () => {
  return (
    <div className="h-screen w-screen bg-gradient-to-b from-blue-200 to-white flex flex-col items-center justify-center">
      
      {/* Title Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-black">VoteRight</h1>
        <p className="text-md text-gray-700 mt-1">Secure Opinion Poll Platform</p>
      </div>

      {/* Vertical Buttons Section */}
      <div className="flex flex-col items-center space-y-4">
        <button className="w-64 py-3 bg-blue-600 text-white text-lg rounded-md shadow-md hover:bg-blue-700 transition">
          User Login
        </button>
        <button className="w-64 py-3 bg-blue-600 text-white text-lg rounded-md shadow-md hover:bg-blue-700 transition">
          Admin Login
        </button>
        <button className="w-64 py-3 bg-blue-600 text-white text-lg rounded-md shadow-md hover:bg-blue-700 transition">
          View Poll Result
        </button>
      </div>
      
    </div>
  );
};

export default Home;
