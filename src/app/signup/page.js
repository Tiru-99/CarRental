"use client";

import { useState } from "react";
import { registerUser } from '../../utils/appwriteAuth'


const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(""); // To display success/error messages

  // Update state when form inputs change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  
  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
  
    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setMessage("All fields are required!");
      return;
    }

    try {
        // Call the registerUser function with form data
        const result = await registerUser(
          formData.username,
          formData.email,
          formData.password
        );

        if (result.success) {
          // Display success message
          setFormData({ username: "", email: "", password: "" }); 
          alert("Account Created Successfully");
          window.location.href('/signin')

        } else {
          setMessage(result.message); // Display error message from API
        }
      } catch (error) {
        console.error("Error during registration:", error);
        setMessage("An unexpected error occurred.");
      }

   
    console.log("Sign Up Data Submitted:", formData);

    // Mock successful submission
    setMessage("Account created successfully!");
    setFormData({ username: "", email: "", password: "" }); // Clear the form
  };

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="hidden md:flex w-2/3 bg-gray-800 relative">
        <img
          src="/images/car1.jpg" // Replace with your desired image URL
          alt="Car Background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute bottom-10 left-10 max-w-lg text-white">
          <h1 className="text-5xl font-bold">Keep Track of your Cars in One Place</h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <img
              src="https://via.placeholder.com/150x50" // Replace with your logo URL
              alt="Autobreeze Logo"
              className="mx-auto mb-4"
            />
            <h2 className="text-2xl text-left font-semibold">Sign Up</h2>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@gmail.com"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="********"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Account
            </button>
          </form>

          {/* Display Success/Error Message */}
          {message && (
            <p className="mt-4 text-center text-sm text-red-500">{message}</p>
          )}

          <div className="mt-4 text-center">
            <p>
              Already a User?{" "}
              <a href="/signin" className="text-blue-500 hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
