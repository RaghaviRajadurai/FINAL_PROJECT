import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import apiClient from "./apiclient";

export default function UserLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get the 'type' query parameter
  const params = new URLSearchParams(location.search);
  const type = params.get("type") || "user";
  const isAdmin = type === "admin";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiClient.post("/login", {
        email: formData.email,
        password: formData.password
      });

      const { token, user } = response.data;

      // Store token and user data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Check if user role matches expected type
      if (isAdmin && user.role !== "Admin") {
        alert("Access denied. Admin credentials required.");
        return;
      }

      if (!isAdmin && user.role !== "User") {
        alert("Access denied. User credentials required.");
        return;
      }

      // Navigate based on role
      if (user.role === "Admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-poll");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Login failed. Please try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={isAdmin ? "admin@domain.com" : "example@gmail.com"}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          {/* Password Field with Eye Icon */}
          <div>
            <label className="block text-left mb-1 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 pr-10"
                required
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
            disabled={loading}
            className="w-full bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
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