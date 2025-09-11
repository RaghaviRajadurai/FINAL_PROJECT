import React, { useState } from "react";

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">User Registration</h2>

        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium mb-1">Gender</label>
            <input
              type="text"
              placeholder="Enter your gender"
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block font-medium mb-1">Role</label>
            <input
              type="text"
              placeholder="Enter your role"
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          {/* Create Password */}
          <div>
            <label className="block font-medium mb-1">Create Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full border border-gray-300 p-2 rounded-md pr-10"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
              >
                {showPassword ? (
                  // Eye-off icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 
                      0-10-4.477-10-10a9.956 9.956 0 013.172-7.344M9.88 
                      9.88A3 3 0 1112 15a2.99 2.99 0 
                      01-2.12-.88M3 3l18 18" />
                  </svg>
                ) : (
                  // Eye icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 
                      016 0zM2.458 12C3.732 7.943 7.523 5 
                      12 5c4.477 0 8.268 2.943 9.542 7-1.274 
                      4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </span>
            </div>
          </div>

          {/* Re-entry Password */}
          <div>
            <label className="block font-medium mb-1">Re-entry Password</label>
            <div className="relative">
              <input
                type={showRePassword ? "text" : "password"}
                placeholder="Re-enter password"
                className="w-full border border-gray-300 p-2 rounded-md pr-10"
                required
              />
              <span
                onClick={() => setShowRePassword(!showRePassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
              >
                {showRePassword ? (
                  // Eye-off icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 
                      0-10-4.477-10-10a9.956 9.956 0 013.172-7.344M9.88 
                      9.88A3 3 0 1112 15a2.99 2.99 0 
                      01-2.12-.88M3 3l18 18" />
                  </svg>
                ) : (
                  // Eye icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 
                      016 0zM2.458 12C3.732 7.943 7.523 5 
                      12 5c4.477 0 8.268 2.943 9.542 7-1.274 
                      4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </span>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
