import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen flex flex-col justify-center px-6 lg:px-20 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0">
        
        {/* Left Side: Text Content */}
        <motion.div 
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Tagline */}
          <motion.div 
            className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-1 rounded-full w-fit text-sm mx-auto md:mx-0"
            whileHover={{ scale: 1.1 }}
          >
            <span className="bg-blue-600 text-white px-3 py-0.5 rounded-full text-xs font-semibold">New</span>
            <span>Discover our latest insights →</span>
          </motion.div>

          {/* Heading & Description */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mt-6 leading-tight">
            Empowering <span className="text-blue-600">Students & Businesses</span>
          </h1>
          <p className="text-gray-600 mt-4 text-lg md:w-4/5 mx-auto md:mx-0">
            We provide strategic solutions that help students and businesses grow, innovate, and lead with confidence.
          </p>

          {/* Features */}
          <div className="mt-10 space-y-5">
            <FeatureCard icon="🎯" title="Focused Mentorship" description="Guiding students from idea to execution." />
            <FeatureCard icon="🚀" title="Growth Strategies" description="Helping businesses scale efficiently." />
            <FeatureCard icon="🤝" title="Strategic Partnerships" description="Connecting ideas with opportunities." />
          </div>
        </motion.div>

        {/* Right Side: UI Cards */}
        <motion.div 
          className="md:w-1/2 grid grid-cols-2 gap-6 justify-items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <UICard icon="📈" title="Revenue Growth" data="$48.2K" change="+8.6%" trend="up" />
          <UICard icon="📊" title="Active Users" data="12,584" change="+3.2%" trend="up" />
          <UICard icon="⚙️" title="System Health" data="98% Optimized" change="Stable" trend="neutral" />
          <UICard icon="📅" title="Upcoming Events" data="5 Meetings" change="+2 New" trend="up" />
        </motion.div>
      </div>
    </div>
  );
};

/* Feature Card */
const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="flex space-x-4 items-center p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all bg-white border border-gray-200"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

/* UI Card - iOS Inspired */
const UICard = ({ icon, title, data, change, trend }) => {
  return (
    <motion.div 
      className="w-48 h-48 bg-white rounded-3xl flex flex-col items-center justify-center shadow-lg border border-gray-200 hover:shadow-xl transition-all p-6"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-4xl">{icon}</div>
      <h3 className="text-lg font-semibold mt-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-xl font-bold mt-1">{data}</p>
      <p className={`text-sm mt-1 ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
        {change} {trend === 'up' ? '📈' : trend === 'down' ? '📉' : '⚖️'}
      </p>
    </motion.div>
  );
};

export default HeroSection;
