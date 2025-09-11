// import React, { useState, useEffect } from "react";

// const UserPollPage = () => {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [poll, setPoll] = useState(null);

//   // Fetch poll data from backend (MongoDB via Express API)
//   useEffect(() => {
//     const fetchPoll = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/polls/latest"); 
//         const data = await response.json();
//         setPoll(data);
//       } catch (error) {
//         console.error("Error fetching poll:", error);
//       }
//     };

//     fetchPoll();
//   }, []);

//   const handleVote = async () => {
//     if (!selectedOption) {
//       alert("Please select an option!");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:5000/api/polls/vote/${poll._id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ option: selectedOption }),
//       });

//       const data = await response.json();
//       alert(data.message || "Vote submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting vote:", error);
//     }
//   };

// //   if (!poll) {
// //     return <div className="text-center mt-10 text-gray-600">Loading Poll...</div>;
// //   }

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-6">
//       <h2 className="text-lg font-semibold text-gray-700 mb-4">User Page</h2>

//       <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-4">
//         <div className="bg-blue-300 text-center text-lg font-bold py-2 rounded-xl mb-4">
//           {poll.title}
//         </div>

//         <h3 className="text-md font-medium mb-4">
//           {poll.question}
//         </h3>

//         <div className="space-y-2">
//           {poll.options.map((option, idx) => (
//             <label key={idx} className="flex items-center space-x-3 cursor-pointer">
//               <input
//                 type="radio"
//                 name="poll"
//                 value={option}
//                 checked={selectedOption === option}
//                 onChange={() => setSelectedOption(option)}
//                 className="form-radio text-blue-500"
//               />
//               <span className="text-gray-700">{option}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       <button
//         onClick={handleVote}
//         className="mt-6 px-6 py-2 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-2xl shadow-md"
//       >
//         Vote
//       </button>
//     </div>
//   );
// };

// export default UserPollPage;
import React, { useState } from "react";

const UserPollPage = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleVote = () => {
    if (!selectedOption) {
      alert("Please select an option!");
    } else {
      alert(`You voted for: ${selectedOption}`);
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
