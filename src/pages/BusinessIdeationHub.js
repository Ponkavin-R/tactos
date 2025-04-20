import { useState } from "react";
import { motion, useScroll, useTransform  } from "framer-motion";
import axios from "axios";
import Typewriter from "typewriter-effect";
import ideaImage from "../assest/idea.png"; // Replace with your own image
import { BsLightbulbFill } from "react-icons/bs";
export default function BusinessIdeationHub() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  const sections = [
    {
      title: "Personal Information",
      fields: [
        { label: "Full Name", type: "text", name: "fullName", required: true },
        { label: "Email Address", type: "email", name: "email", required: true },
        { label: "Phone Number", type: "tel", name: "phoneNumber", required: true, validation: "10-digit" },
        { label: "Location (City, State)", type: "text", name: "location", required: true }
      ]
    },
    {
      title: "Professional Background",
      fields: [
        { label: "Current Role / Occupation", type: "text", name: "role", required: true },
        {
          label: "Industry Experience",
          type: "dropdown",
          name: "industryExperience",
          options: ["IT", "Healthcare", "Agriculture", "Finance", "Education", "Manufacturing", "Other"],
          required: true
        },
        {
          label: "Years of Experience",
          type: "dropdown",
          name: "yearsOfExperience",
          options: ["0–1", "2–5", "6–10", "10+"],
          required: true
        },
        {
          label: "Skillset",
          type: "multi-select",
          name: "skillset",
          options: ["Technology", "Marketing", "Finance", "Operations", "Sales", "Design", "Product Management", "Legal/Compliance"],
          required: true
        },
        { label: "Field of Study", type: "text", name: "fieldOfStudy", required: true }
      ]
    },
    {
      title: "Startup Readiness & Goals",
      fields: [
        { label: "Why do you want to start a business?", type: "textarea", name: "businessReason", required: true },
        {
          label: "What best describes your situation?",
          type: "radio",
          name: "situation",
          options: [
            "I have an idea and need validation",
            "I am looking for a business idea",
            "I have a business and want to scale it",
            "I need a co-founder"
          ],
          required: true
        },
        {
          label: "Are you open to co-founding a business with someone?",
          type: "radio",
          name: "coFounding",
          options: ["Yes", "No"],
          required: true
        }
      ]
    },
    {
      title: "Business Preferences",
      fields: [
        {
          label: "What industries interest you?",
          type: "multi-select",
          name: "interestedIndustries",
          options: ["AgriTech", "AI / Tech", "HealthTech", "EdTech", "FinTech", "E-commerce", "GreenTech", "Media & Content", "Travel / Hospitality", "Other"],
          required: true
        },
        {
          label: "What is your budget for starting a business?",
          type: "radio",
          name: "budget",
          options: ["Less than ₹1 lakh", "₹1–5 lakh", "₹5–10 lakh", "₹10 lakh+"],
          required: true
        },
        {
          label: "What kind of business model interests you?",
          type: "multi-select",
          name: "businessModel",
          options: ["Digital Startup (App, SaaS, AI-based)", "Service-based Business", "Retail / E-commerce", "Manufacturing / Production", "Social Impact / NGO", "Franchise Model", "Consulting / Freelance"],
          required: true
        }
      ]
    }
  ];




  const validateField = (field, value) => {
    if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
      return false;
    }

    if (field.name === "fullName") {
      const nameRegex = /^[A-Za-z\s]+$/;
      return nameRegex.test(value);
    }

    if (field.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }

    if (field.type === "tel") {
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(value);
    }

    if (field.type === "dropdown" || field.type === "radio") {
      return Boolean(value);
    }

    if (field.type === "multi-select") {
      return Array.isArray(value) && value.length > 0;
    }

    if (field.type === "textarea" || field.type === "text") {
      return value.trim().length > 0;
    }

    return true;
  };

  const handleMultiSelect = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({ ...prev, [e.target.name]: values }));
  };

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files.length > 1 ? [...files] : files[0]
      }));
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
    setStep((prev) => prev + 1);
  };

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
        `${process.env.REACT_APP_API_URL}/api/businessideation`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response.data);
      setSubmitted(true);
    } catch (error) {
      console.error("Submission failed", error);
      setErrorMessage("Submission failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-yellow-100 via-white to-blue-100 p-8">
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto">
{/* Left Content */}
<div className="flex flex-col items-center justify-center h-screen bg-transparent relative">

  {/* Bulb with powerful embedded glow */}
  <div className="relative z-10">
    {/* Layered glowing aura */}
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[40%] w-60 h-60 bg-yellow-400 rounded-full blur-[120px] opacity-90 animate-glow-fast"></div>
    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-[40%] w-36 h-36 bg-yellow-200 rounded-full blur-[80px] opacity-80 animate-glow-fast delay-200"></div>

    {/* Bulb Image */}
    <img
      src={ideaImage}
      alt="Bulb"
      className="w-full h-full z-20 relative drop-shadow-[0_0_80px_rgba(255,223,0,0.95)]"
    />
  </div>

  {/* Main Heading */}
  <h1 className="text-4xl md:text-5xl font-bold text-yellow-800 mt-10 z-20 text-center">
    Unlock Your Next Big Idea
  </h1>

  {/* Subheading with Typewriter Effect */}
  <div className="text-lg md:text-xl text-gray-700 mt-4 max-w-2xl text-center z-20 px-4">
    <Typewriter
      options={{
        strings: [
          "Tactos empowers entrepreneurs with expert guidance and innovation tools.",
          "Join our Business Ideation Hub to shape tomorrow.",
          "Validate. Plan. Launch. Succeed.",
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
            <h2 className="text-2xl font-bold text-yellow-700 text-center">
              Business Ideation Hub
            </h2>
            <p className="text-center text-gray-500">
              Share your startup idea and get expert support!
            </p>
          </div>

          <div className="flex items-center justify-center space-x-2 mb-6">
            {sections.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-10 rounded-full transition-all duration-300 ${
                  index <= step ? "bg-yellow-500" : "bg-gray-300"
                }`}
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
              <img
                src={ideaImage}
                alt="Success"
                className="w-40 h-40 mx-auto mb-6"
              />
              <h2 className="text-3xl font-bold text-green-500 mb-4">
                🎉 Submission Successful!
              </h2>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(0);
                  setFormData({});
                }}
                className="px-6 py-3 bg-yellow-600 text-white rounded-full hover:bg-yellow-700"
              >
                Submit Another Idea
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-lg font-semibold text-center mb-4">
                {sections[step]?.title}
              </h3>

              {sections[step]?.fields.map((field, index) => (
                <div key={index} className="flex flex-col space-y-1">
                  <label className="text-sm text-gray-600 font-medium">
                    {field.label}
                  </label>

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
                      rows={3}
                      className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                    ></textarea>
                  ) : field.type === "multi-select" ? (
                    <select
                      name={field.name}
                      multiple
                      value={formData[field.name] || []}
                      onChange={handleMultiSelect}
                      className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                    >
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
                      className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                    />
                  )}
                </div>
              ))}

              <div className="flex justify-between pt-4">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep((prev) => prev - 1)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Back
                  </button>
                )}
                {step < sections.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 bg-yellow-600 text-white rounded-full hover:bg-yellow-700"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-3 bg-yellow-600 text-white rounded-full hover:bg-yellow-700"
                    disabled={loading}
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
