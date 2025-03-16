import { useState } from "react";
import { motion } from "framer-motion";

export default function StartupRegistration() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sections =[
    {
      title: "Founder Details",
      fields: [
        { label: "Full Name", name: "fullName", type: "text" },
        { label: "Email Address", name: "email", type: "email" },
        { label: "Phone Number", name: "phone", type: "tel" },
        { label: "LinkedIn Profile (optional)", name: "linkedin", type: "url" },
      ],
    },
    {
      title: "Startup Details",
      fields: [
        { label: "Startup Name", name: "startupName", type: "text" },
        { label: "Industry", name: "industry", type: "select", options: ["Tech", "AgriTech", "FinTech", "HealthTech", "EdTech"] },
        { label: "Stage", name: "stage", type: "select", options: ["Idea", "MVP", "Early Revenue", "Scaling"] },
        { label: "Website", name: "website", type: "url" },
        { label: "LinkedIn Profile", name: "startupLinkedin", type: "url" },
        { label: "Startup Logo", name: "logo", type: "file" },
      ],
    },
    {
      title: "Business Information",
      fields: [
        { label: "Business Description (Short & Long)", name: "businessDescription", type: "textarea" },
        { label: "Unique Selling Proposition (USP)", name: "usp", type: "text" },
        { label: "Target Market", name: "targetMarket", type: "select", options: ["B2B", "B2C", "B2G"] },
        { label: "Year of Incorporation", name: "yearIncorporation", type: "number" },
        { label: "Registered Location (City, State)", name: "location", type: "text" },
      ],
    },
    {
      title: "Funding & Revenue",
      fields: [
        { label: "Have you received funding?", name: "receivedFunding", type: "radio", options: ["Yes", "No"] },
        { label: "Type", name: "fundingType", type: "select", options: ["Bootstrapped", "Angel", "VC", "Grants"], condition: { field: "receivedFunding", value: "Yes" } },
        { label: "Current Revenue Model", name: "revenueModel", type: "text" },
      ],
    },
    {
      title: "Team Details",
      fields: [
        { label: "Number of Founders", name: "founders", type: "number" },
        { label: "Team Size", name: "teamSize", type: "number" },
      ],
    },
    {
      title: "Do You Need a Co-founder?",
      fields: [
        { label: "Do You Need a Co-founder?", name: "needCoFounder", type: "radio", options: ["Yes", "No"] },
        { label: "Preferred Co-founder Expertise", name: "coFounderExpertise", type: "multiselect", options: ["Tech", "Marketing", "Sales", "Finance", "Operations", "Strategy"], condition: { field: "needCoFounder", value: "Yes" } },
        { label: "Commitment Level", name: "commitmentLevel", type: "select", options: ["Full-time", "Part-time", "Advisor"], condition: { field: "needCoFounder", value: "Yes" } },
        { label: "Preferred Industry Experience", name: "industryExperience", type: "text", condition: { field: "needCoFounder", value: "Yes" } },
        { label: "Key Responsibilities for Co-founder", name: "coFounderResponsibilities", type: "textarea", condition: { field: "needCoFounder", value: "Yes" } },
        { label: "Do You Expect Them to Invest?", name: "expectInvest", type: "radio", options: ["Yes", "No"], condition: { field: "needCoFounder", value: "Yes" } },
        { label: "Additional Expectations from Co-founder", name: "additionalExpectations", type: "textarea", condition: { field: "needCoFounder", value: "Yes" } },
      ],
    },
    {
      title: "Support Required",
      fields: [
        { label: "Type of Support Needed", name: "supportNeeded", type: "text" },
        { label: "Challenges Faced", name: "challenges", type: "textarea" },
      ],
    },
    {
      title: "Attachments",
      fields: [
        { label: "Pitch Deck", name: "pitchDeck", type: "file" },
        { label: "Business Registration Documents", name: "registrationDocs", type: "file" },
      ],
    }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    const currentFields = sections[step].fields;
    for (let field of currentFields) {
      if (!formData[field.name] && !field.condition) {
        setErrorMessage(`⚠️ Please fill out: ${field.label}`);
        return;
      }
    }
    setErrorMessage("");
    setStep(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-5xl h-fit mx-auto bg-white p-4 rounded-3xl shadow-xl mt-10 border border-gray-200" style={{backdropFilter: 'blur(20px)'}}>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">🚀 Startup Registration</h2>
      <p className="text-center text-gray-500 mb-6">Register your startup and take the first step toward success!</p>

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
          {sections[step].fields.map((field, index) =>
            !field.condition || field.condition ? (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col space-y-2"
              >
                <label className="text-gray-600 font-medium">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full p-4 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 transition-all shadow-md"
                />
              </motion.div>
            ) : null
          )}

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

            {step < sections.length - 1 ? (
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
