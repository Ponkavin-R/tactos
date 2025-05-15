import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Tab } from "@headlessui/react";
import { motion } from "framer-motion";
import { Transition } from "@headlessui/react";
import {
  FiMapPin,
  FiBriefcase,
  FiCalendar,
  FiDollarSign,
  FiUser,
  FiSmartphone,
  FiMail,
} from "react-icons/fi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Jobdetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="bg-white p-8 rounded-2xl shadow-2xl text-center"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-green-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </motion.svg>
        <h3 className="text-lg font-semibold text-gray-800">Application Submitted!</h3>
        <p className="text-sm text-gray-600">Your application has been successfully sent.</p>
      </motion.div>
    </div>
  );

  if (!job) {
    return <div className="text-center py-20 text-gray-500">Loading job details...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-24 bg-white rounded-3xl shadow-2xl p-6 md:p-10">
      <div className="flex flex-col md:flex-row gap-6">
{/* Other Jobs Sidebar */}
<div className="w-full md:w-1/3 bg-gray-100 p-5 rounded-xl shadow-md">
  <h3 className="text-2xl font-semibold text-gray-800">Other Jobs</h3>

  {/* Wrapper for horizontal scroll on small screens */}
  <div className="space-y-0 md:space-y-5 overflow-x-auto md:overflow-x-visible">
    <div className="flex md:flex-col gap-4 md:gap-0 min-w-max md:min-w-0">
      {otherJobs.slice(0, 10).map((job) => (
        <div
          key={job._id}
          className="min-w-[300px] md:min-w-0 bg-white p-5 rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition md:mb-4 flex-shrink-0"
        >
          {/* Header: Logo & Basic Info */}
          <div className="flex items-center gap-4 mb-4">
            <img src={job.logo || "https://via.placeholder.com/60"} alt={job.company} className="w-14 h-14 rounded-full object-cover border" />
            <div>
              <h4 className="text-lg font-semibold text-blue-900">{job.position}</h4>
              <p className="text-sm text-gray-500">{job.company}</p>
            </div>
          </div>

          {/* Tags: Role, Level, Contract */}
          <div className="flex flex-wrap gap-2 text-xs font-medium text-gray-700 mb-3">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{job.role}</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">{job.level}</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">{job.contract}</span>
          </div>

{/* Info: Location, Salary, Short Description */}
<div className="text-sm text-gray-600 space-y-2 mb-3">
  <div className="flex items-center gap-2">
    <FiMapPin className="text-slate-500" />
    <span className="font-medium">Location:</span>
    <span>{job.district}</span>
  </div>
  <div className="flex items-center gap-2">
    <FiDollarSign className="text-emerald-600" />
    <span className="font-medium">Salary:</span>
    <span>{job.salary || "Not Disclosed"}</span>
  </div>
  <p className="text-slate-600 italic w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
  {job.shortDescription}
</p>

</div>



          {/* View Job Button */}
          <Link
            to={`/jd/${job._id}`}
            className="inline-block w-full text-center bg-blue-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            View Job
          </Link>
        </div>
      ))}
    </div>
  </div>
</div>



        {/* Job Detail Section */}
        <div className="w-full md:w-2/3">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
  {/* Left: Logo and company info */}
  <div className="flex items-center gap-6">
    <img
      src={job.logo || "https://via.placeholder.com/60"}
      alt={job.company}
      className="w-20 h-20 rounded-full shadow"
    />
    <div>
      <h2 className="text-2xl font-semibold text-gray-800">{job.company}</h2>
      <div className="flex gap-2 mt-1">
        {job.isNew && (
          <span className="bg-blue-900 text-white px-3 py-1 rounded-full text-xs">New</span>
        )}
        {job.featured && (
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">Featured</span>
        )}
      </div>
    </div>
  </div>

  {/* Right: Apply Button */}
  <button
    onClick={() => setIsOpen(true)}
    className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition duration-300"
  >
    Apply
  </button>
</div>


          <Tab.Group>


            <Tab.Panels>
            <Tab.Panel>
  <div className="space-y-8 text-gray-800 text-[14px] leading-relaxed font-normal">
    
    {/* Job Overview */}
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-700">Job Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
        <div className="flex items-center gap-3">
          <FiBriefcase className="text-slate-500" />
          <span className="text-slate-700">{job.role} &mdash; {job.contract}</span>
        </div>
        <div className="flex items-center gap-3">
          <FiMapPin className="text-slate-500" />
          <span className="text-slate-700">{job.district}</span>
        </div>
        <div className="flex items-center gap-3">
          <FiDollarSign className="text-slate-500" />
          <span className="text-slate-700">₹{job.salary} / year</span>
        </div>
        <div className="flex items-center gap-3">
          <FiDollarSign className="text-slate-500" />
          <span className="text-slate-700">Experience: {job.experience} / year</span>
        </div>
        <div className="flex items-center gap-3">
          <FiCalendar className="text-slate-500" />
          <span className="text-slate-700">Posted: {new Date(job.postedAt).toDateString()}</span>
        </div>
        <div className="flex items-center gap-3">
          <FiCalendar className="text-slate-500" />
          <span className="text-slate-700">Join: {new Date(job.dateOfJoining).toDateString()}</span>
        </div>
      </div>
    </section>

    {/* Tools Required */}
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-700">Tools Required</h2>
      <div className="flex flex-wrap gap-3">
        {job.tools?.map((tool, index) => (
          <span
            key={index}
            className="bg-slate-100 text-slate-800 font-medium px-4 py-1.5 rounded-full shadow-sm hover:bg-slate-200 transition"
          >
            {tool}
          </span>
        ))}
      </div>
    </section>

    {/* Languages Required */}
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-700">Languages Required</h2>
      <div className="flex flex-wrap gap-3">
        {job.languages?.map((language, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-800 font-medium px-4 py-1.5 rounded-full shadow-sm hover:bg-gray-200 transition"
          >
            {language}
          </span>
        ))}
      </div>
    </section>

    {/* Job Description */}
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-700">Job Description</h2>
      {job.shortDescription && (
        <p className="text-slate-600 italic">{job.shortDescription}</p>
      )}
      <p className="text-slate-700 whitespace-pre-line">{job.longDescription}</p>
    </section>

    {/* Contact Section */}
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
        <FiUser className="text-slate-500" />
        Support / Contact
      </h2>
      <div className="space-y-2 pl-1">
        <div className="flex items-center gap-3">
          <FiSmartphone className="text-slate-500" />
          <span className="text-slate-700">{job.contactPhone}</span>
        </div>
        <div className="flex items-center gap-3">
          <FiMail className="text-slate-500" />
          <span className="text-slate-700">{job.contactEmail}</span>
        </div>
      </div>
    </section>
    {/* Apply Button */}
    <div className="pt-6">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition duration-200"
        >
          Apply Job
        </button>
      </div>

  </div>
</Tab.Panel>

{/* Modal */}
<Transition show={isOpen}>
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-end sm:items-center justify-center">
          <Transition.Child
            enter="transition duration-300 transform"
            enterFrom="translate-y-full opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition duration-200 transform"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-full opacity-0"
          >
            <div className="bg-white w-full max-w-md p-6 rounded-t-2xl sm:rounded-2xl shadow-xl">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Apply for this Job</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="file"
                  name="resume"
                  onChange={handleChange}
                  required
                  className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-emerald-600 file:text-white file:rounded-lg hover:file:bg-emerald-700"
                />
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Transition>


              {/* <Tab.Panel>
                <form onSubmit={handleSubmit} className="space-y-5 bg-gray-50 p-6 rounded-xl shadow">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <FiUser className="absolute left-3 top-3 text-gray-400" />
                      <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full pl-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-3 text-gray-400" />
                      <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="w-full pl-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="relative">
                      <FiSmartphone className="absolute left-3 top-3 text-gray-400" />
                      <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full pl-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <input type="file" name="resume" onChange={handleChange} required className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white file:rounded-lg hover:file:bg-blue-700" />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition">
                    Submit Application
                  </button>
                </form>
              </Tab.Panel> */}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      {showSuccessPopup && <SuccessPopup />}
    </div>
  );
};

export default Jobdetail;
