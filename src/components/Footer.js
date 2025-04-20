import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-4 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Brand Section */}
          <div className="text-center md:text-left space-y-2">
            <img
              src="/l1.png"
              alt="TACTOS Logo"
              className="h-10 w-auto mx-auto md:mx-0"
            />
            <p className="text-sm text-gray-400 max-w-xs mx-auto md:mx-0">
              TACTOS is a leading provider of innovative solutions.
            </p>
          </div>

          {/* Navigation + More (keep together for desktop) */}
          <div className="hidden md:block">
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

          {/* Mobile-only Nav + More split */}
          <div className="flex justify-between md:hidden gap-6">
            {/* Navigation */}
            <div className="w-1/2">
              <h3 className="text-sm font-semibold text-white mb-2">Navigation</h3>
              <ul className="space-y-1 text-xs">
                <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
                <li><Link to="/solutions" className="hover:text-blue-400">Solutions</Link></li>
                <li><Link to="/startup-reg" className="hover:text-blue-400">Startup</Link></li>
              </ul>
            </div>
            {/* More */}
            <div className="w-1/2">
              <h3 className="text-sm font-semibold text-white mb-2">More</h3>
              <ul className="space-y-1 text-xs">
                <li><Link to="/cofounder-reg" className="hover:text-blue-400">Cofounder</Link></li>
                <li><Link to="/events" className="hover:text-blue-400">Events</Link></li>
                <li><Link to="/business-idea-hub" className="hover:text-blue-400">Ideas</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-sm space-y-1 text-center md:text-left">
            <h3 className="text-base font-semibold text-white mb-2">Contact</h3>
            <p>📍 Tamil Nadu</p>
            <p>📞 +91 9999999999</p>
            <p>📧 XYZ@gmail.com</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-4 text-center text-xs text-gray-400 border-t border-gray-700 pt-3">
          <p>&copy; {new Date().getFullYear()} Tactos. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
