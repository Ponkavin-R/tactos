import React, { useState } from "react";
import axios from "axios";
import { FaLaptopCode, FaMobileAlt, FaBullhorn, FaRobot, FaBriefcase } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import Corevalues from "../components/CoreSolutions";
import { motion, AnimatePresence } from "framer-motion";
export default function Solution() {
  const [formData, setFormData] = useState({
    startupName: "",
    founderName: "",
    email: "",
    phoneNumber: "",
    service: [],
  });

  const [quoteAmounts, setQuoteAmounts] = useState({});
  const [errors, setErrors] = useState({});

  const services = [
    {
      name: "Web Development",
      description: "We build responsive, high-performance websites.",
      logo: <FaLaptopCode />,
    },
    {
      name: "App Development",
      description: "Get seamless mobile applications for Android and iOS.",
      logo: <FaMobileAlt />,
    },
    {
      name: "Digital Marketing",
      description: "Promote your brand through digital strategies.",
      logo: <FaBullhorn />,
    },
    {
      name: "Automation",
      description: "Automate processes to save time and resources.",
      logo: <FaRobot />,
    },
    {
      name: "AI Solution",
      description: "Custom AI solutions crafted to empower startups and enterprises in achieving their goals, optimizing operations, and scaling intelligently.",
      logo: <FaBriefcase />,
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceSelect = (serviceName) => {
    setFormData((prevState) => {
      const updatedServices = prevState.service.includes(serviceName)
        ? prevState.service.filter((s) => s !== serviceName)
        : [...prevState.service, serviceName];
      return { ...prevState, service: updatedServices };
    });
  };

  const handleQuoteChange = (e, service) => {
    setQuoteAmounts({
      ...quoteAmounts,
      [service]: e.target.value,
    });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.startupName) newErrors.startupName = "Startup Name is required";
    if (!formData.founderName) newErrors.founderName = "Founder Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid Email is required";
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Enter a valid 10-digit phone number";
    if (formData.service.length === 0) newErrors.service = "Select at least one service";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("${process.env.REACT_APP_API_URL}/api/solutions", formData);
        if (response.status === 201) {
          alert("Form Submitted Successfully!");
          setFormData({
            startupName: "",
            founderName: "",
            email: "",
            phoneNumber: "",
            service: [],
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit the form. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 md:px-12 py-12 overflow-hidden">
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-center font-extrabold text-blue-950 leading-tight">
          IT Solutions<br />

        </h1>
      {/* Header */}
      <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative bg-gradient-to-br from-white via-blue-50 to-white rounded-3xl px-6 py-16 sm:px-10 text-center mb-2 shadow-xl overflow-hidden"
    >
      {/* Optional Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f680_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none rounded-3xl" />

      {/* Subheading */}
      <h2 className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-4 relative z-10">
        Empowering Innovation & Growth
      </h2>

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight relative z-10">
        Transform Your Business with
        <br />
        <span className="text-blue-700">Tactos Solutions</span>
      </h1>

      {/* Description */}
      <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-base sm:text-lg relative z-10">
        Discover innovative strategies and tailor-made services that elevate your brand, streamline your workflow, and drive success in the digital era.
      </p>

    </motion.header>

      <Corevalues/>

      {/* Form */}
      <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-2xl p-10 mt-12 max-w-4xl mx-auto border border-gray-200"
    >
      <h2 className="text-4xl font-extrabold mb-10 text-center text-blue-800 tracking-tight">
        Project Details
      </h2>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["startupName", "founderName", "email", "phoneNumber"].map(
          (field, index) => (
            <div key={index}>
              <label className="text-gray-700 block mb-2 font-medium capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-800 shadow-sm outline-none ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field]}
                </p>
              )}
            </div>
          )
        )}
      </div>

      {/* Services */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Select Services and Set Quote Amount
        </h3>

        <div className="space-y-6">
          {services.map((service, index) => {
            const isSelected = formData.service.includes(service.name);
            return (
              <motion.div
                key={index}
                layout
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    value={service.name}
                    checked={isSelected}
                    onChange={() => handleServiceSelect(service.name)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="ml-4 text-lg font-medium text-gray-700">
                    {service.name}
                  </label>
                </div>

                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full md:w-1/3"
                    >
                      <input
                        type="number"
                        id={`quote-${service.name}`}
                        value={quoteAmounts[service.name] || ""}
                        onChange={(e) =>
                          handleQuoteChange(e, service.name)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none custom-number-input shadow-sm"
                        placeholder="Enter amount in ₹"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-12 w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-3 rounded-xl transition duration-300 shadow-lg"
      >
        Submit
      </button>

      {/* Hide arrows for number input */}
      <style jsx>{`
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </form>
    </div>
  );
}
