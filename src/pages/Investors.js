import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Investors = () => {
  const [testimonials, setTestimonials] = useState([]);
  const speed = 12;

  const getTypeColor = (type) => {
    const colors = {
      "Our Partner": "bg-blue-500",
      "Our Investor": "bg-green-500",
      "Key Partner": "bg-purple-500",
    };
    return colors[type] || "bg-gray-500";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/ourinvestors`);
        setTestimonials(res.data);
      } catch (err) {
        console.error("Failed to fetch investors:", err);
      }
    };

    fetchData();
  }, []);

  const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className="py-12 bg-gray-100 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 text-center mb-4 sm:mb-6">
          Our Network
        </h2>
        <p className="text-sm sm:text-base text-center text-gray-600 mb-8 sm:mb-12">
          We proudly partner with industry leaders, investors, and key collaborators to drive success and growth.
        </p>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: ["0%", "-120%"] }}
            transition={{ duration: speed, ease: "linear", repeat: Infinity }}
          >
            {marqueeItems.map((item, index) => (
              <div key={`${item.name}-${index}`} className="flex-shrink-0 px-4">
                <div className="w-44 sm:w-48 h-44 sm:h-48 rounded-lg bg-white shadow-md flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-lg transition-shadow">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getTypeColor(
                      item.type
                    )} text-white font-medium mb-2`}
                  >
                    {item.type}
                  </span>
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-3 flex items-center justify-center border-2 border-gray-200">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-center text-sm sm:text-base font-medium text-gray-800">
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Investors;
