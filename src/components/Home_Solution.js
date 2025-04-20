import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaUserFriends, FaHeartbeat } from "react-icons/fa";
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
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-snug">
                Empowering{" "}
                <span className="block text-indigo-600 mt-1">
                  Tier 3 Students & Businesses
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base text-gray-700 leading-relaxed"
            >
              At Tactos Strategic Solutions, we empower Tier 3 students and businesses with strategic insights and innovative solutions that fuel long-term growth. From ideation to exit, we mentor students and guide enterprises through every stage of their journey.
            </motion.p>

            <motion.ul variants={itemVariants} className="space-y-6">
              {/* Feature 1 */}
              <motion.li
                variants={featureVariants}
                className="flex items-start gap-4"
              >
                <div className="p-3 bg-indigo-600 rounded-lg text-white">
                  <FaUserFriends className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-indigo-600 mb-1">
                    Tailored Mentorship
                  </h3>
                  <p className="text-sm text-gray-700 leading-snug">
                    We provide Tier 3 students with the exposure and skills to become successful entrepreneurs, from ideation to exit.
                  </p>
                </div>
              </motion.li>

              {/* Feature 2 */}
              <motion.li
                variants={featureVariants}
                className="flex items-start gap-4"
              >
                <div className="p-3 bg-indigo-600 rounded-lg text-white">
                  <FaHeartbeat className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-indigo-600 mb-1">
                    Strategic Guidance
                  </h3>
                  <p className="text-sm text-gray-700 leading-snug">
                    Whether you’re a startup or an enterprise, we help you navigate business challenges with data-driven strategies.
                  </p>
                </div>
              </motion.li>
            </motion.ul>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative h-80 sm:h-96 rounded-2xl shadow-xl overflow-hidden"
          >
            <img
              src={Logo}
              alt="Business strategy meeting"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
