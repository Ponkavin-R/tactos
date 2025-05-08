// --- React Component: AdminCareers.js ---
import React, { useEffect, useState } from "react";
import axios from "axios";

const initialForm = {
  company: "",
  logo: "",
  isNew: false,
  featured: false,
  position: "",
  role: "",
  level: "",
  postedAt: "",
  contract: "",
  district: "",
  salary: "",
  experience: "",
  dateOfJoining: "",
  languages: "",
  tools: "",
};

const districtsOfTamilNadu = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
  "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram",
  "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam",
  "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram",
  "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni",
  "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur",
  "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur",
  "Vellore", "Viluppuram", "Virudhunagar"
];


const JobPortal = () => {
  const [careers, setCareers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);

  useEffect(() => {
    fetchCareers();
  }, []);

  const getResumeURL = () => {
    const url = selectedApplication.resumeUrl || "";
    if (url.startsWith("http")) return url;
    return `${process.env.REACT_APP_API_URL}${url.startsWith("/") ? url : "/" + url}`;
  };
  

  const fetchCareers = async () => {
    try {
      const localUserId = localStorage.getItem('startupId'); // ✅ Consistent key
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/jobs`);
  
      // ✅ Ensure consistent field name 'userId'
      const userCareers = res.data.filter(job => String(job.userId) === String(localUserId));
      
      console.log("Filtered careers for user:", userCareers);
      setCareers(userCareers);
    } catch (error) {
      console.error("Error fetching careers:", error);
    }
  };
  
  
  

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "logo" && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    }
  };
  const downloadResume = async () => {
    try {
      const url = getResumeURL();
      const fileName = url.split('/').pop() || 'resume.pdf';
  
      const response = await axios.get(url, {
        responseType: 'blob', // ensure we get binary data
      });
  
      // Create a blob URL
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const blobUrl = window.URL.createObjectURL(blob);
  
      // Create temporary <a> tag to trigger download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Failed to download resume:', error);
      alert('Error downloading resume. Please try again.');
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("startupId"); // assumes you store userId at login
    if (!userId) return alert("User not logged in.");

    const payload = {
      ...formData,
      userId, // attach logged-in user
      languages: formData.languages.split(",").map((x) => x.trim()),
      tools: formData.tools.split(",").map((x) => x.trim()),
    };

    if (editingId) {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/jobs/${editingId}`, payload);
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/jobs`, payload);
    }

    setFormData(initialForm);
    setEditingId(null);
    setShowModal(false);
    fetchCareers();
  };

  const fetchApplications = async (jobId) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/jobapplied/${jobId}`);
      setApplications(res.data);
      setShowApplicationsModal(true);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const handleEdit = (career) => {
    setFormData({
      ...career,
      languages: career.languages.join(", "),
      tools: career.tools.join(", "),
    });
    setEditingId(career._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/jobs/${id}`);
    fetchCareers();
  };

  const handlePreviewResume = (application) => {
    setSelectedApplication(application);
    setShowResumeModal(true);
  };
  

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Created Jobs</h2>
        <button
          onClick={() => {
            setFormData(initialForm);
            setEditingId(null);
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Add New Career
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {careers.map((career) => (
          <div key={career._id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500 space-y-2">
            <div className="flex items-start gap-4">
              <img src={career.logo} alt="logo" className="w-12 h-12 object-contain rounded" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{career.company}</h3>
                  {career.isNew && <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">NEW!</span>}
                  {career.featured && <span className="bg-black text-white px-2 py-1 rounded-full text-xs">FEATURED</span>}
                </div>
                <p className="text-blue-700 font-medium">{career.position}</p>
                <p className="text-sm text-gray-600">{career.role} • {career.level}</p>
                <p className="text-sm text-gray-600">{career.postedAt} • {career.contract} • {career.district}</p>
                <p className="text-sm text-gray-600">Salary: {career.salary}</p>
                <p className="text-sm text-gray-600">Experience: {career.experience}</p>
                <p className="text-sm text-gray-600">Joining: {career.dateOfJoining}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {career.languages.map((lang, i) => <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{lang}</span>)}
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {career.tools.map((tool, i) => <span key={i} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">{tool}</span>)}
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <button onClick={() => handleEdit(career)} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded">Edit</button>
              <button
                onClick={() => fetchApplications(career._id)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
              >
                View Applications
              </button>
              <button onClick={() => handleDelete(career._id)} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showResumeModal && selectedApplication && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]"
    onClick={() => setShowResumeModal(false)}
  >
    <div
      className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Download Resume</h2>
        <button
          onClick={() => setShowResumeModal(false)}
          className="text-gray-600 hover:text-red-500 text-2xl font-bold leading-none"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      <p className="mb-4 text-gray-700">Click the button below to download the applicant's resume.</p>

      <button
        onClick={downloadResume}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Download PDF
      </button>
    </div>
  </div>
)}





{/* Applications Modal */}
{showApplicationsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start pt-20 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Applications for Job</h2>
              <button onClick={() => setShowApplicationsModal(false)} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
            </div>

            <div className="space-y-4">
              {applications.length === 0 ? (
                <p>No applications for this job yet.</p>
              ) : (
                applications.map((application) => (
                  <div key={application._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">{application.name}</h3>
                    <p>{application.email} | {application.phone}</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handlePreviewResume(application.resumeUrl)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                      >
                        Preview Resume
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start pt-20 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingId ? "Edit Career" : "Add New Career"}</h2>
              <button onClick={() => setShowResumeModal(false)} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["company", "Company"],
                ["position", "Position"],
                ["role", "Role"],
                ["salary", "Salary (Year)"],
                ["experience", "Experience"],
                ["dateOfJoining", "Joining Date"],
                ["postedAt", "Posted At"],
                ["languages", "Languages (comma-separated)"],
                ["tools", "Tools (comma-separated)"],
              ].map(([name, label]) => (
                <div key={name}>
                  <label className="text-sm font-medium block">{label}</label>
                  <input
                    type={name === "dateOfJoining" || name === "postedAt" ? "date" : "text"}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              ))}

              {/* District Dropdown */}
              <div>
                <label className="text-sm font-medium block">District</label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select District</option>
                  {districtsOfTamilNadu.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              {/* Level Dropdown */}
              <div>
                <label className="text-sm font-medium block">Level</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select Level</option>
                  <option value="Senior">Senior</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Fresher">Fresher</option>
                </select>
              </div>

              {/* Contract Dropdown */}
              <div>
                <label className="text-sm font-medium block">Contract</label>
                <select
                  name="contract"
                  value={formData.contract}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="">Select Contract Type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              {/* Logo Upload and Checkboxes */}
              <div className="col-span-2 flex items-center gap-4">
                <label className="text-sm font-medium">Logo</label>
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleChange}
                  className="text-sm"
                />
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="isNew"
                    checked={formData.isNew}
                    onChange={handleChange}
                  />{" "}
                  New
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                  />{" "}
                  Featured
                </label>
              </div>

              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
                >
                  {editingId ? "Update Career" : "Add Career"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default JobPortal;
