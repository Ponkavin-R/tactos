import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';

const Event = () => {
  const events = [
    { type: 'Free Event', description: 'Join our free events and enjoy learning.', icon: <FaCalendarAlt /> },
    { type: 'Paid Event', description: 'Access premium content and events.', icon: <FaMoneyBillWave /> },
    { type: 'Successful Event', description: 'Check out our past successful events.', icon: <FaCheckCircle /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const eventsData = {
    'Free Event': [
      'Workshop on Web Development',
      'React.js Beginner Session',
      'AI and ML Introduction'
    ],
    'Paid Event': [
      'Advanced React Masterclass',
      'Full-stack Development',
      'UX/UI Design Bootcamp'
    ],
    'Successful Event': [
      'E-commerce Project Launch',
      '5000+ Users Event',
      'Hackathon Success Stories'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Events</h1>

        {events.map((event, index) => (
          <div key={index} className="mb-12">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-3xl text-blue-500">{event.icon}</div>
              <h2 className="text-2xl font-semibold">{event.type}</h2>
            </div>
            <p className="text-gray-600 mb-6">{event.description}</p>

            <div className="overflow-x-auto">
              <div className="flex space-x-4">
                {eventsData[event.type].map((item, i) => (
                  <motion.div
                    key={i}
                    className="bg-white shadow-lg rounded-xl p-6 w-64 flex-shrink-0 flex flex-col justify-between h-48"
                    variants={cardVariants}
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-800">{item}</h3>
                    {event.type === 'Paid Event' && (
                      <a
                        href="#"
                        className="mt-4 text-blue-500 hover:underline"
                      >
                        Payment Link
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="mt-10 text-center">
          <h2 className="text-xl font-semibold text-gray-800">Total Events: {events.length}</h2>
        </div>
      </motion.div>
    </div>
  );
};

export default Event;
