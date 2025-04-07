import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaLink,
  FaMoneyBillWave,
  FaUser,
  FaGlobe,
  FaCheckCircle,
} from 'react-icons/fa';

const Event = () => {
  const [events, setEvents] = useState([]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('https://tactos-backend.onrender.com/api/events');
        setEvents(res.data);
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };

    fetchEvents();
  }, []);

  const completedEvents = events.filter((e) => e.status === 'Completed');

  const freeEvents = events.filter(
    (event) => event.type === 'Free' && event.status !== 'Completed'
  );
  
  const paidEvents = events.filter(
    (event) => event.type === 'Paid' && event.status !== 'Completed'
  );
  

  const renderEventSection = (title, eventList) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">{title}</h2>
      <div className="flex overflow-x-auto space-x-6 scrollbar-hide pb-4">
        {eventList.map((event, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0 w-82   bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02 }}
          >
            {event.logo && (
              <img
                src={event.logo}
                alt={event.title}
                className="w-full h-32 object-contain"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {event.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                {event.description}
              </p>

              {/* Event details in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <FaUser className="text-blue-500" />
                  <span className="font-medium">Host:</span> {event.name}
                </p>
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-green-500" />
                  <span className="font-medium">Date:</span> {event.date}
                </p>
                <p className="flex items-center gap-2">
                  <FaClock className="text-yellow-500" />
                  <span className="font-medium">Time:</span> {event.time}
                </p>
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  <span className="font-medium">Location:</span> {event.location}
                </p>
                <p className="flex items-center gap-2">
                  <FaGlobe className="text-indigo-500" />
                  <span className="font-medium">Mode:</span> {event.mode}
                </p>
                {event.type === 'Paid' && (
                  <p className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-green-600" />
                    <span className="font-medium">Amount:</span> ₹{event.amount}
                  </p>
                )}
                <p className="flex items-center gap-2">
                  <FaCheckCircle className="text-purple-500" />
                  <span className="font-medium">Status:</span> {event.status}
                </p>
                {event.paymentLink && (
                  <p className="flex items-center gap-2 col-span-1 sm:col-span-2">
                    <FaLink className="text-blue-600" />
                    <a
                      href={event.paymentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Payment Link
                    </a>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
          All Events
        </h1>

        {renderEventSection('Free Events', freeEvents)}
        {renderEventSection('Paid Events', paidEvents)}

        <div className="mt-10 text-center">
          <h2 className="text-base font-semibold text-gray-800">
          Total Completed Events: {events.filter((e) => e.status === 'Completed').length}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Event;
