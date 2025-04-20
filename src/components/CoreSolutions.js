import React from "react";
import {
  Code,
  Smartphone,
  Megaphone,
  Settings,
  Briefcase,
  Workflow,
} from "lucide-react";
import { motion } from "framer-motion";

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      type: "spring",
    },
  }),
};

const Corevalues = () => {
  return (
    <div className="text-center py-10 px-3 md:px-6 lg:px-10 bg-[#f8f9fa] mb-20">
      {/* Feature Cards */}
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="relative group w-full max-w-xs mx-auto"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
          >
            {/* Image Container */}
            {feature.animated ? (
              <motion.div
                className="w-full h-48 rounded-lg shadow-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-pulse"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <div className="w-full h-48 rounded-lg overflow-hidden shadow-lg transform group-hover:scale-105 transition duration-300 ease-in-out animate-[bounce_10s_infinite]">
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            {/* Floating Card */}
            <div
              className={`absolute left-1/2 -bottom-14 transform -translate-x-1/2 w-[90%] rounded-lg shadow-lg p-4 z-20 transition-all duration-300 ease-in-out
              ${
                feature.backgroundColor === "dark"
                  ? "bg-[#163560] text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              {/* Icon */}
              <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center bg-yellow-100 rounded-full shadow">
                {feature.icon && (
                  <feature.icon className="w-5 h-5 text-yellow-500" />
                )}
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold mb-1 text-yellow-500">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm leading-snug">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Features Data
const features = [
  {
    imageUrl:
      "https://img.freepik.com/free-photo/programming-background-collage_23-2149901777.jpg?ga=GA1.1.478944376.1741702639&semt=ais_hybrid&w=740",
    icon: Code,
    title: "Web Development",
    description:
      "We build responsive, high-performance websites that deliver great user experiences and support your business goals.",
    backgroundColor: "dark",
  },
  {
    imageUrl:
      "https://img.freepik.com/free-photo/representation-user-experience-interface-design_23-2150169839.jpg?ga=GA1.1.478944376.1741702639&semt=ais_hybrid&w=740",
    icon: Smartphone,
    title: "App Development",
    description:
      "Get seamless mobile applications for Android and iOS designed for performance, scalability, and user engagement.",
    backgroundColor: "light",
  },
  {
    imageUrl:
      "https://img.freepik.com/free-photo/social-media-marketing-concept-marketing-with-applications_23-2150063134.jpg?ga=GA1.1.478944376.1741702639&semt=ais_hybrid&w=740",
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Promote your brand and grow your audience with results-driven digital strategies including SEO, PPC, and social media.",
    backgroundColor: "dark",
  },
  {
    imageUrl:
      "https://img.freepik.com/free-photo/human-robot-interaction-digital-world_23-2151966708.jpg?ga=GA1.1.478944376.1741702639&semt=ais_hybrid&w=740",
    icon: Settings,
    title: "Automation",
    description:
      "Automate repetitive processes and tasks to save time, reduce human error, and boost operational efficiency.",
    backgroundColor: "light",
  },
  {
    imageUrl:
      "https://img.freepik.com/free-photo/standard-quality-control-collage-concept_23-2149595847.jpg?ga=GA1.1.478944376.1741702639&semt=ais_hybrid&w=740",
    icon: Briefcase,
    title: "AI Solution",
    description:
      "Custom AI solutions crafted to empower startups and enterprises in achieving their goals, optimizing operations, and scaling intelligently.",
    backgroundColor: "dark",
  },
  {
    imageUrl:
      "https://aws.vedmarg.com/wp-content/uploads/2022/08/erp-modules-benefits-features.png",
    icon: Workflow,
    title: "ERP Solution",
    description:
      "Tactos offers tailored ERP solutions to unify your business operations. Streamline finance, HR, inventory, and more—all in one platform.",
    backgroundColor: "dark",
  },
];

export default Corevalues;
