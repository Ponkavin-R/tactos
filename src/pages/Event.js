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
  FaRupeeSign,
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
  const tamilNaduDistricts = [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
    "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram",
    "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai",
    "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai",
    "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi",
    "Thanjavur", "Theni", "Thiruvallur", "Thiruvarur", "Thoothukudi",
    "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvannamalai",
    "Vellore", "Viluppuram", "Virudhunagar"
  ];
  
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

  const renderEventCards = (eventList) => {
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventList.map((event, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            {/* Event Image */}
            {event.logo && (
              <img
                src={event.logo}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
            )}
  
            {/* Event Content */}
            <div className="p-5">
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {event.title}
              </h3>
  
              {/* Grid Info Section */}
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-green-500" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-blue-500" />
                  <span>{event.time || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaRupeeSign className="text-yellow-500" />
                  <span>
                    {event.type === "Free"
                      ? "Free"
                      : `Paid (${event.amount || "N/A"})`}
                  </span>
                </div>
                <div className="text-xs text-gray-400 col-span-2 italic">
                  Organized by: {event.name || "Unknown"}
                </div>
              </div>
  
              {/* Description */}
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                {event.description}
              </p>
  
              {/* View Button */}
              <button
                onClick={() => navigate(`/event-description/${event._id}`)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-transform hover:scale-105"
              >
                View Event
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };
  

  const freeEvents = filteredEvents.filter((e) => e.type === 'Free' && e.status !== 'Completed');
  const paidEvents = filteredEvents.filter((e) => e.type === 'Paid' && e.status !== 'Completed');

  return (
    <div className="min-h-screen bg-gray-50 p-3 md:mt-16 lg:mt-28 sm:p-6">
      <section className="text-center mb-10">
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center">
            <Sparkles className="text-white w-6 h-6" />
          </div>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 leading-tight">
        Elevate Yourself and Your Business         <br />
          <span className="text-yellow-500">with Our Events</span>
        </h2>
        <div className="mt-4 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          <Typewriter
            options={{
              strings: [
                'Discover, Connect, & Grow through curated Startup Events',
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
              <label className="text-gray-600 font-medium block mb-1">Hosted By</label>
              <input
                type="text"
                name="name"
                value={filters.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
            <div>
  <label className="text-gray-600 font-medium block mb-1">District</label>
  <select
    name="location"
    value={filters.location}
    onChange={handleInputChange}
    className="w-full border border-gray-300 rounded px-2 py-1"
  >
    <option value="">Select District</option>
    {tamilNaduDistricts.map((district) => (
      <option key={district} value={district}>
        {district}
      </option>
    ))}
  </select>
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
