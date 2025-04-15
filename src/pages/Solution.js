import React, { useState } from "react";
import axios from "axios";
import { FaLaptopCode, FaMobileAlt, FaBullhorn, FaRobot, FaBriefcase } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

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
      name: "Business Solution",
      description: "Tailor-made business solutions for your startup.",
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
        const response = await axios.post("https://tactos-backend.onrender.com/api/solutions", formData);
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
      {/* Header */}
      <header className="relative bg-gradient-to-br from-blue-50 to-white rounded-xl p-10 text-center mb-16 shadow-md animate-fade-in">
        <h2 className="text-blue-700 font-medium text-sm tracking-widest uppercase mb-3">
          Tailored Solutions for Your Business Growth
        </h2>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Don't Miss Out on <br />
          <span className="text-blue-800">
            <Typewriter
              words={["Tactos"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </h1>
        <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
          Explore our services and find the best fit for your needs. We’ll guide you through the entire process.
        </p>
      </header>

      {/* Services */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl hover:bg-blue-900 hover:text-white transition duration-300 p-6 flex flex-col items-center space-y-3"
          >
            <div className="text-blue-700 text-4xl">{service.logo}</div>
            <h2 className="text-xl font-semibold text-center">{service.name}</h2>
            <p className="text-sm text-center">{service.description}</p>
          </div>
        ))}
      </section>

      {/* Form */}
      <form
        className="bg-white rounded-xl shadow-xl p-10 mt-12 max-w-3xl mx-auto border border-gray-200"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Project Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["startupName", "founderName", "email", "phoneNumber"].map((field, index) => (
            <div key={index}>
              <label className="text-gray-700 block mb-2 capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors[field] ? "border-red-500" : ""
                }`}
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Select Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-8">
              {services.map((service, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    value={service.name}
                    checked={formData.service.includes(service.name)}
                    onChange={() => handleServiceSelect(service.name)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="ml-4 text-gray-700">{service.name}</label>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {formData.service.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Set Quote Amount</h3>
                  {formData.service.map((service, index) => (
                    <div key={index} className="flex items-center gap-4 mb-1">
                      <label htmlFor={`quote-${service}`} className="text-gray-600 w-32">
                        {service}
                      </label>
                      <input
                        type="number"
                        id={`quote-${service}`}
                        value={quoteAmounts[service] || ""}
                        onChange={(e) => handleQuoteChange(e, service)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="₹"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
