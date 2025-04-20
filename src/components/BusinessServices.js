import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Business Ideation Hub",
    description:
      "Transform your ideas into scalable business models with expert guidance, research tools, and creative brainstorming sessions.",
    image:
      "https://images.unsplash.com/photo-1581090700227-1b9db9cfd9a2?auto=format&fit=crop&w=1000&q=80",
    route: "/business-idea-hub",
  },
  {
    title: "Business Consultation",
    description:
      "Get expert advice and strategies to enhance your operations, optimize performance, and scale your business effectively.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80",
    route: "/business-consultation",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      type: "spring",
    },
  }),
};

const BusinessServices = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-transparent py-8 px-4 sm:px-6 md:px-12 lg:px-20">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-950 mb-12">
        Explore Our Expert Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="relative h-48 sm:h-56 w-full overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>

            <div className="p-6 sm:p-7">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                {service.description}
              </p>
              <button
                onClick={() => navigate(service.route)}
                className="inline-block bg-blue-600 text-white text-sm font-medium py-2 px-5 rounded-full hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BusinessServices;
