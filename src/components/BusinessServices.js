import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Business Ideation Hub",
    description:
      "Want to be an entrepreneur but don’t know where to start? No idea to execute? Don’t worry! We provide you with ideas, and the right guidance to help you turn your entrepreneurial dreams into reality.",
    image:
      "https://steelcase-res.cloudinary.com/image/upload/c_fill,q_auto,f_auto,h_600,w_1200/v1488662618/www.steelcase.com/2017/03/04/Ideation-Hub_17-0079005.jpg",
    route: "/business-idea-hub",
  },
  {
    title: "Business Consultation",
    description:
      "Unlock the full potential of your business with personalized insights and strategic guidance. Our expert consultants work closely with you to understand your unique needs, refine your business strategies, and drive maximum ROI in today’s market.",
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
    <div className="min-h-fit bg-transparent py-12 px-4 sm:px-6 md:px-12 lg:px-20">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-950 mb-12">
      Explore Our Services 
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
