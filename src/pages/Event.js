import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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
import Typewriter from 'typewriter-effect';
import { Sparkles } from 'lucide-react';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    location: '',
    startDate: '',
  });
  const [activeTab, setActiveTab] = useState('Free');
  const navigate = useNavigate();


  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events`);
        setEvents(res.data);
        setFilteredEvents(res.data);
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };
    fetchEvents();
  }, []);

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    const filtered = events.filter((event) => {
      const matchesName = event.name?.toLowerCase().includes(newFilters.name.toLowerCase());
      const matchesLocation = event.location?.toLowerCase().includes(newFilters.location.toLowerCase());
      const matchesDate = newFilters.startDate ? event.date >= newFilters.startDate : true;
      return matchesName && matchesLocation && matchesDate;
    });

    setFilteredEvents(filtered);
  };

  const renderEventCards = (eventList) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {eventList.map((event, i) => (
        <motion.div
          key={i}
          className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.02 }}
        >
          {event.logo && (
            <img src={event.logo} alt={event.title} className="w-full h-32 object-contain bg-gray-100" />
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h3>
            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{event.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
              <p className="flex items-center gap-2">
                <FaUser className="text-blue-500" />
                <span className="font-medium">Host:</span> {event.name}
              </p>
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-green-500" />
                <span className="font-medium">Date:</span> {formatDate(event.date)}
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
              {/* View Event Button */}
<div className="mt-4">
  <button
    onClick={() => navigate(`/event-description/${event._id}`)}
    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
  >
    View Event
  </button>
</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const freeEvents = filteredEvents.filter((e) => e.type === 'Free' && e.status !== 'Completed');
  const paidEvents = filteredEvents.filter((e) => e.type === 'Paid' && e.status !== 'Completed');
  const completedCount = filteredEvents.filter((e) => e.status === 'Completed').length;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="relative w-full bg-white py-8 px-6 flex flex-col items-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-yellow-100 opacity-60 z-0" />
          <div className="relative z-10 mb-6">
            <div className="w-16 h-16 rounded-full bg-yellow-400 shadow-xl flex items-center justify-center animate-bounce">
              <Sparkles className="text-white w-8 h-8" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 z-10 leading-tight">
            Elevate Your Business <br />
            <span className="text-yellow-500">with Our Events</span>
          </h2>
          <div className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl z-10">
            <Typewriter
              options={{
                strings: [
                  'Join expert-led workshops & seminars.',
                  'Explore trending innovations and market insights.',
                  'Network, learn, and grow your business with Tactos.',
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-6 mt-10">
          {/* Filter Sidebar */}
          <div className="lg:w-1/4 bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-6 text-gray-700 border-b pb-2">Filter Events</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-600">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="w-full mt-1 border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Host Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Search by host"
                  value={filters.name}
                  onChange={handleFilterChange}
                  className="w-full mt-1 border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Search by location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full mt-1 border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
          </div>

          {/* Event Cards */}
          <div className="lg:w-3/4">
            <div className="flex gap-4 mb-6 border-b border-gray-300">
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'Free' ? 'border-b-4 border-blue-500 text-blue-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('Free')}
              >
                Free Events
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'Paid' ? 'border-b-4 border-green-500 text-green-600' : 'text-gray-500'}`}
                onClick={() => setActiveTab('Paid')}
              >
                Paid Events
              </button>
            </div>

            {activeTab === 'Free' ? renderEventCards(freeEvents) : renderEventCards(paidEvents)}

            <div className="mt-10 text-center">
              <h2 className="text-base font-semibold text-gray-800">
                Total Completed Events: {completedCount}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
