import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function StartupReg() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      const response = await axios.post("https://tactos-backend.onrender.com/api/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
        { label: "Are you looking for an Incubation Centre?", name: "incubation", type: "radio", options: ["Yes", "No"] },
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
        { label: "Do you need a co-founder?", name: "coFounder", type: "radio", options: ["Yes", "No"] },
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
      setFormData((prev) => ({ ...prev, [name]: files.length > 0 ? files[0] : null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setSubmitted(true);
  // };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-xl mt-10 border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">🚀 Startup Registration</h2>
      <p className="text-center text-gray-500 mb-6">Register your Startup and take the first step toward success!</p>
      <div className="flex items-center justify-center space-x-2 mb-6">
        {sections.map((_, index) => (
          <span key={index} className={`h-2 w-10 rounded-full transition-all duration-300 ${index <= step ? "bg-blue-500" : "bg-gray-300"}`}></span>
        ))}
      </div>

      {errorMessage && (
        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="bg-red-100 text-red-600 p-4 rounded-lg mb-4 text-center">
          {errorMessage}
        </motion.div>
      )}

      {submitted ? (
        <div className="text-center animate-fade-in">
          <h2 className="text-4xl font-bold text-green-500 mb-4">🎉 Registration Successful!</h2>
          <button onClick={() => { setSubmitted(false); setStep(0); setFormData({}); }} className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all">
            Register Another Startup
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 shadow-xl p-4">
          <h3 className="text-lg font-semibold text-center">{sections[step]?.title}</h3>
          {sections[step]?.fields.map((field, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <label className="text-gray-600 font-medium">{field.label}</label>
              {field.type === "radio" ? (
                field.options.map((option, idx) => (
                  <label key={idx} className="flex items-center space-x-2">
                    <input type="radio" name={field.name} value={option} checked={formData[field.name] === option} onChange={handleChange} className="form-radio" />
                    <span>{option}</span>
                  </label>
                ))
              ) : field.type === "multiselect" ? (
                <select name={field.name} multiple value={formData[field.name] || []} onChange={handleMultiSelect} className="w-full p-4 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 transition-all shadow-md">
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                  ))}
                </select>
              ) : field.type === "file" ? (
                <input type="file" name={field.name} onChange={handleChange} className="w-full p-4 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 transition-all shadow-md" />
              ) : (
                <input type={field.type} name={field.name} value={formData[field.name] || ""} onChange={handleChange} className="w-full p-4 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 transition-all shadow-md" />
              )}
            </div>
          ))}

          <div className="flex justify-between mt-6">
            {step > 0 && <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 bg-gray-300 text-gray-700 rounded-full">Back</button>}
            {step < sections.length  ? <button type="button" onClick={handleNext} className="px-6 py-3 bg-blue-600 text-white rounded-full">Next</button> : <button type="submit" className="px-6 py-3 bg-green-500 text-white rounded-full">Submit</button>}
          </div>
        </form>
      )}
    </div>
  );
}
