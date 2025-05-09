import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Funding = () => {
  const [fundings, setFundings] = useState([]);
  const [formData, setFormData] = useState({
    youtube: "",
    location: "",
    sector: "",
    shortDescription: "",
    longDescription: "",
    logo: null,
    logoUrl: "",
    stage: "",
    status: "waiting",
    amountSeeking: "",
    equityOffered: "",
    valuation: "",
    fundUsage: "",
    minimumInvestment: "",
    ticketSize: "",
    roleProvided: "",
    amountRaised: 0,
  });
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [fundingToDelete, setFundingToDelete] = useState(null);
  const userId = localStorage.getItem('startupId');

  const districts = [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul",
    "Erode", "Kallakurichi", "Kancheepuram", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai",
    "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet",
    "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli",
    "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore",
    "Viluppuram", "Virudhunagar"
  ];

  const stages = ["Ideation", "Pre-seed", "Seed", "Series A", "Series B", "Series C"];

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchFundings = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/fundings/me`, {
          params: { userId }
        });
        setFundings(res.data);
      } catch (error) {
        console.error("Error fetching fundings", error.response || error.message);
      }
    };
    fetchFundings();
  }, [apiUrl, userId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0], logoUrl: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("userId", userId);
  
    for (let key in formData) {
      payload.append(key, formData[key]);
    }
  
    try {
      let res;
      if (editId) {
        res = await axios.put(`${apiUrl}/api/fundings/${editId}`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        setFundings((prev) =>
          prev.map((item) => (item._id === editId ? res.data : item))
        );
      } else {
        res = await axios.post(`${apiUrl}/api/fundings`, payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        setFundings([res.data, ...fundings]);
      }
  
      setShowForm(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      setEditId(null);
      setFormData({
        youtube: "",
        location: "",
        sector: "",
        shortDescription: "",
        longDescription: "",
        logo: null,
        logoUrl: "",
        stage: "",
        status: "waiting",
        amountSeeking: "",
        equityOffered: "",
        valuation: "",
        fundUsage: "",
        minimumInvestment: "",
        ticketSize: "",
        roleProvided: "",
        amountRaised: 0,
      });
    } catch (err) {
      console.error("Submission failed", err.response || err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/api/fundings/${fundingToDelete}`);
      setFundings(fundings.filter((item) => item._id !== fundingToDelete));
      setShowDeleteConfirm(false);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (id) => {
    const funding = fundings.find((item) => item._id === id);
    setFormData({
      youtube: funding.youtube,
      location: funding.location,
      sector: funding.sector,
      shortDescription: funding.shortDescription,
      longDescription: funding.longDescription,
      logo: null,
      logoUrl: funding.logoUrl || "",
      stage: funding.stage,
      status: funding.status,
      amountSeeking: funding.amountSeeking || "",
      equityOffered: funding.equityOffered || "",
      valuation: funding.valuation || "",
      fundUsage: funding.fundUsage || "",
      minimumInvestment: funding.minimumInvestment || "",
      ticketSize: funding.ticketSize || "",
      roleProvided: funding.roleProvided || "",
      amountRaised: funding.amountRaised || 0,
    });
    setEditId(id);
    setShowForm(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-semibold text-gray-800">Funding Dashboard</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setFormData({
              youtube: "",
              location: "",
              sector: "",
              shortDescription: "",
              longDescription: "",
              logo: null,
              logoUrl: "",
              stage: "",
              status: "waiting",
              amountSeeking: "",
              equityOffered: "",
              valuation: "",
              fundUsage: "",
              minimumInvestment: "",
              ticketSize: "",
              roleProvided: "",
              amountRaised: 0,
            });
          }}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-5 rounded-xl shadow hover:scale-105 transition duration-300"
        >
          {showForm ? "Close" : "Add New"}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="bg-white shadow-lg rounded-xl p-6 mb-6 ring-1 ring-gray-200"
          >
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                placeholder="YouTube Link"
                className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                required
              />
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                required
              >
                <option value="">Select District</option>
                {districts.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              <input
                type="text"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                placeholder="Sector"
                className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                required
              />
              <select
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                required
              >
                <option value="">Select Stage</option>
                {stages.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Short Description"
                className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
                required
              />
              <div className="flex flex-col items-center p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition">
                <label htmlFor="logo" className="text-gray-700 font-medium text-lg mb-2">Upload Logo</label>
                <input
                  type="file"
                  name="logo"
                  onChange={handleChange}
                  id="logo"
                  className="hidden"
                />
                <label
                  htmlFor="logo"
                  className="cursor-pointer bg-blue-500 text-white py-2 px-6 rounded-xl shadow-lg hover:bg-blue-600 transition-all duration-300"
                >
                  Choose File
                </label>
                {formData.logoUrl && (
                 <img
                 src={`${process.env.REACT_APP_API_URL}${formData.logoUrl}`}
                 alt="Logo"
                 className="w-16 h-16 object-cover rounded-full mx-auto mt-4"
               />
               
)}
</div>
<textarea
name="longDescription"
value={formData.longDescription}
onChange={handleChange}
placeholder="Detailed Description"
className="md:col-span-2 p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
required
/>
<input
type="text"
name="amountSeeking"
value={formData.amountSeeking}
onChange={handleChange}
placeholder="Amount Seeking"
className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
/>
<input
type="text"
name="equityOffered"
value={formData.equityOffered}
onChange={handleChange}
placeholder="Equity Offered (%)"
className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
/>
<input
type="text"
name="valuation"
value={formData.valuation}
onChange={handleChange}
placeholder="Valuation"
className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
/>
<input
type="text"
name="fundUsage"
value={formData.fundUsage}
onChange={handleChange}
placeholder="Fund Usage"
className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
/>
<input
type="text"
name="minimumInvestment"
value={formData.minimumInvestment}
onChange={handleChange}
placeholder="Minimum Investment"
className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
/>
<input
type="text"
name="ticketSize"
value={formData.ticketSize}
onChange={handleChange}
placeholder="Ticket Size"
className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
/>
<input
type="text"
name="roleProvided"
value={formData.roleProvided}
onChange={handleChange}
placeholder="Role Provided"
className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
/>

<button
type="submit"
className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl shadow-lg transition duration-300"
>
{editId ? "Update Funding" : "Submit Funding"}
</button>
</form>
</motion.div>
)}
</AnimatePresence>

