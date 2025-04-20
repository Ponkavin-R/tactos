// Updated Event Component with mobile filter like Amazon, inline calendar for desktop, rounded images, and iOS-style cards
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
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({ name: '', location: '', startDate: '' });
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('Free');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const navigate = useNavigate();

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

  const applyFilters = (newFilters) => {
    const filtered = events.filter((event) => {
      const matchesName = event.name?.toLowerCase().includes(newFilters.name.toLowerCase());
      const matchesLocation = event.location?.toLowerCase().includes(newFilters.location.toLowerCase());
      const matchesDate = newFilters.startDate ? new Date(event.date) >= new Date(newFilters.startDate) : true;
      return matchesName && matchesLocation && matchesDate;
    });
    setFilteredEvents(filtered);
  };

  const handleCalendarChange = (date) => {
    setCalendarDate(date);
    const newFilters = { ...filters, startDate: date.toISOString().split('T')[0] };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const renderEventCards = (eventList) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {eventList.map((event, i) => (
        <motion.div
          key={i}
          className="bg-white shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            {event.logo && (
              <img
                src={event.logo}
                alt={event.title}
                className="w-16 h-16 object-cover rounded-full bg-gray-100"
              />
            )}
            <div className="flex flex-col">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800">{event.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
                <FaUser className="text-blue-500" /> {event.name}
              </p>
            </div>
          </div>
  
          <div className="mt-3 space-y-2 text-xs sm:text-sm text-gray-600">
            <p className="flex items-center gap-1">
              <FaCalendarAlt className="text-green-500" /> {formatDate(event.date)}
            </p>
            <p className="line-clamp-2 text-gray-500">{event.description}</p>
          </div>
  
          <div className="mt-4 flex ">
  <button
    onClick={() => navigate(`/event-description/${event._id}`)}
    className="w-fit bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg text-sm"
  >
    View Event
  </button>
</div>

        </motion.div>
      ))}
    </div>
  );
  

  const freeEvents = filteredEvents.filter((e) => e.type === 'Free' && e.status !== 'Completed');
  const paidEvents = filteredEvents.filter((e) => e.type === 'Paid' && e.status !== 'Completed');

  return (
    <div className="min-h-screen bg-gray-50 p-3 md:mt-16 lg:mt-16 sm:p-6">
      <section className="text-center mb-10">
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center">
            <Sparkles className="text-white w-6 h-6" />
          </div>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 leading-tight">
          Elevate Your Business <br />
          <span className="text-yellow-500">with Our Events</span>
        </h2>
        <div className="mt-4 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
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

      <div className="flex lg:flex-row flex-col gap-6">
        {/* Filter Section */}
        <div className="lg:w-1/4 bg-white rounded-xl shadow p-4 text-xs sm:text-sm">
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <h3 className="font-semibold text-gray-700">Filters</h3>
            <button onClick={() => setShowMobileFilter(!showMobileFilter)} className="text-yellow-500 font-medium">
              {showMobileFilter ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className={`${showMobileFilter ? 'block' : 'hidden'} lg:block space-y-4`}>
            <div>
              <label className="text-gray-600 font-medium block mb-1">Host Name</label>
              <input
                type="text"
                name="name"
                value={filters.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="text-gray-600 font-medium block mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="text-gray-600 font-medium block mb-1">Start Date</label>
              <Calendar onChange={handleCalendarChange} value={calendarDate} className="border-none" />
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="lg:w-3/4">
          <div className="flex gap-4 mb-4 text-sm sm:text-base">
            <button
              className={`px-3 py-1 font-medium ${activeTab === 'Free' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('Free')}
            >
              Free Events
            </button>
            <button
              className={`px-3 py-1 font-medium ${activeTab === 'Paid' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('Paid')}
            >
              Paid Events
            </button>
          </div>

          {activeTab === 'Free' ? renderEventCards(freeEvents) : renderEventCards(paidEvents)}
        </div>
      </div>
    </div>
  );
};

export default Event;
