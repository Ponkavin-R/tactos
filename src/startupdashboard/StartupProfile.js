import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import axios from "axios";

const LabelValue = ({ label, value }) => (
  <div className="mb-3">
    <label className="text-sm text-gray-500">{label}</label>
    <div className="text-md font-medium text-gray-800">{value || "-"}</div>
  </div>
);

const StartupProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    logo: "",
    fullName: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    shortDescription: "",
    startupLogo: null,
    startupName: "",
    industry: "",
    stage: "",
    location: "",
    incubation: "",
    pitchDeck: "",
    support: [],
    coFounder: "",
    status: ""
  });

  // Sample startupId for fetching; replace with dynamic one
  const startupId = localStorage.getItem('startupId');

  useEffect(() => {
    if (startupId) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/startups/${startupId}`)
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error fetching profile:', error);
        });
    } else {
      console.error("No startupId found in localStorage!");
    }
  }, [startupId]);
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const payload = { ...formData };
  
    // Clean and format support
    if (typeof payload.support === 'string') {
      payload.support = payload.support.split(",").map(item => item.trim()).filter(Boolean);
    }
  
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/startups/${startupId}`, payload);
      alert("Data saved successfully!");
      setEditMode(false);
    } catch (err) {
      console.error("Error saving data:", err);
      alert("Failed to save data.");
    }
  };
  

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6 md:col-span-1">
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center gap-4">
            <img
              src={
                formData.startupLogo ||
                "https://ui-avatars.com/api/?name=" + encodeURIComponent(formData.fullName)
              }
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{formData.fullName}</h2>
              <p className="text-gray-500">{formData.phone}</p>
              <p className="text-xs text-gray-400 mt-1">Joined 2/6/23</p>
            </div>
            <button
              onClick={() => setEditMode(!editMode)}
              className="flex items-center gap-1 text-sm text-purple-600 bg-purple-100 hover:bg-purple-200 px-3 py-1 rounded-lg transition"
            >
              <Pencil size={16} /> {editMode ? "Cancel" : "Edit"}
            </button>
          </div>

          {/* Startup Profile Card */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Startup Profile</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {editMode ? (
                <>
                  <input
                    name="startupName"
                    value={formData.startupName}
                    onChange={handleChange}
                    placeholder="Startup Name"
                    className="border p-2 rounded"
                  />
                  <input
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    placeholder="Short Description"
                    className="border p-2 rounded"
                  />
                </>
              ) : (
                <>
                  <LabelValue label="Startup Name" value={formData.startupName} />
                  <LabelValue label="Short Description" value={formData.shortDescription} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6 md:col-span-2">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Founder Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {editMode ? (
                <>
                  <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="border p-2 rounded" />
                  <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded" />
                  <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
                  <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="border p-2 rounded" />
                  <input name="password" type="text" value={formData.password} onChange={handleChange} placeholder="Password" className="border p-2 rounded" />
                  <input name="coFounder" value={formData.coFounder} onChange={handleChange} placeholder="Co-Founder" className="border p-2 rounded" />
                </>
              ) : (
                <>
                  <LabelValue label="Full Name" value={formData.fullName} />
                  <LabelValue label="Phone" value={formData.phone} />
                  <LabelValue label="Email" value={formData.email} />
                  <LabelValue label="Username" value={formData.username} />
                  <LabelValue label="Co-Founder" value={formData.coFounder} />
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Startup Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {editMode ? (
                <>
                  <input name="industry" value={formData.industry} onChange={handleChange} placeholder="Industry" className="border p-2 rounded" />
                  <input name="stage" value={formData.stage} onChange={handleChange} placeholder="Stage" className="border p-2 rounded" />
                  <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="border p-2 rounded" />
                  <input name="incubation" value={formData.incubation} onChange={handleChange} placeholder="Incubation" className="border p-2 rounded" />
                  <input name="status" value={formData.status} onChange={handleChange} placeholder="Status" className="border p-2 rounded" />
                </>
              ) : (
                <>
                  <LabelValue label="Industry" value={formData.industry} />
                  <LabelValue label="Stage" value={formData.stage} />
                  <LabelValue label="Location" value={formData.location} />
                  <LabelValue label="Incubation" value={formData.incubation} />
                  <LabelValue label="Status" value={formData.status} />
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Documents & Support</h2>
            {editMode ? (
              <>
                <input
                  name="pitchDeck"
                  value={formData.pitchDeck}
                  onChange={handleChange}
                  placeholder="Pitch Deck URL"
                  className="border p-2 rounded w-full mb-2"
                />
                <textarea
                  name="support"
                  value={formData.support.join(", ")}
                  onChange={(e) => setFormData(prev => ({ ...prev, support: e.target.value.split(",") }))}
                  placeholder="Support Needs (comma-separated)"
                  className="border p-2 rounded w-full"
                />
              </>
            ) : (
              <>
                <LabelValue label="Pitch Deck" value={formData.pitchDeck} />
                <LabelValue label="Support Needed" value={formData.support.join(", ")} />
              </>
            )}
          </div>

          {editMode && (
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartupProfile;