{showSuccess && (
<div className="mb-6 text-green-600 font-semibold text-center">
✅ Submission successful!
</div>
)}

{/* Funding Cards */}
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {fundings.map((funding) => (
    <div key={funding._id} className="bg-white rounded-xl shadow-md p-6 space-y-4 relative">
      {/* Status Badge in Top Right Corner */}
      <div className="absolute top-4 right-4 px-4 py-2 text-white text-sm font-semibold rounded-full bg-blue-500">
        {funding.status}
      </div>

      {/* Logo */}
      <div className="flex justify-center mb-4">
        <motion.img
          src={`${process.env.REACT_APP_API_URL}${funding.logoUrl}`}
          alt="Logo"
          className="w-16 h-16 object-cover rounded-full transition-transform transform hover:scale-110"
        />
      </div>

      {/* Title and Stage */}
      <div>
        <h3 className="text-lg font-semibold">{funding.sector}</h3>
        <p className="text-sm text-gray-500">{funding.stage}</p>
      </div>

      {/* Description */}
      <p className="text-gray-600">{funding.shortDescription}</p>
      <p className="text-sm text-gray-500">{funding.location}</p>

      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handleEdit(funding._id)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => {
            setFundingToDelete(funding._id);
            setShowDeleteConfirm(true);
          }}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>


{/* Delete Confirmation */}
{showDeleteConfirm && (
<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
<div className="bg-white p-6 rounded-xl shadow-xl space-y-4">
<p className="text-lg text-gray-700">Are you sure you want to delete this funding entry?</p>
<div className="flex justify-end space-x-4">
<button
onClick={() => setShowDeleteConfirm(false)}
className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300"
>
Cancel
</button>
<button
onClick={handleDelete}
className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
>
Delete
</button>
</div>
</div>
</div>
)}
</div>
);
};

export default Funding;
