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
      className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 sm:p-6 flex flex-col items-center text-center group hover:bg-blue-900 hover:text-white"
    >
      <div className="text-blue-700 text-3xl mb-3 group-hover:text-white transition duration-300">
        {service.logo}
      </div>
      <h3 className="text-base font-semibold mb-2">{service.name}</h3>
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
      description: "Responsive, high-performance websites tailored for impact.",
      logo: <FaLaptopCode />,
    },
    {
      name: "App Development",
      description: "Smooth, scalable mobile apps for Android & iOS",
      logo: <FaMobileAlt />,
    },
    {
      name: "Digital Marketing",
      description: "Boost visibility and engagement across digital platforms with smart solutions",
      logo: <FaBullhorn />,
    },
    {
      name: "Automation",
      description: "Streamline operations with smart automated workflows ",
      logo: <FaRobot />,
    },
    {
      name: "AI Solution",
      description:
        "Intelligent solutions to enhance business growth",
      logo: <FaBriefcase />,
    },
    {
      name: "ERP Solution",
      description:
        "Integrated systems to manage teams and growth efficiently.",
      logo: <FaProjectDiagram />,
    },
  ];

  return (
    <section className="px-4 sm:px-8 md:px-12 lg:px-20 py-10 bg-gradient-to-br from-white to-blue-50">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-3xl lg:text-4xl font-bold text-center mb-10 text-blue-950"
      >
        Our IT Solutions
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Services;
