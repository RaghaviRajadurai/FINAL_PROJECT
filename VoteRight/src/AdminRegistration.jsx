import React, { useState } from 'react';

function AdminRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    mailExtension: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center background-color: lightblue">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center">Admin Registration</h2>

        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Full Name"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block font-semibold mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Role */}
        <div>
          <label className="block font-semibold mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="Select Role">Select Role</option>
            <option>Student</option>
            <option>Employee</option>
            <option>Other</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Email"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block font-semibold mb-1">Create Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Password"
              required
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
            >
              
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block font-semibold mb-1">Re-entry Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Password"
              required
            />

          </div>
        </div>

        {/* Mail Extension */}
        <div>
          <label className="block font-semibold mb-1">Mail Extension</label>
          <input
            type="text"
            name="mailExtension"
            value={formData.mailExtension}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Eg: @info"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default AdminRegistrationForm;
