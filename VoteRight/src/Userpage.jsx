import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "./apiclient";

const UserPollPage = () => {
  const [polls, setPolls] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [votedPolls, setVotedPolls] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await apiClient.get("/polls");
      setPolls(response.data);
    } catch (error) {
      console.error("Error fetching polls:", error);
      alert("Error loading polls. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (pollId, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [pollId]: option
    }));
  };

  const handleVote = async (pollId) => {
    const selectedOption = selectedOptions[pollId];
    
    if (!selectedOption) {
      alert("Please select an option!");
      return;
    }

    if (votedPolls.has(pollId)) {
      alert("You have already voted for this poll!");
      return;
    }

    setSubmitting(true);

    try {
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      
      if (!userData.id) {
        alert("Please login first!");
        navigate("/login?type=user");
        return;
      }

      await apiClient.post(`/polls/${pollId}/vote`, {
        userId: userData.id,
        selectedOption: selectedOption
      });

      // Mark poll as voted
      setVotedPolls(prev => new Set([...prev, pollId]));
      
      // Show success popup
      setShowSuccessPopup(true);
      
      // Hide popup and redirect to home after 2 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate("/home");
      }, 2000);

    } catch (error) {
      const errorMessage = error.response?.data?.error || "Error submitting vote. Please try again.";
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-100">
        <div className="text-lg">Loading polls...</div>
      </div>
    );
  }

  if (polls.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-100">
        <div className="text-center">
          <div className="text-lg mb-4">No polls available at the moment.</div>
          <button
            onClick={() => navigate("/home")}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-100 py-8 px-4">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-gradient-to-b from-sky-200 to-sky-100 bg-opacity-95 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl max-w-sm mx-4">
            <div className="flex justify-center mb-4">
              <svg
                className="w-16 h-16 text-green-500 animate-bounce"
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
            <h2 className="text-xl font-bold text-gray-900 mb-2">Vote Successful!</h2>
            <p className="text-gray-600">Your vote has been recorded successfully.</p>
            <p className="text-sm text-gray-500 mt-2">Redirecting to home...</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate("/home")}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
          <h2 className="text-2xl font-bold text-gray-800">Available Polls</h2>
          <p className="text-gray-600 mt-2">Vote for the polls below</p>
        </div>

        {/* Polls Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {polls.map((poll) => (
            <div key={poll._id} className="bg-white rounded-2xl shadow-lg p-6">
              {/* Poll Title */}
              <div className="bg-blue-400 text-center text-lg font-bold py-3 rounded-xl mb-4 text-white">
                {poll.title}
              </div>

              {/* Poll Description */}
              <h3 className="text-md font-semibold mb-4 text-center text-gray-800">
                {poll.description}
              </h3>

              {/* Poll Options */}
              <div className="space-y-3 mb-6">
                {poll.options.map((option, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 ${
                      votedPolls.has(poll._id) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name={`poll-${poll._id}`}
                      value={option}
                      checked={selectedOptions[poll._id] === option}
                      onChange={() => handleOptionChange(poll._id, option)}
                      className="form-radio text-blue-500"
                      disabled={votedPolls.has(poll._id)}
                    />
                    <span className="text-gray-700 flex-1">{option}</span>
                  </label>
                ))}
              </div>

              {/* Vote Button */}
              <div className="text-center">
                {votedPolls.has(poll._id) ? (
                  <div className="inline-flex items-center px-6 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Voted
                  </div>
                ) : (
                  <button
                    onClick={() => handleVote(poll._id)}
                    disabled={submitting}
                    className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Voting..." : "Vote"}
                  </button>
                )}
              </div>

              {/* Poll Info */}
              <div className="mt-4 text-xs text-gray-500 text-center">
                Created: {new Date(poll.createdAt).toLocaleDateString()} • 
                Total Votes: {poll.votes.length}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPollPage;