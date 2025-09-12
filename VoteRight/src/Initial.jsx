import React from "react";
import { useNavigate } from "react-router-dom"; // Add this import

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="w-[450px] rounded-3xl shadow-2xl bg-gradient-to-b from-white to-blue-100 overflow-hidden">
        
        {/* Top Logo Section */}
        <div className="flex flex-col items-center px-8 pt-8">
          <img
            src="\src\assets\Rectangle 22.png" // Replace with your logo path
            alt="VoteRight Logo"
            className="h-28 mb-4"
          />
          <h1 className="text-4xl font-bold text-gray-900">VoteRight</h1>
          <p className="text-gray-700 text-lg">
            Secure Opinion Poll Platform
          </p>
        </div>

        {/* Middle Poll Image */}
        <div className="flex justify-center py-6">
          <img
            src="\src\assets\Ellipse 6.png" // Replace with your poll image path
            alt="Poll Illustration"
            className="h-40 w-40 rounded-full shadow-md"
          />
        </div>

        {/* Features Section */}
        <div className="px-8 space-y-4 text-gray-800 text-base mb-8">
          <p className="flex items-center gap-2">
            ✅ <span>“One Vote, One Voice”</span>
          </p>
          <p className="flex items-center gap-2">
            🔒 <span>“Secure, Fair, and Private Polling”</span>
          </p>
          <p className="flex items-center gap-2">
            🌍 <span>Built for Students, Corporates, and Communities</span>
          </p>
        </div>

        {/* Bottom Arrow Button */}
        <div className="flex justify-end p-6">
          <button className="bg-white text-black w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:bg-gray-800 transition"
           onClick={() => navigate("/home")}>
            ➔

          </button>
        </div>  
      </div>
    </div>
  );
}
