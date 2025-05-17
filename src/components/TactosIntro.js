import React from "react";
import { motion } from "framer-motion";
import tactosImage from "../assest/l2.svg";
import tactoscur from "../assest/l2.png";
import "../styles/AboutUs.css";
import "../styles/RainEffect.css";


const AboutUs = () => {
  const cursorStyle = {
    cursor: `url(${tactoscur}) 16 16, auto`,
  };
  
  
  return (
    <div
      className="aboutus-container relative w-full min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-800 flex items-center justify-center px-6 overflow-hidden"
      style={{ height: "100vh", ...cursorStyle }}
      // The 16 16 sets the cursor hotspot at the center of a 32x32 cursor image.
    >
      {/* Background Glow Layer */}
      <div className="glow-background absolute inset-0 z-0 pointer-events-none" />

      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 flex flex-col md:flex-row items-center bg-white backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 max-w-6xl w-full border border-gray-200"
      >
        {/* 3D Rotating Image Container */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 flex justify-center items-center mb-10 md:mb-0 md:mr-10"
        >
          <div className="image-3d-container">
            <div className="image-3d-inner">
              <img
                src={tactosImage}
                alt="TACTOS Logo"
                className="image-3d-face"
              />
            </div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-left w-full md:w-1/2"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide animated-gradient-text">
            TACTOS
          </h1>
          <p className="text-base text-gray-700 mb-4 leading-relaxed">
            Is a startup ecosystem builder, creating a safe, supportive, and scalable environment for entrepreneurs and student founders.
          </p>
          <p className="text-base text-gray-700 mb-4 leading-relaxed">
            Our mission is to empower innovators with the right mentorship, access to funding networks, and essential growth resources — while actively safeguarding them from scams and misleading deals.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            We’re building a trustworthy, founder-first ecosystem where startups grow with confidence, clarity, and a strong sense of community.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
