import { useState } from "react";
import { motion, useScroll, useTransform  } from "framer-motion";
import axios from "axios";
import Typewriter from "typewriter-effect";
import ideaImage from "../assest/idea.png"; // Replace with your own image
import { BsLightbulbFill } from "react-icons/bs";
export default function BusinessIdeationHub() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    district: "",
    linkedin: "",
    employmentStatus: "",
    cv: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  const sections = [
    {
      title: "Section 1: Personal Information",
      fields: [
        {
          label: "Full Name",
          type: "text",
          name: "fullName",
          required: true,
        },
        {
          label: "Email Address",
          type: "email",
          name: "email",
          required: true,
        },
        {
          label: "Phone Number",
          type: "tel",
          name: "phoneNumber",
          required: true,
          validation: "10-digit",
        },
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
      title: "Section 2: Professional Information",
      fields: [
        {
          label: "LinkedIn Profile",
          type: "url",
          name: "linkedin",
          required: true,
          placeholder: "https://www.linkedin.com/in/yourname",
        },
        {
          label: "Employment Status",
          type: "radio",
          name: "employmentStatus",
          required: true,
          options: ["Employed", "Unemployed", "Studying"],
        },
        {
          label: "Upload CV",
          type: "file",
          name: "cv",
          required: true,
          accept: ".pdf",
        },
      ],
    },
  ];

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        if (!/^[A-Za-z\s]+$/.test(value)) {
          return "Full Name should contain only letters and spaces.";
        }
        break;
      case "email":
        if (!/^[^\s@]+@gmail\.com$/.test(value)) {
          return "Email must be a valid Gmail address.";
        }
        break;
      case "phoneNumber":
        if (!/^\d{10}$/.test(value)) {
          return "Phone Number must be exactly 10 digits.";
        }
        break;
      // case "linkedin":
      //   if (value && !/^https?:\/\/.+\..+/.test(value)) {
      //     return "LinkedIn URL must be a valid URL.";
      //   }
        // break;
      default:
        break;
    }
    return "";
  };
  
  
  

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
  
    if (type === "tel") {
      // Allow only digits and limit to 10
      const cleanedValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
    }else if (type === "file") {
      const file = files[0];
      if (file && file.type !== "application/pdf") {
        setErrorMessage("⚠️ Only PDF files are allowed for CV upload.");
        return;
      } else {
        setErrorMessage("");
        setFormData((prev) => ({ ...prev, [name]: file }));
      }
    }
    // else if (name === "linkedin") {
    //   const linkedinPattern = /^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/;
    //   if (!linkedinPattern.test(value)) {
    //     setErrorMessage("⚠️ Please enter a valid LinkedIn profile URL.");
    //   } else {
    //     setErrorMessage("");
    //     setFormData((prev) => ({ ...prev, [name]: value }));
    //   }
    // } 
     else if (type === "text" && name === "fullName") {
      // Allow only letters and spaces
      const cleanedValue = value.replace(/[^A-Za-z\s]/g, "");
      setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "file" ? files[0] : value,
      }));
    }
  };
  

  const handleNext = () => {
    const currentFields = sections[step].fields;
    for (let field of currentFields) {
      const isOptional = field.required === false;
      const value = formData[field.name];
      if (!value && !isOptional) {
        setErrorMessage(`⚠️ Please fill out: ${field.label}`);
        return;
      }
      const validationError = validateField(field.name, value);
      if (validationError) {
        setErrorMessage(`⚠️ ${validationError}`);
        return;
      }
    }
    setErrorMessage("");
    setStep((prev) => prev + 1);
  };
  const handleMultiSelect = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({ ...prev, [e.target.name]: values }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate the last section before submitting
    const currentFields = sections[step].fields;
    for (let field of currentFields) {
      const isOptional = field.required === false;
      const value = formData[field.name];
      if (!value && !isOptional) {
        setErrorMessage(`⚠️ Please fill out: ${field.label}`);
        setLoading(false);
        return;
      }
    }

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
        `${process.env.REACT_APP_API_URL}/api/businessideationhub`,
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
    <div className="w-full min-h-screen bg-gradient-to-br from-red-100 via-white to-orange-200 flex items-center justify-center py-2 px-2 md:mt-20 lg:mt-4">
      <div className="w-full max-w-6xl rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
    {/* Left Content */}
    <div className="md:w-1/2 text-center md:text-left p-4 sm:p-6">
      {/* Bulb Glow */}
      <div className="flex justify-center items-center">
      <div className="flex flex-col items-center text-center">
  {/* Enlarged Image with Glow */}
  <div className="relative z-10 w-60 h-60 md:w-72 md:h-72">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 md:w-72 md:h-72 bg-yellow-400 rounded-full blur-[100px] opacity-70 animate-glow-fast"></div>
    <div className="absolute top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-yellow-200 rounded-full blur-[60px] opacity-70 animate-glow-fast delay-200"></div>
    <img
      src={ideaImage}
      alt="Bulb"
      className="w-full h-full z-20 relative drop-shadow-[0_0_40px_rgba(255,223,0,0.85)]"
    />
  </div>

  {/* Heading */}
  <h1 className="text-2xl md:text-3xl text-left font-bold text-yellow-800 mt-6">
    Unlock Your Next Big Idea with TACTOS
  </h1>

  {/* Description */}
  <div className="text-sm md:text-base text-gray-700 text-center py-6 max-w-xl">
    <p className="font-medium text-left">
      We help you shape raw ideas into startup-ready concepts through expert guidance, real-world validation, and tailored resources — all in one place.
    </p>
  </div>
</div>
</div>


    </div>

    {/* Right Side Form */}
    <div className="flex-1 bg-white p-8 mt-6 shadow-2xl rounded-3xl border border-gray-200 w-screen max-w-xl">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-yellow-700">
          Business Ideation Hub
        </h2>
        <p className="text-sm text-gray-500">
        Bring your startup idea to life!
        </p>
      </div>

      <div className="flex justify-center space-x-1 mb-4">
        {sections.map((_, index) => (
          <span
            key={index}
            className={`h-1.5 w-8 rounded-full transition-all duration-300 ${
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
          className="bg-red-100 text-red-600 p-2 rounded-md mb-3 text-sm"
        >
          {errorMessage}
        </motion.div>
      )}

      {submitted ? (
        <div className="text-center">
          <img
            src={ideaImage}
            alt="Success"
            className="w-24 h-24 mx-auto mb-4"
          />
          <h2 className="text-xl font-bold text-green-500 mb-3">
            🎉 Submission Successful!
          </h2>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(0);
              setFormData({});
            }}
            className="px-4 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 text-sm"
          >
            Create Another Idea 
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-md font-semibold text-center">
            {sections[step]?.title}
          </h3>

          {sections[step] && sections[step].fields && sections[step].fields.map((field, index) => (
            <div key={index} className="flex flex-col space-y-1 text-sm">
              <label className="text-gray-600 font-medium">
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
                  className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                />
              ) : field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  rows={3}
                  className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                ></textarea>
              ) : field.type === "multi-select" ? (
                <select
                  name={field.name}
                  multiple
                  value={formData[field.name] || []}
                  onChange={handleMultiSelect}
                  className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                >
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
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
                  className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                />
              )}
            </div>
          ))}

          <div className="flex justify-between pt-2">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="px-3 py-1.5 bg-gray-200 text-sm rounded hover:bg-gray-300"
              >
                Back
              </button>
            )}
           {step === 0 && (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 text-sm"
              >
                Next
              </button>
            )}
            {step > 0 &&
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 text-sm"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            }
          </div>
        </form>
      )}
    </div>
  </div>
</div>

  );
}