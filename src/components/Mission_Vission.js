import { useState } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

const Mission_Vision = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-12 bg-transparent">
      <div className="max-w-7xl px-4 md:px-6 mx-auto grid lg:grid-cols-2 gap-10 items-center">
        {/* Icon Card Section */}
        <motion.div
          className="flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.3 }}
        >
          <motion.div
            className="flex flex-col items-center text-center bg-white shadow-xl p-6 rounded-2xl hover:shadow-2xl transition max-w-md"
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
          >
            <Eye className="w-14 h-14 text-blue-700 mb-3" />
            <h3 className="text-xl font-semibold text-gray-800">Our Vision</h3>
            <p className="text-sm text-gray-600 mt-2">
              Empowering Tier 2 & Tier 3 cities by creating vibrant startup ecosystems and transforming them into economic hubs.
            </p>
          </motion.div>
        </motion.div>

        {/* Animated Text Section */}
        <motion.div
          className="flex flex-col gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug text-center lg:text-left"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
          >
            Building the Future from the Ground Up
          </motion.h2>

          <motion.p
            className="text-sm md:text-base text-gray-600 text-center lg:text-left"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
          >
            At <strong className="text-blue-700">TACTOS</strong>, we envision a world where every aspiring entrepreneur
            has the tools and opportunities to innovate and succeed — regardless of their location.
            By breaking down barriers and uplifting regional talent, we’re shaping a more inclusive economy.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission_Vision;
