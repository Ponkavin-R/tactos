import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  { type: "Our Partner", name: "Harsh P.", image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { type: "Our Investor", name: "Jane D.", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { type: "Key Partner", name: "Robert K.", image: "https://randomuser.me/api/portraits/men/45.jpg" },
];

const Investors = () => {
  const speed = 12;
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

  const getTypeColor = (type) => {
    const colors = {
      "Our Partner": "bg-blue-500",
      "Our Investor": "bg-green-500",
      "Key Partner": "bg-purple-500",
    };
    return colors[type] || "bg-gray-500";
  };

  return (
    <div className="py-16 bg-gray-100 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Our Network</h2>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: ["0%", "-120%"] }}
            transition={{ duration: speed, ease: "linear", repeat: Infinity }}
          >
            {marqueeItems.map((item, index) => (
              <div key={`${item.name}-${index}`} className="flex-shrink-0 px-4">
                <div className="w-48 h-48 rounded-lg bg-white shadow-md flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-lg transition-shadow">
                  <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(item.type)} text-white font-medium mb-2`}>
                    {item.type}
                  </span>
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-3 flex items-center justify-center border-2 border-gray-200">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-center font-medium text-gray-800">{item.name}</p>
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
