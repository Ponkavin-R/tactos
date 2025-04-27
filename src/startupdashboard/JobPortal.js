import React, { useState } from "react";
import { Pencil, Trash2, EyeOff, Plus } from "lucide-react";

const districts = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul",
  "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai",
  "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet",
  "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli",
  "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur",
  "Vellore", "Viluppuram", "Virudhunagar"
];

const JobPortal = () => {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    image: "",
    location: "",
    mode: "",
    salary: "",
    type: "",
    keyword: "",
    shortDescription: "",
    description: "",
    status: "active"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddJob = () => {
    if (jobs.length >= 5) return alert("Maximum 5 jobs allowed");
    setJobs([...jobs, newJob]);
    setNewJob({
      title: "",
      image: "",
      location: "",
      mode: "",
      salary: "",
      type: "",
      keyword: "",
      shortDescription: "",
      description: "",
      status: "active"
    });
    setShowForm(false);
  };

  const handleDelete = (index) => {
    const updated = jobs.filter((_, i) => i !== index);
    setJobs(updated);
  };

  const handleDisable = (index) => {
    const updated = jobs.map((job, i) => i === index ? { ...job, status: "disabled" } : job);
    setJobs(updated);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Job Portal</h2>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            <Plus size={18} /> Add New Job
          </button>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-5 border">
              <img src={job.image || "https://via.placeholder.com/150"} alt="Job" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{job.title}</h3>
              <p className="text-sm text-gray-500 mb-1">Location: {job.location}</p>
              <p className="text-sm text-gray-500 mb-1">Mode: {job.mode}</p>
              <p className="text-sm text-gray-500 mb-1">Salary: ₹{job.salary}</p>
              <p className="text-sm text-gray-500 mb-1">Type: {job.type}</p>
              <p className="text-sm text-gray-500 mb-1">Keywords: {job.keyword}</p>
              <p className="text-sm text-gray-500 mb-1">Status: {job.status}</p>
              <div className="flex gap-3 mt-4">
                <button className="text-blue-500 hover:underline flex items-center gap-1"><Pencil size={16}/> Edit</button>
                <button onClick={() => handleDelete(index)} className="text-red-500 hover:underline flex items-center gap-1"><Trash2 size={16}/> Delete</button>
                <button onClick={() => handleDisable(index)} className="text-yellow-500 hover:underline flex items-center gap-1"><EyeOff size={16}/> Disable</button>
              </div>
            </div>
          ))}
        </div>

        {/* Popup Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl">
              <h3 className="text-xl font-semibold mb-4">Add New Job</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="title" value={newJob.title} onChange={handleChange} placeholder="Position Title" className="border p-2 rounded" />
                <input name="image" value={newJob.image} onChange={handleChange} placeholder="Image URL" className="border p-2 rounded" />
                <select name="location" value={newJob.location} onChange={handleChange} className="border p-2 rounded">
                  <option value="">Select Location</option>
                  {districts.map((district, idx) => <option key={idx} value={district}>{district}</option>)}
                </select>
                <select name="mode" value={newJob.mode} onChange={handleChange} className="border p-2 rounded">
                  <option value="">Select Mode</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="on-site">On-site</option>
                </select>
                <input name="salary" value={newJob.salary} onChange={handleChange} placeholder="Salary" className="border p-2 rounded" />
                <select name="type" value={newJob.type} onChange={handleChange} className="border p-2 rounded">
                  <option value="">Select Type</option>
                  <option value="part-time">Part-Time</option>
                  <option value="full-time">Full-Time</option>
                  <option value="internship">Internship</option>
                </select>
                <input name="keyword" value={newJob.keyword} onChange={handleChange} placeholder="Keyword (max 3 words)" className="border p-2 rounded" />
                <input name="shortDescription" value={newJob.shortDescription} onChange={handleChange} placeholder="Short Description" className="border p-2 rounded" />
              </div>
              <textarea name="description" value={newJob.description} onChange={handleChange} placeholder="Job Description" className="border p-2 rounded w-full mt-4" rows={3} />
              <div className="flex justify-end mt-4 gap-2">
                <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                <button onClick={handleAddJob} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Add Job</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPortal;
