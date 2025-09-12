import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";

export default function UserLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get the 'type' query parameter
  const params = new URLSearchParams(location.search);
  const type = params.get("type") || "user";
  const isAdmin = type === "admin";

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdmin) {
      navigate("/admin-dashboard");
    } else {
      navigate("/user-poll");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-200 to-sky-100">
      <div className="w-[320px] p-6 rounded-2xl bg-white/100 backdrop-blur-md shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-8">
          {isAdmin ? "Admin Login" : "User Login"}
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label className="block text-left mb-1 font-medium">
              {isAdmin ? "Admin Email" : "Email"}
            </label>
            <input
              type="email"
              placeholder={isAdmin ? "admin@domain.com" : "example@gmail.com"}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* Password Field with Eye Icon */}
          <div>
            <label className="block text-left mb-1 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 transition"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center mt-6">
          <Link
            to={isAdmin ? "/admin-register" : "/register"}
            className="text-black underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}