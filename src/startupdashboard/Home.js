import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, Briefcase } from "lucide-react";
import ApplicationsDashboard from "./ApplicationsDashboard";

const Home = () => {
  const [stats, setStats] = useState({
    fundings: 0,
    jobs: 0,
  });

  const userId = localStorage.getItem("startupId");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/dashboard/${userId}`
        );
        const data = await response.json();
        if (response.ok) {
          setStats(data);
        } else {
          console.error("Error fetching stats:", data.error);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    if (userId) {
      fetchStats();
    }
  }, [userId]);

  const statItems = [
    {
      id: 1,
      title: "Fundings",
      count: stats.fundings,
      icon: <DollarSign className="text-yellow-600 w-8 h-8" />,
      color: "bg-yellow-100",
    },
    {
      id: 2,
      title: "Jobs",
      count: stats.jobs,
      icon: <Briefcase className="text-blue-600 w-8 h-8" />,
      color: "bg-blue-100",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 sm:p-6 w-full max-w-screen-xl mx-auto"
    >
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center sm:text-left">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statItems.map((item) => (
          <motion.div
            key={item.id}
            className={`rounded-xl p-4 sm:p-5 shadow-md ${item.color} flex items-center justify-between w-full transition-all duration-300`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700">
                {item.title}
              </h3>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {item.count}
              </p>
            </div>
            <div className="ml-4 shrink-0">{item.icon}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 w-full">
        <ApplicationsDashboard />
      </div>
    </motion.div>
  );
};

export default Home;
