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
} from "react-icons/fi";
import axios from "axios";


const classNames = (...classes) => classes.filter(Boolean).join(" ");

const EventDescription = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [screenshot, setScreenshot] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleScreenshotChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (event.type.toLowerCase() === "paid" && !screenshot) {
      alert("Please upload the payment screenshot before submitting.");
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("eventId", id);
    formDataToSend.append("eventName", event.name);
    formDataToSend.append("eventType", event.type);
    if (screenshot) {
      formDataToSend.append("screenshot", screenshot);
    }
  
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, formDataToSend);
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false),5000); // Show success
        if (screenshot && !screenshot.type.startsWith("image/")) {
            alert("Please upload a valid image file for the screenshot.");
            return;
          }
                  
      setFormData({ name: "", email: "", phone: "" });
      setScreenshot(null);
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  
  

    const SuccessPopup = () => (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-3"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
          <h3 className="text-lg font-semibold text-gray-800">Event Registered!</h3>
          <p className="text-sm text-gray-600 text-center">Your event registration has been successfully sent.</p>
        </motion.div>
      </div>
    );
  

  if (!event)
    return <div className="text-center py-10 text-gray-500">Loading event details...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" bg-white rounded-3xl shadow-xl max-w-4xl mx-auto mt-10 md:mt-32 lg:mt-40 p-6 md:p-10 h-full"
    >
      {/* Header */}
      <div className="flex items-center gap-5 mb-8">
        <img
          src={event.logo || "https://via.placeholder.com/100"}
          alt="Event Logo"
          className="w-24 h-24 rounded-2xl object-cover shadow"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{event.name}</h2>
          <span className="text-sm text-gray-500">{event.title}</span>
        </div>
      </div>

      {/* Tabs */}
      <Tab.Group>
        <Tab.List className="flex space-x-3 rounded-xl bg-gray-100 p-2 mb-6">
          {["Event Description", "Apply"].map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm leading-5 font-semibold rounded-xl transition-all",
                  selected
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-white hover:shadow"
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {/* Event Description */}
          <Tab.Panel>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 text-gray-800 text-sm"
            >
              <section className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <FiMapPin className="text-blue-500" />
                  <span>{event.location || "Online / Not specified"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-green-600" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock className="text-yellow-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiUser className="text-purple-500" />
                  <span>{event.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCreditCard className="text-red-500" />
                  <span>Status: {event.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiDollarSign className="text-green-700" />
                  <span>Amount: ₹{event.amount || "0"}</span>
                </div>
                {event.link && (
                  <div className="flex items-center gap-2">
                    <FiLink className="text-indigo-500" />
                    <span>Link: {event.link}</span>
                  </div>
                )}
                {event.mode && (
                  <div className="flex items-center gap-2">
                    <FiGlobe className="text-cyan-500" />
                    <span>Mode: {event.mode}</span>
                  </div>
                )}
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <p className="text-sm leading-relaxed text-gray-700">{event.description}</p>
              </section>
            </motion.div>
          </Tab.Panel>

          {/* Apply */}
          <Tab.Panel>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-md mx-auto"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">
                Register for the Event
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { label: "Full Name", name: "name", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Phone Number", name: "phone", type: "tel" },
                ].map((input) => (
                  <div key={input.name} className="flex flex-col gap-1">
                    <label className="text-gray-600 font-medium">{input.label}</label>
                    <input
                      type={input.type}
                      name={input.name}
                      value={formData[input.name]}
                      onChange={handleChange}
                      required
                      className="rounded-2xl px-4 py-3 bg-gray-100 border focus:ring-2 focus:ring-blue-500 focus:outline-none transition shadow-sm"
                    />
                  </div>
                ))}

                {event.type.toLowerCase() === "paid" && (
                  <>
                    <div className="text-center mt-4">
                      <p className="text-sm text-gray-600 mb-2">
                        This is a paid event. Please pay ₹{event.amount} and upload your payment
                        screenshot.
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
                      
                    </div>
                    <div className="flex flex-col gap-1 mt-4">
                      <label className="text-gray-600 font-medium">Payment Screenshot</label>
                      <input
  type="file"
  accept="image/*"
  onChange={handleScreenshotChange}
  required
  className="bg-gray-100 rounded-xl p-2 text-sm"
  name="screenshot" // <-- Ensure this matches the field name Multer is expecting
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
            </motion.div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
       <AnimatePresence>{showSuccessPopup && <SuccessPopup />}</AnimatePresence>
    </motion.div>
  );
};

export default EventDescription;
