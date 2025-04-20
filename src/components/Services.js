import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaBullhorn,
  FaRobot,
  FaBriefcase,
  FaProjectDiagram,
} from "react-icons/fa";

import { useInView } from "react-intersection-observer";

const ServiceCard = ({ service, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });

  const direction = index % 2 === 0 ? -100 : 100;

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0 });
    } else {
      controls.start({ opacity: 0, x: direction });
    }
  }, [controls, inView, direction]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ opacity: 0, x: direction }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center group hover:bg-blue-900 hover:text-white"
    >
      <div className="text-blue-700 text-5xl mb-4 group-hover:text-white transition duration-300">
        {service.logo}
      </div>
      <h3 className="text-lg font-bold mb-3">{service.name}</h3>
      <p className="text-sm text-gray-600 group-hover:text-white transition duration-300">
        {service.description}
      </p>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      name: "Web Development",
      description: "We build responsive, high-performance websites.",
      logo: <FaLaptopCode />,
    },
    {
      name: "App Development",
      description: "Get seamless mobile applications for Android and iOS.",
      logo: <FaMobileAlt />,
    },
    {
      name: "Digital Marketing",
      description: "Promote your brand through digital strategies.",
      logo: <FaBullhorn />,
    },
    {
      name: "Automation",
      description: "Automate processes to save time and resources.",
      logo: <FaRobot />,
    },
    {
      name: "AI Solution",
      description:
        "Custom AI solutions crafted to empower startups and enterprises in achieving their goals, optimizing operations, and scaling intelligently.",
      logo: <FaBriefcase />,
    },
    {
      name: "ERP Solution",
      description:
        "Tactos offers tailored ERP solutions to unify your business operations. Streamline finance, HR, inventory, and more—all in one platform.",
      logo: <FaProjectDiagram />,
    },
  ];

  return (
    <section className="px-4 sm:px-8 md:px-16 lg:px-24 pb-8 bg-gradient-to-br from-white to-blue-50">
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-extrabold text-center mb-14 text-blue-950"
      >
        Our IT Solutions
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Services;
