import { useState } from "react";
import { motion } from "framer-motion";

export default function Businessconsultation() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sections = [
    {
      title: "Personal Information",
      fields: [
        { label: "Full Name", name: "fullName", type: "text" },
        { label: "Email Address", name: "email", type: "email" },
        { label: "Phone Number", name: "phone", type: "tel" },
        { label: "Location (City, State)", name: "location", type: "text" },
      ],
    },
    {
      title: "Business Information",
      fields: [
        { label: "Business Name (if applicable)", name: "businessName", type: "text" },
        { 
          label: "Industry", 
          name: "industry", 
          type: "select", 
          options: ["AgriTech", "AI/Tech", "HealthTech", "EdTech", "Retail", "Other"] 
        },
        { 
          label: "Business Stage", 
          name: "businessStage", 
          type: "select", 
          options: ["Idea Stage", "MVP (Minimum Viable Product)", "Early Revenue", "Scaling Business"] 
        },
        { label: "Website (if available)", name: "website", type: "text" },
      ],
    },
    {
      title: "Consultation Needs",
      fields: [
        { 
          label: "What do you need help with?", 
          name: "consultationNeeds", 
          type: "multiselect", 
          options: [
            "Business Idea Validation", 
            "Market Research", 
            "Business Strategy & Planning", 
            "Fundraising & Investment Readiness", 
            "Branding & Marketing", 
            "Legal & Compliance", 
            "Technology Development", 
            "Scaling & Growth Strategy"
          ] 
        },
        { label: "Describe Your Business Briefly", name: "businessDescription", type: "textarea" },
        { label: "Key Challenges You Are Facing", name: "keyChallenges", type: "textarea" },
      ],
    },
    {
      title: "Additional Information",
      fields: [
        { 
          label: "Do you need ongoing mentorship?", 
          name: "mentorship", 
          type: "radio", 
          options: ["Yes", "No"] 
        },
        { label: "Any specific expectations from the consultation?", name: "consultationExpectations", type: "textarea" },
        { label: "Preferred Date & Time for Consultation", name: "preferredDateTime", type: "datetime-local" },
      ],
    },
    {
      title: "Submit & Payment",
      fields: [
        { 
          label: "Upload Supporting Documents (Pitch Deck, Business Plan, etc.)", 
          name: "supportingDocuments", 
          type: "file", 
          multiple: true 
        }
      ],
    },
  ];
  
  
  
  
  const handleMultiSelect = (e) => {
    const values = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, [e.target.name]: values });
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
    if (step < sections.length - 1) { // Ensure step does not go out of bounds
      const currentFields = sections[step].fields;
      for (let field of currentFields) {
        if (!formData[field.name] && !field.condition) {
          setErrorMessage(`⚠️ Please fill out: ${field.label}`);
          return;
        }
      }
      setErrorMessage("");
      setStep(step + 1);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-5xl h-fit mx-auto bg-white p-4 rounded-3xl shadow-xl mt-10 border border-gray-200" style={{backdropFilter: 'blur(20px)'}}>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">🚀 Business Consultation Registration</h2>
      <p className="text-center text-gray-500 mb-6">Register your Business Consultation Hub and take the first step toward success!</p>

<div className="flex items-center justify-center space-x-2 mb-6">

{sections.map((_, index) => (

<span

key={index}

className={`h-2 w-10 rounded-full transition-all duration-300 ${index <= step ? "bg-blue-500" : "bg-gray-300"}`}

/>

        ))}

</div>



      {errorMessage && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-red-100 text-red-600 p-4 rounded-lg mb-4 text-center"
        >
          {errorMessage}
        </motion.div>
      )}

      {submitted ? (
        <div className="text-center animate-fade-in">
          <h2 className="text-4xl font-bold text-green-500 mb-4">🎉 Registration Successful!</h2>
          <p className="text-gray-600 text-lg mb-6">We will reach out to you soon!</p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
          >
            Register Another Startup
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 shadow-xl p-2">
           <h3 className="text-lg font-semibold  justify-center text-center">{sections[step].title}</h3>
           {sections[step].fields.map((field, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col space-y-2"
  >
    <label className="text-gray-600 font-medium">{field.label}</label>

    {field.type === "select" ? (
  <select
    name={field.name}
    value={formData[field.name] || ""}
    onChange={handleChange}
    className="w-full p-4 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 transition-all shadow-md"
  >
    <option value="">Select an option</option>
    {field.options.map((option, idx) => (
      <option key={idx} value={option}>
        {option}
      </option>
    ))}
  </select>
) : field.type === "multiselect" ? (
  <select
    name={field.name}
    multiple
    value={formData[field.name] || []}
    onChange={handleMultiSelect}
    className="w-full p-4 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 transition-all shadow-md"
  >
    {field.options.map((option, idx) => (
      <option key={idx} value={option}>
        {option}
      </option>
    ))}
  </select>
) : field.type === "textarea" ? (
  <textarea
    name={field.name}
    value={formData[field.name] || ""}
    onChange={handleChange}
    className="w-full p-4 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 transition-all shadow-md"
  />
) : field.type === "file" ? (
  <input
    type="file"
    name={field.name}
    onChange={handleChange} // No 'value' for file input
    className="w-full p-4 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 transition-all shadow-md"
  />
) : (
  <input
    type={field.type}
    name={field.name}
    value={formData[field.name]}
    onChange={handleChange}
    className="w-full p-4 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 transition-all shadow-md"
  />
)}

  </motion.div>
))}


          <div className="flex justify-between mt-6">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-all"
              >
                Back
              </button>
            )}

            {step < sections.length -1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all"
              >
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
