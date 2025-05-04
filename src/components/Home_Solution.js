import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaUserFriends,
  FaLightbulb,
  FaRocket,
  FaHandshake,
  FaCogs,
  FaMapMarkedAlt,
} from "react-icons/fa";
import Logo from "../assest/l2.svg";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 10 },
  },
};

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 150 },
  },
};
const features = [
  { icon: <FaUserFriends className="w-5 h-5" />, title: "Tailored Mentorship" },
  { icon: <FaLightbulb className="w-5 h-5" />, title: "Strategic Guidance" },
  { icon: <FaRocket className="w-5 h-5" />, title: "Incubation" },
  { icon: <FaHandshake className="w-5 h-5" />, title: "Funding Connects" },
  { icon: <FaCogs className="w-5 h-5" />, title: "Tech Support" },
  { icon: <FaMapMarkedAlt className="w-5 h-5" />, title: "Go to Market" },
];

export default function Home_Solution() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  return (
    <div className="py-14 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content Section */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="space-y-6"
            ref={ref}
          >
          <motion.div variants={itemVariants}>
  <div className=" -ml-4 text-blue-950 text-xl md:text-lg right-2 lg:text-xl font-semibold px-4">
    Special Care for
  </div>
  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900  mb-4 leading-snug">
    Empowering{" "}
    <span className="block text-indigo-600">
      Tier 3 Entrepreneurs
    </span>
  </h1>
</motion.div>


            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-gray-700 leading-relaxed"
            >
            At TACTOS, we empower aspiring entrepreneurs from Tier 3 regions with strategic insights and innovative solutions that drive sustainable growth. From ideation to exit, we provide mentorship and guidance through every stage of their entrepreneurial journey.
            </motion.p>

          
          </motion.div>

          {/* Image Section */}
          <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
    transition={{ duration: 0.8 }}
    className="relative h-80 sm:h-96 rounded-2xl overflow-hidden flex items-center justify-center"
  >
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:mt-8 lg:mt-8"
    >
      {features.map((feature, index) => (
        <motion.li
          key={index}
          variants={featureVariants}
          className="flex items-center gap-2"
        >
          <div className="p-4 bg-indigo-600 rounded-lg text-white">
            {feature.icon}
          </div>
          <div>
            <h3 className="text-base font-semibold text-black whitespace-nowrap">
              {feature.title}
            </h3>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  </motion.div>
        </div>
      </div>
    </div>
  );
}
