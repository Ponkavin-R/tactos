import { motion } from "framer-motion";
import { FiDollarSign } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import cash from "../assest/rupee.png";
export default function HeroSection() {
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div 
      ref={containerRef}
      className=" bg-gradient-to-br from-white via-blue-50 to-white flex items-center justify-center p-4 py-9  relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 text-center lg:text-left"
        >
          <motion.h1 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.5 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-blue-950 mb-6 leading-tight"
          >
            Invest in Startups
            <span className="block mt-2 text-yellow-500">
              Fuel the Next Generation of Innovation
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.5 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-700 mb-8 max-w-xl mx-auto tracking-wider"
          >
            At TACTOS, we connect purpose-driven investors with high-potential startups led by passionate founders. Our ecosystem ensures transparency, due diligence, and continuous support.
            <br /><br />
            We believe in more than funding — we build relationships. By investing through TACTOS, you become part of a trusted community that nurtures bold ideas and sustainable ventures from the ground up in your own locality.
          </motion.p>
          <Link to="/startups">

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ amount: 0.5 }}
            transition={{ delay: 0.6 }}
            className="bg-yellow-400 text-blue-950 px-6 py-2 rounded-lg border border-yellow-300 hover:bg-yellow-300 transition"
          >
           
            Invest
          </motion.button>
          </Link>
        </motion.div>

        {/* Illustration Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 relative"
        >
          <div className="relative max-w-md mx-auto">
            {/* Startup Orbit Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* First Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                className="absolute w-80 h-80 rounded-full border border-blue-300/40"
                style={{ transform: 'rotateX(60deg)' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-0 left-1/2 -ml-3 w-6 h-6 bg-yellow-400 rounded-full shadow-lg"
                />
              </motion.div>

              {/* Second Ring */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
                className="absolute w-72 h-72 rounded-full border border-yellow-300/30"
                style={{ transform: 'rotateY(60deg)' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-0 left-1/2 -ml-3 w-6 h-6 bg-yellow-300 rounded-full shadow-md"
                />
              </motion.div>

              {/* Third Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
                className="absolute w-64 h-64 rounded-full border border-orange-300/20"
                style={{ transform: 'rotateZ(30deg) rotateY(30deg)' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ delay: 0.6 }}
                  className="absolute top-1/4 right-0 w-6 h-6 bg-orange-400 rounded-full shadow"
                />
              </motion.div>
            </div>

            {/* Main Circle */}
            <Link to="/startups">
      <motion.div
        className="w-60 h-60 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mx-auto shadow-lg relative z-10 mb-10 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        {/* Rotating Border */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-white/10"
        />

        {/* Dollar Icon Image or "Invest" Text */}
{hovered ? (
  <span className="text-white text-2xl font-semibold duration-300">Invest</span>
) : (
  <img
    src={cash}
    alt="Dollar Icon"
    className="w-20 h-20 object-contain transition-transform duration-300"
  />
)}


        {/* Blurred glow circle */}
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ amount: 0.5 }}
          transition={{ delay: 0.2 }}
          className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-200 rounded-full blur-md"
        />
      </motion.div>
    </Link>


            {/* Decorative dots */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ amount: 0.5 }}
              transition={{ delay: 0.3 }}
              className="absolute top-0 -left-0 w-4 h-4 bg-blue-300 rounded-full"
            />
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ amount: 0.5 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-20 -right-8 w-4 h-4 bg-orange-300 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
