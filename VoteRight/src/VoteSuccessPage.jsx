import React from "react";

const VoteSuccessPage = () => {
  return (
    <div className="flex flex-col justify-between items-center min-h-screen bg-blue-200 text-black">
      {/* Top animated tick + success text */}
      <div className="flex-grow flex flex-col items-center justify-center space-y-6">
        {/* Animated Tick */}
        <div className="flex items-center justify-center">
          <svg
            className="w-20 h-20 text-green-500 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-medium text-center px-4">
          Your vote has been successfully added.
        </h1>
      </div>

      {/* Bottom message */}
      <div className="mb-20">
        <p className="text-4xl font bold">Thanks For Voting!!</p>
      </div>
    </div>
  );
};

export default VoteSuccessPage;
