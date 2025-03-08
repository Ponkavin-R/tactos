import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 border-t-2 border-gray-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="space-y-3 text-center sm:text-left">
            <img src="/l1.png" alt="TACTOS Logo" className="h-20 w-fit mx-auto sm:mx-0" />
            <p className="text-sm text-gray-400 max-w-xs mx-auto sm:mx-0">
              TACTOS is a leading provider of innovative solutions.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-all">Home</Link></li>
              <li><Link to="/solutions" className="hover:text-blue-400 transition-all">Solutions</Link></li>
              <li><Link to="/startup-reg" className="hover:text-blue-400 transition-all">Startup Registration</Link></li>
              <li><Link to="/cofounder-reg" className="hover:text-blue-400 transition-all">Cofounder Registration</Link></li>
              <li><Link to="/events" className="hover:text-blue-400 transition-all">Events</Link></li>
              <li><Link to="/business-idea-hub" className="hover:text-blue-400 transition-all">Business Idea Hub</Link></li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li className="cursor-pointer hover:text-blue-400 transition-all">About Us</li>
              <li className="cursor-pointer hover:text-blue-400 transition-all">Contact Us</li>
              <li className="cursor-pointer hover:text-blue-400 transition-all">FAQs</li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Our Companies</h3>
            <ul className="space-y-2 text-sm">
              <li className="cursor-pointer hover:text-blue-400 transition-all">Company 1</li>
              <li className="cursor-pointer hover:text-blue-400 transition-all">Company 2</li>
            </ul>
          </div>
        </div>

        {/* Bottom Address and Contact Section */}
        <div className="mt-8 text-center sm:text-left text-sm text-gray-400 space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2">
          <p>📍 Tamil Nadu</p>
          <p>📞 +91 9999999999</p>
          <p>📧 XYZ@gmail.com</p>
        </div>

        {/* Footer Bottom Text */}
        <div className="mt-6 text-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Tactos. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;