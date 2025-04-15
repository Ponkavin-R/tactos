import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Import the hook
import { FaHandsHelping, FaHeartbeat, FaClock, FaUserFriends, FaCalendarCheck } from "react-icons/fa";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 10 }
  }
};

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 150 }
  }
};

export default function Home_Solution() {
  const { ref, inView } = useInView({
    triggerOnce: false, // This will trigger when it enters *and* exits
    threshold: 0.3, // Triggers when 30% of the section is visible
  });

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content Section */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"} // Animate when in view
            variants={containerVariants}
            className="space-y-8"
            ref={ref} // Attach the intersection observer to this element
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                content1
                <span className="block text-primary-blue mt-2">Content heading</span>
              </h1>
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg text-gray-600">
             Test
            </motion.p>

            <motion.ul variants={itemVariants} className="space-y-6">
              {/* Feature 1 */}
              <motion.li variants={featureVariants} className="flex items-start gap-4">
                <div className="p-3 bg-primary-blue rounded-lg text-white">
                  <FaUserFriends className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary-blue mb-2">
                    Trained 
                  </h3>
                  <p className="text-gray-600">
                   test
                  </p>
                </div>
              </motion.li>

              {/* Feature 2 */}
              <motion.li variants={featureVariants} className="flex items-start gap-4">
                <div className="p-3 bg-primary-blue rounded-lg text-white">
                  <FaHeartbeat className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary-blue mb-2">
                    Test
                  </h3>
                  <p className="text-gray-600">
                    Test
                  </p>
                </div>
              </motion.li>
            </motion.ul>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-blue text-white px-6 py-2 rounded-lg border border-transparent hover:border-primary-green hover:bg-white hover:text-primary-green font-semibold text-lg transition items-center"
              >
                Get start
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-blue text-white px-6 py-2 rounded-lg border border-transparent hover:border-primary-green hover:bg-white hover:text-primary-green font-semibold text-lg transition items-center"
              >
               
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }} // "Out-in" effect
            transition={{ duration: 0.8 }}
            className="relative h-96 rounded-2xl shadow-xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1584515933487-779824d29309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Caregiver assisting senior woman"
              className="w-full h-full object-cover"
            />

            {/* Floating Badge */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }} // Badge "out-in" animation
              transition={{ delay: 0.5 }}
              className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-md border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-md text-green-600">
                  <FaCalendarCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Flexible Scheduling</p>
                  <p className="text-xs text-gray-600">24/7 Availability</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}