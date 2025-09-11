// AdminDashboard.jsx
import React, { useState } from 'react';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 relative overflow-hidden">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-10"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-20 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">Menu</h2>
          <ul className="space-y-4">
            <li><a href="#" className="hover:underline">Dashboard</a></li>
            <li><a href="#" className="hover:underline">Polls</a></li>
            <li><a href="#" className="hover:underline">Users</a></li>
            <li><a href="#" className="hover:underline">Settings</a></li>
          </ul>
        </div>
      </div>

      {/* Mobile Dashboard */}
      <div className="w-[375px] h-[667px] bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg flex flex-col px-4 py-6 text-black relative z-0">
        
        {/* Header - with margin from top */}
        <div className="flex justify-between items-center mt-4 mb-6">
          <h1 className="text-4xl font-bold">Admin Page</h1>
          <button
            className="text-3xl"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            &#9776;
          </button>
        </div>

        {/* Centered Cards */}
        <div className="flex-grow flex flex-col items-center justify-center space-y-6">
          {/* Poll Participation */}
          <div className="bg-white border border-blue-400 rounded-md shadow-md w-full py-4 px-6 max-w-xs">
            <h2 className="text-lg font-semibold mb-1">Poll Participation</h2>
            <p className="text-3xl font-medium">1,346</p>
            <p className="text-sm text-gray-500 mt-1">since last week</p>
          </div>

          {/* User Activity */}
          <div className="bg-white rounded-md shadow-md w-full py-4 px-6 max-w-xs">
            <h2 className="text-lg font-semibold mb-1">User Activity</h2>
            <p className="text-3xl font-medium">134</p>
          </div>
        </div>

        {/* Help Link */}
        <div className="pt-4 text-right">
          <a href="#" className="text-sm text-gray-500 hover:underline"></a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
