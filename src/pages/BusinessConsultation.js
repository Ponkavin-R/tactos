import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import farmerAnimation from "../assest/bc.png";
import Typewriter from "typewriter-effect";

export default function BusinessConsultation() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateField = (field, value) => {
    if (!value) return false;
    if (field.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }
    if (field.type === "tel") {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(value);
    }
    if (field.type === "text" && field.name === "website" && value) {
      const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      return urlRegex.test(value);
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let section of sections) {
      for (let field of section.fields) {
        const isOptional = field.optional || false;
        const value = formData[field.name];
        if (!value && !isOptional && field.type !== "file") {
          alert(`Please fill out the required field: ${field.label}`);
          return;
        }
      }
    }
    setLoading(true);
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => formDataToSend.append(key, val));
      } else {
        formDataToSend.append(key, value);
      }
    });
    try {
      const response = await axios.post(
        "https://tactos-backend.onrender.com/api/businessconsultation",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Submission failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    {
      title: "Personal Information",
      fields: [
        { label: "Full Name", name: "fullName", type: "text" },
        { label: "Email Address", name: "email", type: "email" },
        { label: "Phone Number", name: "phone", type: "tel" },
        { label: "Location (City, State)", name: "location", type: "text" },
      ],
    },
    {
      title: "Business Information",
      fields: [
        { label: "Business Name (if applicable)", name: "businessName", type: "text" },
        {
          label: "Industry",
          name: "industry",
          type: "select",
          options: ["AgriTech", "AI/Tech", "HealthTech", "EdTech", "Retail", "Other"],
        },
        {
          label: "Business Stage",
          name: "businessStage",
          type: "select",
          options: ["Idea Stage", "MVP (Minimum Viable Product)", "Early Revenue", "Scaling Business"],
        },
        { label: "Website (if available)", name: "website", type: "text", optional: true },
      ],
    },
    {
      title: "Consultation Needs",
      fields: [
        {
          label: "What do you need help with?",
          name: "consultationNeeds",
          type: "multiselect",
          options: [
            "Business Idea Validation",
            "Market Research",
            "Business Strategy & Planning",
            "Fundraising & Investment Readiness",
            "Branding & Marketing",
            "Legal & Compliance",
            "Technology Development",
            "Scaling & Growth Strategy",
          ],
        },
        { label: "Describe Your Business Briefly", name: "businessDescription", type: "textarea" },
        { label: "Key Challenges You Are Facing", name: "keyChallenges", type: "textarea" },
      ],
    },
    {
      title: "Additional Information",
      fields: [
        {
          label: "Do you need ongoing mentorship?",
          name: "mentorship",
          type: "radio",
          options: ["Yes", "No"],
        },
        { label: "Any specific expectations from the consultation?", name: "consultationExpectations", type: "textarea" },
        { label: "Preferred Date & Time for Consultation", name: "preferredDateTime", type: "datetime-local" },
      ],
    },
    {
      title: "Submit & Payment",
      fields: [
        {
          label: "Upload Supporting Documents (Pitch Deck, Business Plan, etc.)",
          name: "supportingDocuments",
          type: "file",
          multiple: true,
        },
      ],
    },
  ];

  const handleMultiSelect = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({ ...prev, [e.target.name]: values }));
  };

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files.multiple ? [...files] : files[0] }));
    }
     else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    const currentFields = sections[step].fields;
    for (let field of currentFields) {
      const isOptional = field.optional || false;
      const value = formData[field.name];
      if (!value && !isOptional && field.type !== "file") {
        setErrorMessage(`⚠️ Please fill out: ${field.label}`);
        return;
      }
      if (!isOptional && !validateField(field, value)) {
        setErrorMessage(`⚠️ Invalid input in: ${field.label}`);
        return;
      }
    }
    setErrorMessage("");
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-100 via-white to-blue-100 p-8">
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto">
        {/* Left Side Content */}
        <div className="flex-1 text-left animate-fade-in-up">
  <img
    src={farmerAnimation}
    alt="Farmer"
    className="w-3/4 justify-center h-auto mb-6 animate-[bounce_3s_infinite] motion-safe:transition-transform"
  />
  <h1 className="text-4xl font-bold text-green-800 mb-4">
    Empowering Farmers & Entrepreneurs
  </h1>
  <div className="text-xl text-gray-700">
    <Typewriter
      options={{
        strings: [
          "Transforming AgriTech ideas into reality",
          "Boost your business with expert consultation",
          "Guidance from idea to scale",
        ],
        autoStart: true,
        loop: true,
      }}
    />
  </div>
</div>


        {/* Right Side Form */}
        <div className="flex-1 bg-white p-8 shadow-2xl rounded-3xl border border-gray-200 w-full max-w-xl">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-700 text-center">🚀 Business Consultation Registration</h2>
            <p className="text-center text-gray-500">Register your Startup and take the first step toward success!</p>
          </div>

          <div className="flex items-center justify-center space-x-2 mb-6">
            {sections.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-10 rounded-full transition-all duration-300 ${index <= step ? "bg-blue-500" : "bg-gray-300"}`}
              ></span>
            ))}
          </div>

          {errorMessage && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center"
            >
              {errorMessage}
            </motion.div>
          )}

          {submitted ? (
            <div className="text-center">
              <img src={farmerAnimation} alt="Success Farmer" className="w-40 h-40 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-green-500 mb-4">🎉 Registration Successful!</h2>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(0);
                  setFormData({});
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              >
                Register Another Startup
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-lg font-semibold text-center mb-4">{sections[step]?.title}</h3>
              {sections[step]?.fields.map((field, index) => (
                <div key={index} className="flex flex-col space-y-1">
                  <label className="text-sm text-gray-600 font-medium">{field.label}</label>
                  {field.type === "radio" ? (
                    field.options.map((option, idx) => (
                      <label key={idx} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={field.name}
                          value={option}
                          checked={formData[field.name] === option}
                          onChange={handleChange}
                          className="form-radio"
                        />
                        <span>{option}</span>
                      </label>
                    ))
                  ) : field.type === "multiselect" ? (
                    <select
                      name={field.name}
                      multiple
                      value={formData[field.name] || []}
                      onChange={handleMultiSelect}
                      className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                    >
                      {field.options.map((option, idx) => (
                        <option key={idx} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : field.type === "file" ? (
                    <input
  type="file"
  name={field.name}
  multiple={field.multiple}
  onChange={handleChange}
  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
/>

                  ) : field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                    >
                      <option value="" disabled>Select an option</option>
                      {field.options.map((option, idx) => (
                        <option key={idx} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      rows={3}
                      className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                    ></textarea>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                    />
                  )}
                </div>
              ))}

<div className="flex justify-between mt-6">
            {step > 0 && <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 bg-gray-300 text-gray-700 rounded-full">Back</button>}
            {step < sections.length-1 ? <button type="button" onClick={handleNext} className="px-6 py-3 bg-blue-600 text-white rounded-full">Next</button> : <button type="submit" className="px-6 py-3 bg-green-500 text-white rounded-full">Submit</button>}
          </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
