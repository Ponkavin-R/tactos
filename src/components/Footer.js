import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 border-t border-gray-700">
      {/* Main Footer Content: hidden on small screens */}
      <div className="hidden md:block max-w-5xl mx-auto px-4 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Brand Section */}
          <div className="text-center md:text-left space-y-2">
            <img
              src="/l1.png"
              alt="TACTOS Logo"
              className="h-8 w-auto mx-auto md:mx-0"
            />
            <p className="text-sm text-gray-400 max-w-xs mx-auto md:mx-0">
              TACTOS is a leading provider of innovative solutions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-base font-semibold text-white mb-2">Navigation</h3>
            <ul className="space-y-1 text-sm">
              <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link to="/solutions" className="hover:text-blue-400">Solutions</Link></li>
              <li><Link to="/startup-reg" className="hover:text-blue-400">Startup Registration</Link></li>
              <li><Link to="/cofounder-reg" className="hover:text-blue-400">Cofounder Registration</Link></li>
              <li><Link to="/events" className="hover:text-blue-400">Events</Link></li>
              <li><Link to="/business-idea-hub" className="hover:text-blue-400">Business Idea Hub</Link></li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="text-base font-semibold text-white mb-2">More</h3>
            <ul className="space-y-1 text-sm">
              <li><Link to="/cofounder-reg" className="hover:text-blue-400">Cofounder</Link></li>
              <li><Link to="/events" className="hover:text-blue-400">Events</Link></li>
              <li><Link to="/business-idea-hub" className="hover:text-blue-400">Ideas</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-sm space-y-1 text-center md:text-left">
            <h3 className="text-base font-semibold text-white mb-2">Contact</h3>
            <p>📍 Tamil Nadu</p>
            <p>📞 +91 9999999999</p>
            <p>📧 XYZ@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Footer Bottom - always visible */}
      <div className="text-center text-xs mt-4 text-gray-400 border-t border-gray-700 py-3">
        <p>&copy; {new Date().getFullYear()} Tactos. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
