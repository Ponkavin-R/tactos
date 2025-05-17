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
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otp, setOtp] = useState("");

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

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.endsWith(".com");

  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const validateField = (field, value) => {
    if (field.type === "email") return validateEmail(value);
    if (field.type === "tel") return validatePhone(value);
    return value !== "";
  };

  const handleSendOtp = async () => {
    if (!validateEmail(formData.email)) {
      setErrorMessage("Invalid email format.");
      return;
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/send-otp`, { email: formData.email });
      setOtpSent(true);
      setErrorMessage("");
    } catch (err) {
      setErrorMessage("Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/verify-otp`, {
        email: formData.email,
        otp,
      });
      if (res.data.success) {
        setEmailVerified(true);
        setErrorMessage("");
      } else {
        setErrorMessage("Incorrect OTP");
      }
    } catch {
      setErrorMessage("Verification failed");
    }
  };

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "tel") {
      const cleanedValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "file" ? files[0] : value,
      }));
    }
  };

  const handleMultiSelect = (name, value) => {
    setFormData((prev) => {
      const current = prev[name] || [];
      const isSelected = current.includes(value);
      const updated = isSelected ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [name]: updated };
    });
  };

  const handleNext = () => {
    if (sections[step].title === "Founder Details" && !emailVerified) {
      setErrorMessage("⚠️ Please verify your email before proceeding.");
      return;
    }
    const currentFields = sections[step].fields;
    for (let field of currentFields) {
      if (!field.optional) {
        const value = formData[field.name];
        if (!value || !validateField(field, value)) {
          setErrorMessage(`⚠️ Please correctly fill out: ${field.label}`);
          return;
        }
      }
    }
    setErrorMessage("");
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const lastFields = sections[step].fields;
    for (let field of lastFields) {
      if (!field.optional) {
        const value = formData[field.name];
        if (!value || !validateField(field, value)) {
          setErrorMessage(`⚠️ Please correctly fill out: ${field.label}`);
          return;
        }
      }
    }
    setErrorMessage("");
    setLoading(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => formDataToSend.append(key, v));
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
    if (type === "text" && /\d/.test(value)) e.preventDefault();
    if (type === "tel" && /\D/.test(value)) e.preventDefault();
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
      title: "Founder Details",
      fields: [
        { label: "Full Name", name: "fullName", type: "text" },
        { label: "Email Address", name: "email", type: "email" },
        { label: "Phone Number", name: "phone", type: "tel" },
        { label: "LinkedIn Profile", name: "linkedin", type: "url" },
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
          label: "Location",
          name: "location",
          type: "select",
          options: tamilNaduDistricts,
        },
        {
          label: "Are you looking for an Incubation Centre?",
          name: "incubation",
          type: "radio",
          options: ["Yes", "No"],
        },
        { label: "Pitch Deck Upload (optional)", name: "pitchDeck", type: "file" },
      ],
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-red-100 via-white to-orange-200 flex items-center justify-center py-2 px-2 md:mt-20 lg:mt-4">
      <div className="w-full max-w-6xl rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 text-center md:text-left p-4 sm:p-6"
        >
          <img src="https://img.freepik.com/free-vector/startup-construction-development-3d-thin-line-art-style-design-concept-isometric-illustration_1284-61110.jpg" alt="cofounder" className="w-3/4 justify-center h-auto mb-6 animate-[bounce_3s_3] motion-safe:transition-transform" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mt-4">
          Join the TACTOS Startup Ecosystem
            
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-sm mx-auto md:mx-0">
          Register now to access expert guidance, resources, and opportunities that accelerate your startup’s growth such as job portal, investment opportunities and incubation. 
          </p>
        </motion.div>

        <div className="flex-1 bg-white p-8 shadow-2xl rounded-3xl border border-gray-200 w-screen max-w-xl">
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
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <h3 className="text-base font-semibold text-center text-indigo-700 mb-2">
                {sections[step]?.title}
              </h3>

              {sections[step]?.fields.map((field, index) => (
                <div key={index} className="flex flex-col mb-1">
                  <label className="text-gray-700 font-medium mb-1">{field.label}</label>
{/* Email field with verify button */}
{field.type === "email" ? (
  <>
    <div className="flex gap-2 items-center">
      <div className="relative w-full">
        <input
          type="email"
          name={field.name}
          value={formData[field.name] || ""}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 pr-10" // Add padding to the right for icon
          disabled={emailVerified}
        />
        {emailVerified && (
  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600">
    <svg
      className="w-6 h-6 animate-tick"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="26"
        cy="26"
        r="25"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        className="tick-path"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        d="M14 27 L22 35 L38 19"
      />
    </svg>
  </span>
)}

      </div>
      {!emailVerified && (
        <button
          type="button"
          onClick={handleSendOtp}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Verify
        </button>
      )}
    </div>

    {/* OTP input field */}
    {otpSent && !emailVerified && (
      <div className="mt-2">
        <label className="block text-sm text-gray-600 mb-1">Enter OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-2"
          maxLength={6}
        />
        <button
          type="button"
          onClick={handleVerifyOtp}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Submit OTP
        </button>
      </div>
    )}
  </>
) 


                  :field.type === "radio" ? (
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
                    <div className="flex flex-wrap gap-2">
                      {field.options.map((option, idx) => (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => handleMultiSelect(field.name, option)}
                          className={`px-3 py-1 rounded-full border ${
                            formData[field.name]?.includes(option)
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
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

<div className="flex justify-between mt-4">
  {step > 0 && (
    <button
      type="button"
      onClick={() => setStep((prev) => prev - 1)}
      className="px-3 py-1.5 bg-gray-200 text-sm rounded hover:bg-gray-300"
    >
      Back
    </button>
  )}

  {step < 2 && (
    <button
      type="button"
      onClick={handleNext}
      className="ml-auto px-4 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 text-sm"
    >
      Next
    </button>
  )}

  {step === 2 && (
    <button
      type="submit"
      className="ml-auto px-4 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 text-sm"
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
