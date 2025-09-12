import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserPollPage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const handleVote = async () => {
    if (!selectedOption) {
      alert("Please select an option!");
      return;
    }

    // Simulate API call to store vote in database
    try {
      // Replace this with your actual API call
      // Example:
      // await fetch("/api/vote", { method: "POST", body: JSON.stringify({ option: selectedOption }) });

      // Simulate success
      // If API call is successful, navigate to VoteSuccessPage
      navigate("/vote-success");
    } catch (error) {
      alert("There was an error submitting your vote. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="flex flex-col items-center">
        {/* Page Heading */}
        <h2 className="text-lg font-semibold text-gray-700 mb-6 text-center">
          Poll Page
        </h2>

        {/* Poll Card */}
        <div className="bg-white rounded-2xl shadow-lg w-[400px] p-6">
          {/* Poll Title */}
          <div className="bg-blue-400 text-center text-lg font-bold py-2 rounded-xl mb-4 text-white">
            Poll Title
          </div>

          {/* Poll Question */}
          <h3 className="text-md font-semibold mb-4 text-center">
            1. Question and the Description
          </h3>

          {/* Poll Options */}
          <div className="space-y-3">
            {["Option 1", "Option 2", "Option 3", "Option 4"].map(
              (option, idx) => (
                <label
                  key={idx}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="poll"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => setSelectedOption(option)}
                    className="form-radio text-blue-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              )
            )}
          </div>
        </div>

        {/* Vote Button */}
        <button
          onClick={handleVote}
          className="mt-6 px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full shadow-md"
        >
          Vote
        </button>
      </div>
    </div>
  );
};

export default UserPollPage;