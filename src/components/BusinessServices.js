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
    <div className="min-h-screen bg-transparent py-6 px-6 md:px-20">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-16">
        Explore Our Expert Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {services.map((service, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative h-60 w-full overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <button
                onClick={() => navigate(service.route)}
                className="inline-block bg-blue-600 text-white font-medium py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
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
