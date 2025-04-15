import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaUserFriends, FaHeartbeat, FaCalendarCheck } from "react-icons/fa";
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
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content Section */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className="space-y-8"
            ref={ref}
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Empowering <span className="block text-indigo-600 mt-2">Tier 3 Students & Businesses</span>
              </h1>
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg text-gray-700">
              At Tactos Strategic Solutions, we empower Tier 3 students and businesses with strategic insights and innovative solutions that fuel long-term growth. From ideation to exit, we mentor students and guide enterprises through every stage of their journey.
            </motion.p>

            <motion.ul variants={itemVariants} className="space-y-6">
              {/* Feature 1 */}
              <motion.li variants={featureVariants} className="flex items-start gap-4">
                <div className="p-3 bg-indigo-600 rounded-lg text-white">
                  <FaUserFriends className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-indigo-600 mb-2">Tailored Mentorship</h3>
                  <p className="text-gray-700">
                    We provide Tier 3 students with the exposure and skills to become successful entrepreneurs, from ideation to exit.
                  </p>
                </div>
              </motion.li>

              {/* Feature 2 */}
              <motion.li variants={featureVariants} className="flex items-start gap-4">
                <div className="p-3 bg-indigo-600 rounded-lg text-white">
                  <FaHeartbeat className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-indigo-600 mb-2">Strategic Guidance</h3>
                  <p className="text-gray-700">
                    Whether you’re a startup or an enterprise, we help you navigate business challenges with data-driven strategies.
                  </p>
                </div>
              </motion.li>
            </motion.ul>

            {/* Single "Get Started" Button */}
            <motion.div variants={itemVariants} className="mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition hover:bg-indigo-700"
              >
                Get Started
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative h-96 rounded-2xl shadow-xl overflow-hidden"
          >
            <img
              src={Logo}
              alt="Business strategy meeting"
              className="w-full h-full object-cover"
            />

            {/* Floating Badge */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-md border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-md text-green-600">
                  <FaCalendarCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Business Ready</p>
                  <p className="text-xs text-gray-600">Future-Proof Strategies</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
