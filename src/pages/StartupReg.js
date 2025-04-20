import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import cr from "../assest/sr.png";

const typewriterTexts = [
  "Find Your Dream Co-Founder",
  "Build Ideas Together",
  "Start Something Big!",
];

export default function StartupReg() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Custom Typewriter Effect
  useEffect(() => {
    let current = 0;
    let forward = true;

    const interval = setInterval(() => {
      const currentText = typewriterTexts[currentIndex];

      if (forward) {
        setDisplayText(currentText.slice(0, current + 1));
        current++;
        if (current > currentText.length) {
          forward = false;
          setTimeout(() => {}, 1000);
        }
      } else {
        setDisplayText(currentText.slice(0, current - 1));
        current--;
        if (current === 0) {
          forward = true;
          setCurrentIndex((prev) => (prev + 1) % typewriterTexts.length);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        `${process.env.REACT_APP_API_URL}/api/register`,
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
      title: "Founder Details",
      fields: [
        { label: "Full Name", name: "fullName", type: "text" },
        { label: "Email Address", name: "email", type: "email" },
        { label: "Phone Number", name: "phone", type: "tel" },
        { label: "LinkedIn Profile (optional)", name: "linkedin", type: "url", optional: true },
      ],
    },
    {
      title: "Startup Details",
      fields: [
        { label: "Startup Name", name: "startupName", type: "text" },
        {
          label: "Industry",
          name: "industry",
          type: "select",
          options: ["Tech", "AgriTech", "FinTech", "HealthTech", "EdTech"],
        },
        {
          label: "Stage",
          name: "stage",
          type: "select",
          options: ["Idea", "MVP", "Early Revenue", "Scaling"],
        },
        { label: "Website (if available)", name: "website", type: "url", optional: true },
        { label: "Location", name: "location", type: "text" },
        {
          label: "Are you looking for an Incubation Centre?",
          name: "incubation",
          type: "radio",
          options: ["Yes", "No"],
        },
        { label: "Pitch Deck Upload", name: "pitchDeck", type: "file" },
      ],
    },
    {
      title: "Support Required",
      fields: [
        {
          label: "Type of Support Needed",
          name: "support",
          type: "multiselect",
          options: ["Mentorship", "Funding", "Market Access", "Product Development"],
        },
        {
          label: "Do you need a co-founder?",
          name: "coFounder",
          type: "radio",
          options: ["Yes", "No"],
        },
      ],
    },
  ];

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files.length > 0 ? files[0] : null,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelect = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({ ...prev, [e.target.name]: values }));
  };

  const handleNext = () => {
    const currentFields = sections[step].fields;
    for (let field of currentFields) {
      if (!formData[field.name] && field.type !== "file" && !field.optional) {
        setErrorMessage(`⚠️ Please fill out: ${field.label}`);
        return;
      }
    }
    setErrorMessage("");
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-red-100 via-white to-orange-200 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-7xl rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Side */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left p-6"
        >
          <img
            src={cr}
            alt="cofounder"
            className="w-3/4 h-auto mx-auto  animate-[bounce_3s_infinite]"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-6">
            {displayText}
            <span className="text-indigo-600 font-extrabold">|</span>
          </h1>
          <p className="text-gray-600 mt-4 max-w-md mx-auto md:mx-0">
            Join a network of passionate individuals and connect with the right co-founder to build something amazing!
          </p>
        </motion.div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8 md:p-10 bg-white">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Startup Registration</h2>
          <div className="flex items-center justify-center space-x-2 mb-6">
            {sections.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-10 rounded-full transition-all duration-300 ${
                  index <= step ? "bg-indigo-600" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>

          {errorMessage && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-red-100 text-red-700 p-4 rounded-lg text-center mb-4"
            >
              {errorMessage}
            </motion.div>
          )}

          {submitted ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Registration Successful!</h2>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(0);
                  setFormData({});
                }}
                className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700"
              >
                Register Another Startup
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-lg font-semibold text-center text-indigo-700 mb-2">
                {sections[step]?.title}
              </h3>
              {sections[step]?.fields.map((field, index) => (
                <div key={index} className="flex flex-col mb-2">
                  <label className="text-gray-700 font-medium mb-1">{field.label}</label>
                  {field.type === "radio" ? (
                    field.options.map((option, idx) => (
                      <label key={idx} className="flex items-center space-x-2 mb-1">
                        <input
                          type="radio"
                          name={field.name}
                          value={option}
                          checked={formData[field.name] === option}
                          onChange={handleChange}
                          className="accent-indigo-600"
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
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
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
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-lg"
                    />
                  ) : field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">-- Select --</option>
                      {field.options.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  )}
                </div>
              ))}

              <div className="flex justify-between mt-4">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400"
                  >
                    Back
                  </button>
                )}
                {step < sections.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
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
