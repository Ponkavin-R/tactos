import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // for navigation
import startupSvg from '../assest/sl.svg'; // your SVG file

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/startup-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log(data); // Log the entire response to verify its structure
  
      if (response.ok) {
        // ✅ Save startup id to localStorage
        localStorage.setItem('startupId', data.startup.id); // Use data.startup.id
  
        // Then navigate to dashboard
        navigate('/startup-dashboard');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };
    
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Left: Form */}
      <div className="bg-white shadow-lg rounded-2xl p-8 md:w-1/2 w-full animate-slideInLeft">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Continue As a Startup</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
      </div>

      {/* Right: SVG Image */}
      <div className="md:w-1/2 w-full flex justify-center items-center mt-10 md:mt-0 animate-slideInRight">
        <img
          src={startupSvg}
          alt="Startup"
          className="h-80 w-80"
        />
      </div>
    </div>
  );
};

export default Login;
