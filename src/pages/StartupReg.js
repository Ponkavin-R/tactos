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

  useEffect(() => {
    let current = 0;
    let forward = true;
    const interval = setInterval(() => {
      const currentText = typewriterTexts[currentIndex];
      if (forward) {
        setDisplayText(currentText.slice(0, current + 1));
        current++;
        if (current > currentText.length) forward = false;
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

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.includes(".com");
  };

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
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
      if (field.type === "email" && !validateEmail(formData[field.name])) {
        setErrorMessage("⚠️ Please enter a valid email address with '.com'");
        return;
      }
    }
    setErrorMessage("");
    setStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lastStepFields = sections[step].fields;
    for (let field of lastStepFields) {
      if (!formData[field.name] && !field.optional) {
        setErrorMessage(`⚠️ Please fill out: ${field.label}`);
        return;
      }
    }
    setErrorMessage("");
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
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/register`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setSubmitted(true);
    } catch (error) {
      setErrorMessage("Submission failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const restrictInput = (type, e) => {
    const value = e.nativeEvent.data;
    if (!value) return;
    if (type === "text" && /\d/.test(value)) {
      e.preventDefault();
    }
    if (type === "tel" && /\D/.test(value)) {
      e.preventDefault();
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
        { label: "Website (optional)", name: "website", type: "url", optional: true },
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

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-red-100 via-white to-orange-200 flex items-center justify-center py-2 px-2 md:mt-20 lg:mt-20">
      <div className="w-full max-w-6xl rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 text-center md:text-left p-4 sm:p-6"
        >
          <img src={cr} alt="cofounder" className="w-3/4 h-auto mx-auto animate-[bounce_3s_infinite]" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mt-4">
            {displayText}
            <span className="text-indigo-600 font-extrabold">|</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-sm mx-auto md:mx-0">
            Join a network of passionate individuals and connect with the right co-founder to build something amazing!
          </p>
        </motion.div>

        <div className="flex-1 bg-white p-8 shadow-2xl rounded-3xl border border-gray-200 w-screen  max-w-xl">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-3 text-gray-800">Startup Registration</h2>

          <div className="flex items-center justify-center space-x-2 mb-4">
            {sections.map((_, index) => (
              <span key={index} className={`h-2 w-8 rounded-full transition-all duration-300 ${
                index <= step ? "bg-indigo-600" : "bg-gray-300"
              }`} />
            ))}
          </div>

          {errorMessage && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-red-100 text-red-700 p-3 rounded text-sm mb-4 text-center"
            >
              {errorMessage}
            </motion.div>
          )}

          {submitted ? (
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-3">🎉 Registration Successful!</h2>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(0);
                  setFormData({});
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
              >
                Register Another Startup
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-sm ">
              <h3 className="text-base font-semibold text-center text-indigo-700 mb-2">
                {sections[step]?.title}
              </h3>

              {sections[step]?.fields.map((field, index) => (
                <div key={index} className="flex flex-col mb-1">
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
                      className="p-2 border border-gray-300 rounded-md"
                    >
                      {field.options.map((option, idx) => (
                        <option key={idx} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : field.type === "file" ? (
                    <div className="flex flex-col items-start gap-2">
                      <label className="text-gray-600">Upload:</label>
                      <label className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded cursor-pointer text-sm">
                        Choose File
                        <input
                          type="file"
                          name={field.name}
                          onChange={handleChange}
                          className="hidden"
                        />
                      </label>
                      {formData[field.name]?.name && (
                        <span className="text-gray-700 text-xs">{formData[field.name].name}</span>
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
                        <option key={idx} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      onBeforeInput={(e) => restrictInput(field.type, e)}
                      className="p-2 border border-gray-300 rounded-md"
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
        </div>
      </div>
    </div>
  );
}
