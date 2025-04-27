import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";

const Home = () => {
  const [stats, setStats] = useState({
    fundings: 0,
  });
  const userId = localStorage.getItem('startupId'); // Assuming the userId is saved in localStorage

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/dashboard/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setStats(data);
        } else {
          console.error('Error fetching stats:', data.error);
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
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
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 md:p-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statItems.map((item) => (
          <motion.div
            key={item.id}
            className={`rounded-xl p-5 shadow-md ${item.color} flex items-center justify-between transition-all duration-300`}
            whileHover={{ scale: 1.02 }}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{item.count}</p>
            </div>
            <div className="ml-4">{item.icon}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Home;
