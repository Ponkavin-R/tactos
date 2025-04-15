import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-6 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-3 text-center sm:text-left">
            <img
              src="/l1.png"
              alt="TACTOS Logo"
              className="h-14 w-auto mx-auto sm:mx-0"
            />
            <p className="text-sm text-gray-400 max-w-xs mx-auto sm:mx-0">
              TACTOS is a leading provider of innovative solutions.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link to="/solutions" className="hover:text-blue-400">Solutions</Link></li>
              <li><Link to="/startup-reg" className="hover:text-blue-400">Startup Registration</Link></li>
              <li><Link to="/cofounder-reg" className="hover:text-blue-400">Cofounder Registration</Link></li>
              <li><Link to="/events" className="hover:text-blue-400">Events</Link></li>
              <li><Link to="/business-idea-hub" className="hover:text-blue-400">Business Idea Hub</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 text-sm">
            <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
            <p>📍 Tamil Nadu</p>
            <p>📞 +91 9999999999</p>
            <p>📧 XYZ@gmail.com</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 text-center text-xs text-gray-400 border-t border-gray-700 pt-4">
          <p>&copy; {new Date().getFullYear()} Tactos. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
