import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMapPin,
  FiCalendar,
  FiClock,
  FiUser,
  FiLink,
  FiCreditCard,
  FiGlobe,
  FiDollarSign,
  FiPhone,
  FiMail,
} from "react-icons/fi";
import axios from "axios";

const classNames = (...classes) => classes.filter(Boolean).join(" ");

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [otherEvents, setOtherEvents] = useState([]);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  // Add this function to close modal
const closeApplyModal = () => setShowApplyModal(false);


const [screenshotFile, setScreenshotFile] = useState(null);

  // Form state for applying/registering
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [screenshot, setScreenshot] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    const fetchOtherEvents = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events`);
        setOtherEvents(res.data.filter((e) => e._id !== id));
      } catch (error) {
        console.error("Error fetching other events:", error);
      }
    };

    fetchEvent();
    fetchOtherEvents();
  }, [id]);

  // Handlers
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleScreenshotChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
  
    if (event?.type.toLowerCase() === "paid" && !screenshot) {
      alert("Please upload payment screenshot before submitting.");
      return;
    }
  
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("eventId", event._id);
      data.append("eventName", event.name);
      data.append("eventType", event.type);
      if (screenshot) {
        data.append("screenshot", screenshot);
      }
  
      await axios.post(`${process.env.REACT_APP_API_URL}/api/eventregister`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      setShowApplyModal(false);
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 4000);
      setFormData({ name: "", email: "", phone: "" });
      setScreenshot(null);
    } catch (error) {
      console.error("Registration error:", error);
      alert("Error submitting registration");
    }
  };
  
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle your submission logic here
    console.log(formData, screenshotFile);
    setShowRegister(false);
  };
  

  // Event card for sidebar list
  const EventCard = ({ ev ,show, onClose, event, handleSubmit, formData, handleChange, handleScreenshotChange }) => (
    <div
      key={ev._id}
      className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 cursor-pointer min-w-[280px] md:min-w-full"
      onClick={() => window.location.assign(`/event-description/${ev._id}`)}
    >
      <img
        src={ev.logo || "https://via.placeholder.com/64"}
        alt={`${ev.name} logo`}
        className="w-16 h-16 rounded-full object-cover shadow-md flex-shrink-0"
      />
      <div className="mt-2 md:mt-0 md:ml-4 flex-1 min-w-0">
        <h3 className="text-lg font-semibold truncate">{ev.name}</h3>
        <p className="text-sm text-gray-500 truncate">{ev.title}</p>
        <div className="flex flex-wrap text-xs text-gray-400 mt-1 gap-1">
          {[ev.type, ev.status, ev.date].map(
            (tag) => tag && (
              <span
                key={tag}
                className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            )
          )}
        </div>
        <div className="flex items-center text-gray-400 text-xs mt-1 gap-3">
          <span className="flex items-center gap-1">
            <FiMapPin /> {ev.location || "Online"}
          </span>
          <span className="flex items-center gap-1">
            <FiDollarSign /> ₹{ev.amount || "0"}
          </span>
        </div>
        <p className="text-xs text-gray-600 mt-1 truncate">{ev.description}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowApplyModal(true);
          setFormData({ name: "", email: "", phone: "" });
          setScreenshot(null);
        }}
        className="mt-3 md:mt-0 md:ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition"
      >
        Register
      </button>
    </div>
  );

  if (!event)
    return (
      <div className="text-center py-20 text-gray-500">Loading event details...</div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 my-20 grid grid-cols-1 md:grid-cols-3 gap-10 min-h-screen">
      {/* Left Sidebar - Other Events */}
      <aside className="md:col-span-1 overflow-x-auto md:overflow-visible md:h-auto">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">Other Events</h2>
        <div className="flex md:flex-col gap-4 md:gap-3">
          {otherEvents.length === 0 && (
            <p className="text-gray-400">No other events available</p>
          )}
          {otherEvents.map((ev) => (
            <EventCard key={ev._id} ev={ev} />
          ))}
        </div>
      </aside>

      {/* Right Main Content */}
      <main className="md:col-span-2 bg-white rounded-3xl shadow-lg p-8 flex flex-col">
        {/* Header top */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <img
              src={event.logo || "https://via.placeholder.com/100"}
              alt="Event Logo"
              className="w-24 h-24 rounded-2xl object-cover shadow"
            />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{event.name}</h1>
              <div className="mt-2 flex gap-2">
                {event.isNew && (
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full font-semibold text-xs uppercase">
                    New
                  </span>
                )}
                {event.isFeatured && (
                  <span className="bg-blue-700 text-white px-3 py-1 rounded-full font-semibold text-xs uppercase">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowApplyModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-2xl shadow-lg transition"
          >
            Apply
          </button>
        </div>

        {/* Tabs Section */}
        <Tab.Group>
          <Tab.List className="flex space-x-3 rounded-xl bg-gray-100 p-2 mb-6">
            {["Event Overview"].map(
              (tab) => (
                <Tab
                  key={tab}
                  className={({ selected }) =>
                    classNames(
                      "w-full py-2.5 text-sm font-semibold rounded-xl transition-all",
                      selected
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-600 hover:bg-white hover:shadow"
                    )
                  }
                >
                  {tab}
                </Tab>
              )
            )}
          </Tab.List>

          <Tab.Panels className="flex-grow overflow-auto">
            {/* Event Overview */}
            <Tab.Panel className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-sm">
              <div className="flex items-center gap-2">
                <FiCalendar className="text-blue-500" />
                <span>{event.date || "TBA"}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-green-600" />
                <span>{event.time || "TBA"}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin className="text-purple-500" />
                <span>{event.location || "Online"}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiUser className="text-yellow-500" />
                <span>{event.type || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCreditCard className="text-red-500" />
                <span>Status: {event.status || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
            <FiDollarSign className="text-indigo-500" />
            <span>Amount: ₹{event.amount || "Free"}</span>
          </div>
        </Tab.Panel>
        <p className="text-gray-700 whitespace-pre-line w-full">{event.description}</p>


        {/* Contact */}
        <Tab.Panel className="space-y-4 text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <FiMail className="text-blue-500" />
            <a href={`mailto:${event.contactEmail}`} className="underline hover:text-blue-700">
              {event.contactEmail || "Not available"}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FiPhone className="text-green-500" />
            <a href={`tel:${event.contactPhone}`} className="underline hover:text-green-700">
              {event.contactPhone || "Not available"}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FiGlobe className="text-purple-500" />
            <a
              href={event.website || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-purple-700"
            >
              {event.website || "Not available"}
            </a>
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>

    {/* Apply Modal */}
    <AnimatePresence>
  {showApplyModal && (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={closeApplyModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
        <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">
          Register for the Event
        </h2>
        <form onSubmit={handleApplySubmit} className="space-y-6">
          {/* form inputs */}
          {[
            { label: "Full Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone Number", name: "phone", type: "tel" },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col gap-1">
              <label className="text-gray-600 font-medium">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleFormChange}
                required
                className="rounded-2xl px-4 py-3 bg-gray-100 border focus:ring-2 focus:ring-blue-500 focus:outline-none transition shadow-sm"
              />
            </div>
          ))}
          {/* Payment screenshot for paid events */}
          {event?.type.toLowerCase() === "paid" && (
            <>
              <p className="text-sm text-gray-600 mb-2 text-center">
                This is a paid event. Please pay ₹{event.amount} and upload your payment screenshot.
              </p>
              {event.paymentLink && (
                <a
                  href={event.paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition"
                >
                  Proceed to Payment
                </a>
              )}
              <div className="flex flex-col gap-1 mt-4">
                <label className="text-gray-600 font-medium">Payment Screenshot</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleScreenshotChange}
                  required
                  className="bg-gray-100 rounded-xl p-2 text-sm"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-2xl hover:bg-blue-700 transition shadow-md"
          >
            Submit
          </button>
        </form>
      </div>
    </motion.div>
  )}
</AnimatePresence>


    {/* Success Popup */}
    <AnimatePresence>
      {showSuccessPopup && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-10 right-10 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50"
        >
          Application submitted successfully!
        </motion.div>
      )}
    </AnimatePresence>
  </main>
</div>
);
};

export default EventDetail;