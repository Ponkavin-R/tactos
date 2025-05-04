import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Falcon from "../assest/l.png";
const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-white via-blue-50 to-white border-t border-gray-200 shadow-inner">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative rounded-t-3xl px-4 py-4 sm:px-8 text-center"
      >
        {/* Main Footer Content (Hidden on small screens) */}
        <div className="hidden md:block max-w-6xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-gray-800">
            {/* Brand Section */}
            <div className="text-center md:text-left space-y-4">
              <img
                src={Falcon}
                alt="TACTOS Logo"
                className="h-20 w-auto mx-auto md:mx-0"
              />
              <p className="text-sm text-gray-600 max-w-xs mx-auto md:mx-0 leading-relaxed">
                TACTOS is a leading provider of innovative solutions designed to empower startups and entrepreneurs.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3
                className="text-xl font-bold text-black mb-3"
                style={{ textShadow: "0 0 6px rgba(0,0,0,0.2)" }}
              >
                Navigation
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
                <li><Link to="/solutions" className="hover:text-blue-600">Solutions</Link></li>
                <li><Link to="/startup-reg" className="hover:text-blue-600">Startup Registration</Link></li>
                <li><Link to="/cofounder-reg" className="hover:text-blue-600">Cofounder Registration</Link></li>
                <li><Link to="/events" className="hover:text-blue-600">Events</Link></li>
                <li><Link to="/business-idea-hub" className="hover:text-blue-600">Business Idea Hub</Link></li>
              </ul>
            </div>

            {/* More */}
            <div>
              <h3
                className="text-xl font-bold text-black mb-3"
                style={{ textShadow: "0 0 6px rgba(0,0,0,0.2)" }}
              >
                More
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/cofounder-reg" className="hover:text-blue-600">Cofounder</Link></li>
                <li><Link to="/events" className="hover:text-blue-600">Events</Link></li>
                <li><Link to="/business-idea-hub" className="hover:text-blue-600">Ideas</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-sm space-y-2 text-center md:text-left text-gray-600">
              <h3
                className="text-xl font-bold text-black mb-3"
                style={{ textShadow: "0 0 6px rgba(0,0,0,0.2)" }}
              >
                Contact
              </h3>
              <p>Tamil Nadu, India</p>
              <p>+91 9999999999</p>
              <p>contact@tactos.com</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-sm text-gray-500 border-t border-gray-300 mt-8 pt-4">
          <p>&copy; {new Date().getFullYear()} TACTOS. All rights reserved.</p>
        </div>
      </motion.header>
    </footer>
  );
};

export default Footer;
