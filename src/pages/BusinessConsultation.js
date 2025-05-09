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
  
    console.log("Form Data being sent:", formData);
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/businessconsultation`, formData);
      console.log("Response from server:", response.data);
    } catch (error) {
      if (error.response) {
        // Server responded with a status code other than 200 range
        console.error("Error response from server:", error.response.data);
        alert(error.response.data.message); // Show a message from the server
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something else caused the error
        console.error("Error in form submission:", error.message);
      }
    }
  };
  

  const sections = [
    {
      title: "Personal Information",
      fields: [
        { label: "Full Name", name: "fullName", type: "text" },
        { label: "Email Address", name: "email", type: "email" },
        { label: "Phone Number", name: "phone", type: "tel" },
        {
          label: "District",
          type: "select",
          name: "district",
          required: true,
          options: [
            "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
            "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram",
            "Kanniyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam",
            "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram",
            "Ranipet", "Salem", "Sivagangai", "Tenkasi", "Thanjavur", "Theni",
            "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur",
            "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore",
            "Viluppuram", "Virudhunagar"
          ],
        },
      ],
    },
    {
      title: "Business Information",
      fields: [
        { label: "Company Linkedin Profile", name: "linkedinProfile", type: "text" },
        { label: "Business Name (optional)", name: "businessName", type: "text" },
        { label: "Describe Your Business Briefly", name: "businessDescription", type: "textarea" },
        { label: "Website (optional)", name: "website", type: "text" },
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
    } else if (name === "phone") {
      // Allow only digits and limit to 10 digits
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
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
    <div className="min-h-screen w-full bg-gradient-to-br from-green-100 via-white to-blue-100 mt-12 p-8">
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto">
        {/* Left Side Content */}
        <div className="flex-1 text-left animate-fade-in-up">
          <img src={farmerAnimation} alt="Farmer" className="w-3/4 justify-center h-auto mb-6 animate-[bounce_3s_3] motion-safe:transition-transform" />
          <h1 className="text-4xl font-bold text-green-800 mb-4">Accelerate Your Growth with TACTOS</h1>
          <div className="text-sm md:text-base text-gray-700 text-left py-6 space-y-5">
  <p className="font-medium">Get expert advice, strategic insights, and customized solutions to overcome challenges and scale your business with confidence.
  </p>
  </div>
        </div>

        {/* Right Side Form */}
    <div className="flex-1 bg-white p-6 mt-4 shadow-2xl rounded-3xl border border-gray-200 w-screen max-w-xl max-h-screen overflow-auto">
      <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-blue-700 text-center">Business Consultation Registration</h2>
            <p className="text-center text-gray-500">Overcome roadblocks with strategic guidance!</p>
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
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          [`${field.name}DropdownOpen`]: !prev[`${field.name}DropdownOpen`],
                        }))
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-left"
                    >
                      {formData[field.name]?.length > 0
                        ? formData[field.name].join(", ")
                        : `Select ${field.label}`}
                    </button>
          
                    {formData[`${field.name}DropdownOpen`] && (
                      <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {field.options.map((option, idx) => (
                          <label key={idx} className="flex items-center p-3 hover:bg-gray-100 cursor-pointer">
                            <input
                              type="checkbox"
                              value={option}
                              checked={formData[field.name]?.includes(option) || false}
                              onChange={(e) => {
                                const selectedOptions = formData[field.name] || [];
                                if (e.target.checked) {
                                  setFormData((prev) => ({
                                    ...prev,
                                    [field.name]: [...selectedOptions, option],
                                  }));
                                } else {
                                  setFormData((prev) => ({
                                    ...prev,
                                    [field.name]: selectedOptions.filter((item) => item !== option),
                                  }));
                                }
                              }}
                              className="mr-2"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ) : field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">-- Select --</option>
                    {field.options.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
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
                ) : field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                  />
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
          
            <div className="flex justify-between mt-3">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Back
                </button>
              )}
              {step < sections.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-1 bg-green-600 text-white rounded hover:bg-indigo-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </form>
          
          )}
        </div>
      </div>
    </div>
  );
}
