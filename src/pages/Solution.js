import React, { useState } from "react";
import axios from "axios"; // Import axios
import { ChevronDownIcon } from "@heroicons/react/outline";
// import Image1 from "https://miro.medium.com/v2/resize:fit:1400/0*M4bxiCIjcTK-2Xr6.jpeg";
import Image2 from "../assest/l2.svg";
import Image3 from "../assest/l2.svg";
import Image4 from "../assest/l2.svg";
import Image5 from "../assest/l2.svg";

export default function Solution() {
  const [needQuote, setNeedQuote] = useState(false);
  const [quoteAmount, setQuoteAmount] = useState("");
  const [formData, setFormData] = useState({
    startupName: "",
    founderName: "",
    email: "",
    phoneNumber: "",
    service: [],  // Changed to an array
  });
  
  const [errors, setErrors] = useState({});

  const services = [
    {
      name: "Web Development",
      image: "https://miro.medium.com/v2/resize:fit:1400/0*M4bxiCIjcTK-2Xr6.jpeg",
      points: ["Responsive Design", "Admin Dashboard", "User Authentication", "Payment Gateway"],
    },
    {
      name: "App Development",
      image: "https://www.softgentech.com/wp-content/uploads/2024/04/Mobile-app-development-services-in-lucknow-1080x593.jpg",
      points: ["iOS & Android App", "Firebase Integration", "Push Notifications", "Payment Gateway"],
    },
    {
      name: "Digital Marketing",
      image: "https://i0.wp.com/plopdo.com/wp-content/uploads/2020/02/0_f-YBCfsCVkm9meEK.jpg?resize=1210%2C642&ssl=1",
      points: ["SEO Optimization", "Google Ads Setup", "Email Marketing", "Social Media Management"],
    },
    {
      name: "Automation",
      image: "https://deltarock.co.uk/wp-content/uploads/2023/06/Automation_Shutterstock_1911471145-1200x689.jpg",
      points: ["Email Automation", "Chatbot Setup", "Task Automation", "Google Sheet Automation"],
    },
    {
      name: "Business Solution",
      image: "https://thumbs.dreamstime.com/b/business-solutions-virtual-screen-concept-113917019.jpg",
      points: ["Project Analysis", "Budget Planning", "On-time Delivery", "Post Launch Support"],
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.startupName) newErrors.startupName = "Startup Name is required";
    if (!formData.founderName) newErrors.founderName = "Founder Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid Email is required";
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Enter a valid 10-digit phone number";
    if (formData.service.length === 0) newErrors.service = "Select a service";

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
    <div className="min-h-screen bg-gray-100 text-black px-6 md:px-12 py-12">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-blue-950">IT Solutions</h1>
        <p className="text-gray-500 mt-3">Tailored solutions to elevate your business growth.</p>
      </header>

      {/* Services Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-300"
          >
            <img src={service.image} alt={service.name} className="w-full h-52 object-cover rounded-t-2xl" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 text-center">{service.name}</h2>
              <ul className="mt-4 text-gray-600 text-sm space-y-2">
                {service.points.map((point, i) => (
                  <li key={i} className="flex items-center gap-2">
                    ✅ {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* Project Form */}
      <form
        className="bg-white rounded-2xl shadow-xl p-10 mt-12 max-w-3xl mx-auto border border-gray-300"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Project Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["startupName", "founderName", "email", "phoneNumber"].map((field, index) => (
            <div key={index}>
              <label className="text-gray-600 block mb-2 capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors[field] ? "border-red-500" : ""}`}
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}
        </div>

{/* Animated Checkbox for Service Selection */}
<div className="mt-6">
  <label className="text-gray-600 block mb-2">Select Services</label>
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    {services.map((service, index) => {
      const isChecked = formData.service.includes(service.name);

      return (
        <label
          key={index}
          className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
            isChecked ? "bg-blue-100 border-blue-500" : "border-gray-300 hover:border-blue-400"
          }`}
        >
          <input
            type="checkbox"
            value={service.name}
            checked={isChecked}
            onChange={() => {
              setFormData((prev) => {
                const updatedServices = isChecked
                  ? prev.service.filter((s) => s !== service.name) // Remove if already selected
                  : [...prev.service, service.name]; // Add new selection
                return { ...prev, service: updatedServices };
              });
            }}
            className="hidden"
          />
          <div
            className={`w-5 h-5 flex justify-center items-center border-2 rounded transition ${
              isChecked ? "bg-blue-500 border-blue-500 text-white" : "border-gray-400"
            }`}
          >
            {isChecked && <span>✔</span>}
          </div>
          <span className="ml-3 text-gray-700">{service.name}</span>
        </label>
      );
    })}
  </div>
  {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
</div>



        {/* Checkbox for Quote */}
<div className="mt-6 flex items-center">
<input
type="checkbox"
id="needQuote"
checked={needQuote}
onChange={() => setNeedQuote(!needQuote)}
className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
/>
<label htmlFor="needQuote" className="ml-2 text-gray-700 text-lg">
            Need to provide a quote
</label>
</div>

{needQuote && (
<div className="mt-4">
<label className="text-gray-600 block mb-1">Quote Amount (₹)</label>
<input
type="number"
value={quoteAmount}
onChange={(e) => setQuoteAmount(e.target.value)}
className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
/>
</div>
        )}

        <button type="submit" className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
          Submit
        </button>
      </form>
    </div>
  );
}