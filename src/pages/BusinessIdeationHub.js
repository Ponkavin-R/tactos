import { useState } from "react";
import { motion } from "framer-motion";

export default function BusinessIdeationHub() {
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
      title: "Professional Background",
      fields: [
        { label: "Current Role/Occupation", name: "role", type: "text" },
        { label: "Industry Experience", name: "industry", type: "select", options: ["IT", "Healthcare", "Agriculture", "Finance", "Other"] },
        { label: "Years of Experience", name: "experience", type: "number" },
        { label: "Skillset", name: "skillset", type: "multiselect", options: ["Tech", "Marketing", "Finance", "Operations"] },
        { label: "Field of Study", name: "fieldOfStudy", type: "text" },
      ],
    },
    {
      title: "Startup Readiness & Goals",
      fields: [
        { label: "Why do you want to start a business?", name: "businessReason", type: "textarea" },
        { label: "What best describes you?", name: "businessStage", type: "select", options: [
            "I have an idea and need validation",
            "I am looking for a business idea",
            "I have a business and want to scale it",
            "I need a co-founder"
          ]
        },
        { label: "Are you open to co-founding a business with someone?", name: "cofoundingInterest", type: "radio", options: ["Yes", "No"] },
      ],
    },
    {
      title: "Business Preferences",
      fields: [
        { label: "What industries interest you?", name: "preferredIndustries", type: "multiselect", options: ["AgriTech", "AI/Tech", "HealthTech", "EdTech"] },
        { label: "What is your budget for starting a business?", name: "budget", type: "select", options: ["Less than ₹1 lakh", "₹1-5 lakh", "₹5-10 lakh", "₹10 lakh+"] },
        { label: "What kind of business model interests you?", name: "businessModel", type: "select", options: ["Digital Startup (App, SaaS, AI-based)", "Service-based Business", "Retail/E-commerce", "Manufacturing/Production", "Social Impact/NGO"] },
        { label: "What challenges do you need help with?", name: "challenges", type: "multiselect", options: [
            "Idea Validation",
            "Market Research",
            "Business Planning",
            "Finding a Co-founder",
            "Fundraising",
            "Technology Development",
            "Marketing & Sales"
          ]
        },
      ],
    },
    {
      title: "Additional Questions",
      fields: [
        { label: "Do you need mentorship or guidance?", name: "mentorship", type: "radio", options: ["Yes", "No"] },
        { label: "Would you like to join our startup community for networking?", name: "networking", type: "radio", options: ["Yes", "No"] },
        { label: "Any additional comments or specific requirements?", name: "additionalComments", type: "textarea" },
      ],
    }
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
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">🚀 Business Ideation Hub Registration</h2>
      <p className="text-center text-gray-500 mb-6">Register your Business Ideation Hub and take the first step toward success!</p>

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
