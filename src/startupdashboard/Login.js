import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import startupSvg from '../assest/sl.svg'; // Your SVG file
import { FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa'; // For social media icons

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
      if (response.ok) {
        // Save startup id to localStorage
        localStorage.setItem('startupId', data.startup.id); // Use data.startup.id
        setSuccess(true);
        setTimeout(() => {
          navigate('/startup-dashboard');
        }, 1500); // Navigate after 1.5s delay for success animation
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-green-100 via-white to-blue-100p-6">
      {/* Container */}
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center space-x-10 space-y-6 md:space-y-0">
        {/* Left: Form */}
        <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full animate__animated animate__fadeInLeft">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>
          <p className="text-gray-600 text-center mb-8">Please login to continue</p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300 mt-4"
            >
              Login
            </button>
          </form>


          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">Don't have an account? <a href="/startup-reg" className="text-blue-600 hover:underline">Sign up</a></p>
          </div>
        </div>

        {/* Right: SVG Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center animate__animated animate__fadeInRight">
          <img src={startupSvg} alt="Startup" className="h-80 w-80 object-contain transform transition-all hover:scale-105" />
        </div>
      </div>

      {/* Success Popup */}
      {success && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 animate__animated animate__fadeIn">
          <div className="bg-white p-6 rounded-lg shadow-2xl text-center">
            <h2 className="text-xl font-semibold mb-4">Login Successful!</h2>
            <p className="text-gray-700 mb-6">Redirecting to your dashboard...</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate('/startup-dashboard')}
                className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
