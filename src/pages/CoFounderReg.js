import { useState } from "react";
import { motion } from "framer-motion";

export default function CoFounderRegistration() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const fields = [
    { label: "Startup Name", name: "startupName", type: "text", placeholder: "Enter your startup's name" },
    { label: "Founder Name", name: "founderName", type: "text", placeholder: "Enter founder's full name" },
    { label: "Email Address", name: "email", type: "email", placeholder: "Enter a valid email" },
    { label: "Phone Number", name: "phone", type: "tel", placeholder: "Enter contact number" },
    { label: "Business Category", name: "category", type: "text", placeholder: "E.g., Tech, Finance, Healthcare" },
    { label: "Funding Stage", name: "fundingStage", type: "text", placeholder: "Seed, Series A, B, etc." },
    { label: "Company Website", name: "website", type: "url", placeholder: "Enter your company website" },
  ];


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!formData[fields[step].name]) {
      setShowPopup(true);
      return;
    }
    setShowPopup(false);
    setStep(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData[fields[step].name]) {
      setShowPopup(true);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-3xl h-screen mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">🚀 CoFounder Registration</h2>
      <p className="text-center text-gray-500 mb-6">Register for CoFounder and take the first step toward success!</p>

      <div className="flex items-center justify-center space-x-2 mb-6">
        {fields.map((_, index) => (
          <span key={index} className={`h-2 w-10 rounded-full transition-all duration-300 ${index <= step ? "bg-blue-500" : "bg-gray-300"}`} />
        ))}
      </div>

      {submitted ? (
        <div className="text-center animate-fade-in">
          <h2 className="text-4xl font-bold text-green-500 mb-4">🎉 Registration Successful!</h2>
          <p className="text-gray-600 text-lg mb-6">Thank you for registering your startup. We will reach out to you soon!</p>
          <button onClick={() => setSubmitted(false)} className="px-6 py-3 bg-blue-950 text-white rounded-lg shadow hover:bg-blue-700 transition-all text-lg">
            Register Another Startup
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative w-full">
            <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col space-y-3"
              >
                <label className="text-gray-600 font-medium">{fields[step].label}</label>   
            <input
              type={fields[step].type}
              name={fields[step].name}
              value={formData[fields[step].name] || ""}
              onChange={handleChange}
              placeholder={fields[step].placeholder}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
            />
          </motion.div>

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-lg font-semibold text-red-500">⚠️ Missing Data</h3>
                <p className="text-gray-600 mb-4">Please fill out this field before proceeding.</p>
                <button onClick={() => setShowPopup(false)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">OK</button>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 0 && (
              <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition-all text-lg">
                Back
              </button>
            )}
            {step < fields.length - 1 ? (
              <button type="button" onClick={handleNext} className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all text-lg">
                Next
              </button>
            ) : (
              <button type="submit" className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all text-lg">
                Submit
              </button>
            )}
          </div>
        </form>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mt-12"
      >
        <h3 className="text-xl font-semibold text-gray-700">Want to learn more?</h3>
        <p className="text-gray-600 text-lg">Check out our resources for startup growth and funding opportunities.</p>
      </motion.div>
    </div>
  );
}
