import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Typewriter } from "react-simple-typewriter";
import cr from "../assest/cr.png";

export default function CoFounder() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateField = (field, value) => {
    if (field.optional) return true;
    if (!value || value === "") return false;
  
    switch (field.type) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "tel":
        return /^[0-9]{10}$/.test(value);
      case "number":
        return !isNaN(value);
      case "file":
        return value && typeof value === "object" && value.name; // << this is the fix
      default:
        return true;
    }
  };
  
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentFields = sections[step].fields;
    for (let field of currentFields) {
      if (!validateField(field, formData[field.name])) {
        setErrorMessage(`⚠️ Invalid or missing input in: ${field.label}`);
        return;
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
        `${process.env.REACT_APP_API_URL}/api/cofounderregister`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
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

  const handleMultiSelect = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({ ...prev, [e.target.name]: values }));
  };

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files.length > 0 ? files[0] : null }));
    } else {
      if (name === "phone") {
        // Only allow numbers and limit to 10 digits
        const cleanedValue = value.replace(/\D/g, ""); // Remove non-digits
        if (cleanedValue.length <= 10) {
          setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
        }
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  const handleNext = () => {
    const currentFields = sections[step].fields;
    for (let field of currentFields) {
      const value = formData[field.name];
      if (!validateField(field, value)) {
        setErrorMessage(`⚠️ Invalid or missing input in: ${field.label}`);
        return;
      }
    }
    setErrorMessage("");
    setStep((prevStep) => prevStep + 1);
  };

  const tamilNaduDistricts = [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri",
    "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri",
    "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur",
    "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur",
    "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur",
    "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
  ];

  const sections = [
    {
      title: "Personal Information",
      fields: [
        { label: "Full Name", name: "fullName", type: "text" },
        { label: "Email Address", name: "email", type: "email" },
        { label: "Phone Number", name: "phone", type: "tel" },
        { label: "LinkedIn Profile", name: "linkedin", type: "url", },
        {
          label: "Location",
          name: "location",
          type: "select",
          options: tamilNaduDistricts,
        },
      ],
    },
    {
      title: "Professional Background",
      fields: [
        { label: "Current Role/Occupation", name: "role", type: "text" },
        {
          label: "Areas of Expertise",
          name: "expertise",
          type: "select",
          options: ["Tech", "Marketing", "Sales", "Finance", "Operations", "Product"],
        },
        { label: "Years of Experience", name: "experience", type: "number" },
        { label: "Notable Achievements (if any)", name: "achievements", type: "textarea", optional: true },
      ],
    },
    {
      title: "Startup Interests",
      fields: [
        {
          label: "Industries Interested In",
          name: "industries",
          type: "multiselect",
          options: ["AI", "FinTech", "AgriTech", "EdTech", "HealthTech"],
        },
        {
          label: "Startup Stage Preference",
          name: "stagePreference",
          type: "select",
          options: ["Idea", "MVP", "Early Revenue", "Scaling"],
        },
        {
          label: "Preferred Business Model",
          name: "businessModel",
          type: "select",
          options: ["B2B", "B2C", "SaaS", "Marketplace"],
        },
      ],
    },
    {
      title: "Expectations & Contribution",
      fields: [
        {
          label: "Skills & Resources You Can Offer",
          name: "skills",
          type: "multiselect",
          options: ["Mentorship", "Investment", "Networking", "Tech Expertise"],
        },
        {
          label: "Expected Role in the Startup",
          name: "expectedRole",
          type: "select",
          options: ["Full-time Co-founder", "Part-time Advisor", "Investor"],
        },
        { label: "Investment Capacity (if applicable)", name: "investmentCapacity", type: "number", optional: true },
      ],
    },
    {
      title: "Additional Information",
      fields: [
        {
          label: "Do you want to be a cofounder?",
          name: "coFounder",
          type: "radio",
          options: ["Yes", "No"],
        },
        { label: "Resume or Portfolio", name: "resume", type: "file" },
      ],
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-screen bg-gradient-to-br from-yellow-100 via-white to-blue-100 px-4 py-12">
      {/* Left Side */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left"
      >
        <img
          src={cr}
          alt="cofounder illustration"
          className="w-3/4 justify-center h-auto mb-6 animate-[bounce_3s_3] motion-safe:transition-transform"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-6">
        Find Your Dream Co-Founder <span className="text-yellow-300">Through TACTOS</span>
        </h1>
        <p className="text-gray-600 mt-4 max-w-md">
          Join a network of passionate individuals and connect with the right co-founder to build something amazing!
        </p>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="md:w-1/2 bg-white p-4 rounded-lg shadow-2xl w-full max-w-md"
      >
        <h2 className="text-xl font-bold text-center text-gray-800 mb-2">CoFounder Registration</h2>
        <p className="text-center text-gray-500 mb-4 text-sm">Register now and take the first step toward your startup dream!</p>

        <div className="flex justify-center mb-4 space-x-2">
          {sections.map((_, index) => (
            <span
              key={index}
              className={`h-2 w-6 rounded-full transition-all duration-300 ${index <= step ? "bg-blue-500" : "bg-gray-300"}`}
            ></span>
          ))}
        </div>

        {errorMessage && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-red-100 text-red-600 p-2 rounded-lg mb-4 text-center text-sm"
          >
            {errorMessage}
          </motion.div>
        )}

        {submitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-500 mb-4">🎉 Registration Successful!</h2>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(0);
                setFormData({});
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 text-sm"
            >
              Register Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold text-center">{sections[step]?.title}</h3>
            {sections[step]?.fields.map((field, index) => (
              <div key={index} className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1 text-sm">{field.label}</label>
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
                      onClick={() => setFormData((prev) => ({ ...prev, [`${field.name}DropdownOpen`]: !prev[`${field.name}DropdownOpen`] }))}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-left"
                    >
                      {(formData[field.name] && formData[field.name].length > 0)
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
                  </div>) : field.type === "file" ? (
                  
                  <input
                    type="file"
                    name={field.name}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-xl shadow-sm text-sm"
                  />
                ) : field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-xl shadow-sm text-sm"
                  />
                ): field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">-- Select --</option>
                    {field.options.map((option, idx) => (
                      <option key={idx} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-xl shadow-sm text-sm"
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
                    className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
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
      </motion.div>
    </div>
  );
}
