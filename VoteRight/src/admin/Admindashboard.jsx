import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 relative overflow-hidden">
      
      {/* Sidebar */}
      <div
        className={`absolute top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-20 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <ul className="space-y-4">
            <li>
              <a href="#" className="hover:underline" onClick={() => navigate('/admin-dashboard')}>
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline" onClick={() => navigate('/create-poll')}>
                Create Poll
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline" onClick={() => navigate('/poll-result')}>
                View Results
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="w-[375px] h-[667px] flex flex-col px-4 py-6 text-black relative z-10">
        
        {/* Header */}  
        <div className="flex justify-between items-center mt-4 mb-6">
          <h1 className="text-4xl font-bold">Admin Page</h1>
          <button
            className="text-3xl"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            &#9776;
          </button>
        </div>

        {/* Cards */}
        <div className="flex-grow flex flex-col items-center justify-center space-y-6 w-full">
          <div className="bg-white border border-blue-400 rounded-md shadow-md w-full py-10 px-6 max-w-xs flex items-center justify-center">
            <p className="text-gray-400 italic">Empty</p>
          </div>

          <div className="bg-white rounded-md shadow-md w-full py-10 px-6 max-w-xs flex items-center justify-center">
            <p className="text-gray-400 italic">Empty</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;