import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import cr from "../assest/cr.png";

export default function CoFounder() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        if (!value || !/^[A-Za-z\s]+$/.test(value)) {
          return "Full Name should contain only letters and spaces.";
        }
        break;
      case "email":
        if (!value || !/^[^\s@]+@gmail\.com$/.test(value)) {
          return "Email must be a valid Gmail address.";
        }
        break;
      case "phoneNumber":
        if (!value || !/^\d{10}$/.test(value)) {
          return "Phone Number must be exactly 10 digits.";
        }
        break;
      case "district":
        if (!value) {
          return "Please select a district.";
        }
        break;
      case "employmentStatus":
        if (!value) {
          return "Please select your employment status.";
        }
        break;
      case "industries":
        if (!value) {
          return "Please enter industries you're interested in.";
        }
        break;
      case "resume":
        if (!value) {
          return "Please upload your resume.";
        }
        break;
      default:
        break;
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentFields = sections[step].fields;
    for (let field of currentFields) {
      const error = validateField(field.name, formData[field.name]);
      if (error) {
        setErrorMessage(`⚠️ ${error}`);
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

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    if (type === "tel") {
      const cleanedValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
    } else if (type === "file") {
      const file = files[0];
      if (file && file.type !== "application/pdf") {
        setErrorMessage("⚠️ Only PDF files are allowed for CV upload.");
        return;
      } else {
        setErrorMessage("");
        setFormData((prev) => ({ ...prev, [name]: file }));
      }
    } else if (type === "text" && name === "fullName") {
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
      const error = validateField(field.name, formData[field.name]);
      if (error) {
        setErrorMessage(`⚠️ ${error}`);
        return;
      }
    }
    setErrorMessage("");
    setStep((prevStep) => prevStep + 1);
  };

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
        },
        {
          label: "LinkedIn Profile",
          type: "url",
          name: "linkedin",
          required: true,
          placeholder: "https://www.linkedin.com/in/yourname",
        },
        {
          label: "District",
          type: "select",
          name: "district",
          required: true,
          options: [
            "Ariyalur",
            "Chengalpattu",
            "Chennai",
            "Coimbatore",
            "Cuddalore",
            "Dharmapuri",
            "Dindigul",
            "Erode",
            "Kallakurichi",
            "Kanchipuram",
            "Kanyakumari",
            "Karur",
            "Krishnagiri",
            "Madurai",
            "Mayiladuthurai",
            "Nagapattinam",
            "Namakkal",
            "Nilgiris",
            "Perambalur",
            "Pudukkottai",
            "Ramanathapuram",
            "Ranipet",
            "Salem",
            "Sivaganga",
            "Tenkasi",
            "Thanjavur",
            "Theni",
            "Thoothukudi",
            "Tiruchirappalli",
            "Tirunelveli",
            "Tirupathur",
            "Tiruppur",
            "Tiruvallur",
            "Tiruvannamalai",
            "Tiruvarur",
            "Vellore",
            "Viluppuram",
            "Virudhunagar",
          ],
        },
      ],
    },
    {
      title: "Section 2: Professional Interests",
      fields: [
        {
          label: "Employment Status",
          type: "select",
          name: "employmentStatus",
          required: true,
          options: ["Employed", "Unemployed", "Student"],
        },
        {
          label: "Industries Interested In",
          type: "text",
          name: "industries",
          required: true,
        },
        {
          label: "Resume or Portfolio",
          type: "file",
          name: "resume",
          accept: ".pdf",
          required: true,
        },
      ],
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-red-100 via-white to-orange-200 flex items-center justify-center py-2 px-2 md:mt-20 lg:mt-4">
            <div className="w-full max-w-6xl rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
      {/* Left Side */}
{/* Left Content */}
<div className="md:w-1/2 p-4 sm:p-6 flex flex-col items-center text-center">
  {/* Bulb Glow with Centered Image */}
  <div className="relative z-10 w-60 h-60 md:w-72 md:h-72 flex justify-center items-center">
    {/* Outer Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 md:w-72 md:h-72  rounded-full blur-[100px] opacity-70"></div>
    {/* Inner Glow */}
    <div className="absolute top-1/2 left-1/2  w-48 h-48 rounded-full opacity-70"></div>
    {/* Bulb Image */}
    <img
      src={cr}
      alt="Bulb"
      className="w-full h-full z-20 relative "
    />
  </div>

  {/* Heading */}
  <h1 className="text-2xl md:text-3xl font-bold text-yellow-800 text-left mt-28">
    Find Your Dream Co-Founder <span className="text-yellow-300">Through TACTOS</span>
  </h1>

  {/* Description */}
  <p className="text-sm md:text-base text-gray-700 font-medium text-left mt-4 max-w-xl">
    Join a network of passionate individuals and connect with the right co-founder to build something amazing!
  </p>
</div>

      

      {/* Right Side - Form */}
      <div className="flex-1 bg-white p-8 mt-10 shadow-2xl rounded-3xl border border-gray-200 w-screen max-w-xl">

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
