import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Tab } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMapPin,
  FiBriefcase,
  FiCalendar,
  FiDollarSign,
  FiUser,
  FiSmartphone,
  FiMail,
} from "react-icons/fi";
import { Link } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Jobdetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [otherJobs, setOtherJobs] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error("Failed to fetch job:", err);
      }
    };

    const fetchOtherJobs = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/jobs`);
        setOtherJobs(res.data.filter((item) => item._id !== id));
      } catch (err) {
        console.error("Failed to fetch other jobs:", err);
      }
    };

    fetchJob();
    fetchOtherJobs();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("resume", formData.resume);
    data.append("jobId", id);
    data.append("userId", job.userId); 
    data.append("company", job.company);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/jobapplied`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData({ name: "", email: "", phone: "", resume: null });
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 5000);
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Failed to submit application.");
    }
  };

  const SuccessPopup = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-3"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </motion.svg>
        <h3 className="text-lg font-semibold text-gray-800">Application Submitted!</h3>
        <p className="text-sm text-gray-600 text-center">Your application has been successfully sent.</p>
      </motion.div>
    </div>
  );

  if (!job) {
    return <div className="text-center py-10 text-gray-500">Loading job details...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 md:mt-32 lg:mt-40 bg-white rounded-3xl shadow-lg p-6 md:p-10 h-full">
      <div className="flex flex-col-reverse md:flex-row gap-6">
        {/* Left Side: Other Jobs */}
        <div className="w-full md:w-1/3 bg-gray-50 p-5 rounded-lg shadow-lg overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4">Other Jobs</h3>
          {/* Desktop View: Vertical layout */}
          <div className="hidden md:block space-y-4">
            {otherJobs.map((otherJob) => (
              <div key={otherJob._id} className="bg-white shadow-md rounded-2xl p-4 sm:p-6 my-4 border border-gray-300 hover:shadow-xl transition-transform duration-300">
                <div className="flex-shrink-0 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
                  <img className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-contain" src={otherJob.logo} alt={otherJob.company} />
                </div>
                <div className="flex flex-col justify-between flex-grow text-xs sm:text-sm">
                  <h2 className="text-sm sm:text-lg font-semibold text-blue-950 mt-2 sm:mt-0">{otherJob.position}</h2>
                  <div className="flex items-center space-x-2 mt-2 sm:mt-0 sm:flex-row sm:space-x-2">
                    <h3 className="text-blue-950 font-bold text-sm sm:text-base">{otherJob.company}</h3>
                    {otherJob.isNew && <span className="text-xxs bg-blue-950 text-white font-semibold px-2 py-0.5 rounded-full uppercase">New</span>}
                    {otherJob.featured && <span className="text-xxs bg-gray-800 text-white font-semibold px-2 py-0.5 rounded-full uppercase">Featured</span>}
                  </div>
                  <p className="text-gray-600 mt-2">
                    <strong>Role:</strong> {otherJob.role} | <strong>Level:</strong> {otherJob.level}
                  </p>
                  <div className="mt-4 sm:mt-0 sm:ml-auto w-fit">
                    <Link
                      to={`/jd/${otherJob._id}`}
                      className="bg-blue-950 text-white font-semibold text-xs sm:text-sm py-1.5 px-4 rounded-lg hover:bg-blue-800 transition"
                    >
                      View Job
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View: Horizontal Scroll */}
          <div className="block md:hidden flex gap-4 overflow-x-auto pb-4">
            {otherJobs.map((otherJob) => (
              <div key={otherJob._id} className="min-w-64 bg-white shadow-md rounded-2xl p-4 sm:p-6 my-4 border border-gray-300 hover:shadow-xl transition-transform duration-300">
                <div className="flex-shrink-0 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
                  <img className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-contain" src={otherJob.logo} alt={otherJob.company} />
                </div>
                <div className="flex flex-col justify-between flex-grow text-xs sm:text-sm">
                  <h2 className="text-sm sm:text-lg font-semibold text-blue-950 mt-2 sm:mt-0">{otherJob.position}</h2>
                  <div className="flex items-center space-x-2 mt-2 sm:mt-0 sm:flex-row sm:space-x-2">
                    <h3 className="text-blue-950 font-bold text-sm sm:text-base">{otherJob.company}</h3>
                    {otherJob.isNew && <span className="text-xxs bg-blue-950 text-white font-semibold px-2 py-0.5 rounded-full uppercase">New</span>}
                    {otherJob.featured && <span className="text-xxs bg-gray-800 text-white font-semibold px-2 py-0.5 rounded-full uppercase">Featured</span>}
                  </div>
                  <p className="text-gray-600 mt-2">
                    <strong>Role:</strong> {otherJob.role} | <strong>Level:</strong> {otherJob.level}
                  </p>
                  <div className="mt-4 sm:mt-0 sm:ml-auto w-fit">
                    <Link
                      to={`/jd/${otherJob._id}`}
                      className="bg-blue-950 text-white font-semibold text-xs sm:text-sm py-1.5 px-4 rounded-lg hover:bg-blue-800 transition"
                    >
                      View Job
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Job Description */}
        <div className="w-full md:w-2/3">
         {/* Company Header */}
               <div className="flex items-center gap-5 mb-8">
                 <img
                   src={job.logo || "https://via.placeholder.com/60"}
                   alt="Company Logo"
                   className="w-24 h-24 rounded-full object-cover shadow-md"
                 />
                 <div>
                   <h2 className="text-2xl font-semibold text-gray-900">{job.company}</h2>
                   <div className="flex items-center space-x-4">
           {(job.isNew || job.featured) && (
             <>
               {job.isNew && (
                 <span className="text-xs bg-blue-950 text-white font-semibold px-3 py-1 rounded-full uppercase">New</span>
               )}
               {job.featured && (
                 <span className="text-xs text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded-full">Featured</span>
               )}
             </>
           )}
         </div>
         
                 </div>
               </div>
         
               {/* Tabs */}
               <Tab.Group>
                 <Tab.List className="flex space-x-3 rounded-xl bg-gray-100 p-2 mb-6">
                   {["Job Description", "Apply"].map((tab) => (
                     <Tab
                       key={tab}
                       className={({ selected }) =>
                         classNames(
                           "w-full py-2.5 text-sm leading-5 font-semibold rounded-xl transition-all",
                           selected
                             ? "bg-blue-600 text-white shadow-md"
                             : "text-gray-600 hover:bg-white hover:shadow"
                         )
                       }
                     >
                       {tab}
                     </Tab>
                   ))}
                 </Tab.List>
         
                 <Tab.Panels>
                   {/* Job Description Panel */}
                   <Tab.Panel>
                     <div className="space-y-8 text-gray-800">
                       {/* Job Role */}
                       <section>
                         <h3 className="text-xl font-semibold mb-2">Job Role</h3>
                         <div className="flex items-center gap-2 text-sm">
                           <FiBriefcase className="text-blue-500" />
                           <span>{job.role} - {job.contract}</span>
                         </div>
                       </section>
         
                       {/* Employment Details */}
                       <section className="grid sm:grid-cols-2 gap-4 text-sm">
                         <div className="flex items-center gap-2">
                           <FiMapPin className="text-blue-500" />
                           <span>Location: {job.location}</span>
                         </div>
                         <div className="flex items-center gap-2">
                           <FiDollarSign className="text-green-600" />
                           <span>₹ {job.salary} per annum</span>
                         </div>
                         <div className="flex items-center gap-2">
                           <FiCalendar className="text-blue-500" />
                           <span>Posted on: {new Date(job.postedAt).toDateString()}</span>
                         </div>
                         <div className="flex items-center gap-2">
                           <FiCalendar className="text-blue-500" />
                           <span>Joining Date: {new Date(job.dateOfJoining).toDateString()}</span>
                         </div>
                         <div className="flex items-center gap-2">
                           <FiUser className="text-purple-500" />
                           <span>Experience: {job.experience} Years</span>
                         </div>
                       </section>
         
                       {/* Description */}
                       <section>
                         <h3 className="text-xl font-semibold mb-2">Job Description</h3>
                         <p className="text-sm leading-relaxed text-gray-700">
                           {job.description}
                         </p>
                       </section>
         
                       {/* Tools */}
                       <section>
                         <h3 className="text-xl font-semibold mb-4">Tools Required</h3>
                         <div className="text-sm text-gray-700">
                           <div className="flex flex-wrap w-10/12 gap-2">
                             {job.tools && job.tools.map((skill, index) => (
                               <span
                                 key={index}
                                 className="bg-blue-100 text-blue-900 font-semibold px-4 py-2 rounded-full transition-transform transform hover:scale-105 hover:bg-blue-200"
                               >
                                 {skill}
                               </span>
                             ))}
                           </div>
                         </div>
                       </section>
         
                                     {/*Languages */}
                                     <section>
                         <h3 className="text-xl font-semibold mb-4">Languages Required</h3>
                         <div className="text-sm text-gray-700">
                           <div className="flex flex-wrap w-10/12 gap-2">
                             {job.languages && job.languages.map((skill, index) => (
                               <span
                                 key={index}
                                 className="bg-blue-100 text-blue-900 font-semibold px-4 py-2 rounded-full transition-transform transform hover:scale-105 hover:bg-blue-200"
                               >
                                 {skill}
                               </span>
                             ))}
                           </div>
                         </div>
                       </section>
         
                       {/* Contact */}
                       <section>
                         <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                           <FiUser className="text-blue-500" />
                           <span>Support / Contact</span>
                         </h3>
                         <div className="flex flex-col gap-2 text-sm text-gray-700 ml-1">
                           <div className="flex items-center gap-2">
                             <FiSmartphone className="text-blue-500" />
                             <span>{job.contactPhone}</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <FiMail className="text-blue-500" />
                             <span>{job.contactEmail}</span>
                           </div>
                         </div>
                       </section>
                     </div>
                   </Tab.Panel>
         
                   {/* Apply Panel */}
                   <Tab.Panel>
                     <h2 className="text-xl font-semibold text-gray-800 mb-5">Apply Now</h2>
                     <form onSubmit={handleSubmit} className="space-y-5 max-w-sm mx-auto">
                       <div className="flex flex-col">
                         <label className="text-gray-600 font-medium mb-1">Full Name</label>
                         <input
                           type="text"
                           name="name"
                           value={formData.name}
                           required
                           onChange={handleChange}
                           className="rounded-xl px-4 py-3 bg-gray-100 border focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                         />
                       </div>
         
                       <div className="flex flex-col">
                         <label className="text-gray-600 font-medium mb-1">Email</label>
                         <input
                           type="email"
                           name="email"
                           value={formData.email}
                           required
                           onChange={handleChange}
                           className="rounded-xl px-4 py-3 bg-gray-100 border focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                         />
                       </div>
         
                       <div className="flex flex-col">
                         <label className="text-gray-600 font-medium mb-1">Phone Number</label>
                         <input
                           type="tel"
                           name="phone"
                           value={formData.phone}
                           required
                           onChange={handleChange}
                           className="rounded-xl px-4 py-3 bg-gray-100 border focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                         />
                       </div>
         
                       <div className="flex flex-col">
                         <label className="text-gray-600 font-medium mb-1">Upload Resume (PDF)</label>
                         <input
                           type="file"
                           name="resume"
                           accept=".pdf"
                           required
                           onChange={handleChange}
                           className="bg-white border rounded-xl px-4 py-3 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition"
                         />
                       </div>
         
                       <button
                         type="submit"
                         className="w-full py-3 mt-4 text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition"
                       >
                         Submit Application
                       </button>
                     </form>
                   </Tab.Panel>
                 </Tab.Panels>
               </Tab.Group>
        </div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>{showSuccessPopup && <SuccessPopup />}</AnimatePresence>
    </div>
  );
};

export default Jobdetail;
