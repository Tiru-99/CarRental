"use client";

import { useState } from "react";
import { loginUser } from "../../utils/appwriteAuth"; // Import the loginUser function


const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  
 

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      setMessage("Both email and password are required!");
      return;
    }

    

    try {
      // Call the loginUser function with the email and password
      const result = await loginUser(formData.email, formData.password);

      if (result.success) {
        alert("You have successfully signed in ");
        window.location.href = '/';
        // Redirect to dashboard or another page (e.g., window.location.href = "/dashboard";)
      } else {
        setMessage(result.message); // Display error message from the API
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setMessage("An unexpected error occurred.");
    }
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
        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-3xl font-bold">
            Keep Track of your Cars in One Place
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center md:mr-32">
            <img
              src="/images/logo.png" // Replace with your logo URL
              alt="Autobreeze Logo"
              className="mx-auto mb-4"
            />
            <h2 className="text-2xl font-semibold text-left">Sign In</h2>
          </div>
          <form onSubmit={handleSubmit}>
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
              Sign In
            </button>
          </form>

          {/* Message Section */}
          {message && (
            <div className="mt-4 text-center text-red-500">
              <p>{message}</p>
            </div>
          )}

          {/* Sign-Up Link */}
          <div className="mt-4 text-center">
            <p>
              New Here?{" "}
              <a href="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
