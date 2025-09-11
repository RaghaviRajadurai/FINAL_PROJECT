import React, { useState } from "react";

export default function CreatePoll() {
  const [options, setOptions] = useState(["Option 1", "Option 2"]);
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState("");

  const addOption = () => {
    setOptions([...options, `Option ${options.length + 1}`]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-sky-200 p-6">
      <div className="w-full max-w-sm bg-white/70 rounded-2xl shadow-lg p-6">
        {/* Title */}
        <h2 className="text-xl font-semibold text-center">Create a Poll</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          complete the below fields to create your poll.
        </p>

        {/* Title Input */}
        <label className="block font-medium text-gray-800 mb-1">Title</label>
        <input
          type="text"
          placeholder="Enter poll title"
          className="w-full mb-2 px-3 py-2 rounded-lg bg-sky-100 outline-none focus:ring-2 focus:ring-sky-400"
        />

        {/* Description Toggle */}
        {!showDescription ? (
          <button
            onClick={() => setShowDescription(true)}
            className="text-sm text-gray-600 mb-4 flex items-center hover:text-sky-600"
          >
            <span className="text-lg mr-1">＋</span> Add description 
          </button>
        ) : (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type your description or feedback here..."
            className="w-full mb-4 px-3 py-2 rounded-lg bg-sky-100 outline-none focus:ring-2 focus:ring-sky-400"
            rows="3"
          />
        )}

        {/* Answer Options */}
        <label className="block font-medium text-gray-800 mb-1">
          Answer options
        </label>
        <div className="space-y-2">
          {options.map((opt, i) => (
            <input
              key={i}
              type="text"
              value={opt}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[i] = e.target.value;
                setOptions(newOptions);
              }}
              className="w-full px-3 py-2 rounded-lg bg-sky-100 border border-sky-300 outline-none focus:ring-2 focus:ring-sky-400"
            />
          ))}
        </div>

        <button
          onClick={addOption}
          className="w-full mt-3 flex items-center justify-center px-3 py-2 rounded-lg bg-sky-100 border border-sky-300 text-sky-700 hover:bg-sky-200 transition"
        >
          ＋ Add another option
        </button>

        {/* Voting Security */}
        <label className="block font-medium text-gray-800 mt-6 mb-1">
          Poll Creator
        </label>
        <input
          type="text"
          placeholder="Enter Name"
          className="w-full px-3 py-2 rounded-lg bg-sky-100 outline-none focus:ring-2 focus:ring-sky-400"
        />

        {/* Submit Button */}
        <button className="w-full mt-6 py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-md transition">
          Create
        </button>
      </div>
    </div>
  );
}
