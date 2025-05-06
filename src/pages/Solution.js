import React, { useState } from "react";
import axios from "axios";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaBullhorn,
  FaRobot,
  FaBriefcase,
  FaProjectDiagram,
} from "react-icons/fa";
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
    { name: "Web Development", description: "", logo: <FaLaptopCode /> },
    { name: "App Development", description: "", logo: <FaMobileAlt /> },
    { name: "Digital Marketing", description: "", logo: <FaBullhorn /> },
    { name: "Automation", description: "", logo: <FaRobot /> },
    { name: "AI Solution", description: "", logo: <FaBriefcase /> },
    { name: "ERP Solution", description: "", logo: <FaProjectDiagram /> },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "founderName" && /\d/.test(value)) return; // Block numbers
    if (name === "phoneNumber" && /[^\d]/.test(value)) return; // Block characters

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time email .com validation
    if (name === "email") {
      if (!value.includes(".com")) {
        setErrors((prev) => ({ ...prev, email: "Email must include .com" }));
      } else {
        setErrors((prev) => {
          const { email, ...rest } = prev;
          return rest;
        });
      }
    }
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
    setQuoteAmounts({ ...quoteAmounts, [service]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.startupName) newErrors.startupName = "Startup Name is required";
    if (!formData.founderName) newErrors.founderName = "Founder Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid Email is required";
    else if (!formData.email.includes(".com"))
      newErrors.email = "Email must include .com";
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Enter a valid 10-digit phone number";
    if (formData.service.length === 0)
      newErrors.service = "Select at least one service";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Prepare service + quoteAmount mapping
        const servicesWithQuotes = formData.service.map((serviceName) => ({
          name: serviceName,
          quote: quoteAmounts[serviceName] || 0,
        }));
  
        const payload = {
          ...formData,
          services: servicesWithQuotes, // new key: array of { name, quote }
        };
  
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/solutions`,
          payload
        );
  
        if (response.status === 201) {
          alert("Form Submitted Successfully!");
          setFormData({
            startupName: "",
            founderName: "",
            email: "",
            phoneNumber: "",
            service: [],
          });
          setQuoteAmounts({});
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit the form. Please try again.");
      }
    }
  };
  

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 sm:px-6 md:px-12 py-12 overflow-hidden">
      {/* Header Section */}
      <motion.header
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="relative bg-gradient-to-br from-white via-blue-50 to-white rounded-3xl px-4 py-10 sm:px-8 mt-10 text-center mb-8 shadow-xl overflow-hidden"
>
  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f680_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none rounded-3xl" />
  
  <h2 className=" text-2xl sm:text-3xl font-bold leading-snug tracking-tight text-gray-900 z-10 relative mb-4">
  At TACTOS, we safeguard startups and entrepreneurs from unreliable tech solution providers
  </h2>
  
  <h1 className="text-blue-600 font-semibold text-[10px] sm:text-xs tracking-widest mb-3 z-10 relative">
  Acting as a trusted intermediary, we connect you with vetted and reliable tech partners. Just share your budget—we’ll ensure your project is delivered on time, within budget, and without compromise
    <br />
  </h1>
  
  <p className="text-gray-600 mt-3 sm:mt-4 max-w-xl mx-auto text-xs sm:text-sm font-bold z-10 relative">
  No hidden fees. No commissions. Just dependable support to help your startup thrive
  </p>
</motion.header>


      <Corevalues />

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 mt-12 max-w-3xl mx-auto border border-gray-200"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-blue-800 tracking-tight">
          Project Details
        </h2>
        <h1 className="text-blue-600 font-semibold text-[10px] sm:text-xs tracking-widest text-center mb-3 z-10 relative">
        Provide your budget for your build and we will connect you with the right partners providing services right on time
    <br />
  </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {["startupName", "founderName", "email", "phoneNumber"].map((field, index) => (
            <div key={index}>
              <label className="text-sm text-gray-700 block mb-1 font-medium capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[field] && (
                <p className="text-xs text-red-500 mt-1">{errors[field]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Select Services and Quote
          </h3>

          <div className="space-y-4">
            {services.map((service, index) => {
              const isSelected = formData.service.includes(service.name);
              return (
                <motion.div
                  key={index}
                  layout
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      value={service.name}
                      checked={isSelected}
                      onChange={() => handleServiceSelect(service.name)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="ml-3 text-sm text-gray-700">
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
                          onChange={(e) => handleQuoteChange(e, service.name)}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                          placeholder="Amount (₹)"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold py-3 rounded-xl transition duration-300 shadow-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
