import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes, FaFacebook, FaWhatsapp, FaRegCopy } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";
import { FaBullseye, FaChartLine, FaCoins } from "react-icons/fa";
const districts = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode",
  "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam",
  "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga",
  "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur",
  "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
];

function StartUps() {
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [selectedStartupid, setSelectedStartupid] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({ district: '', sector: '', stage: '' });
  const [startups, setStartups] = useState([]);
  const [investorType, setInvestorType] = useState('Individual');
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');



  useEffect(() => {
    fetchFundings();
  }, []);

  const fetchFundings = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/fundings`);
      const approvedFundings = response.data.filter(funding => funding.status === 'approved');
  
      // Fetch startup details for each funding
      const enrichedFundings = await Promise.all(approvedFundings.map(async (funding) => {
        try {
          const startupRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/startups/${funding.userId}`);
          return {
            ...funding,
            startupDetails: startupRes.data
          };
        } catch (err) {
          console.error(`Error fetching startup for ID ${funding.userId}:`, err);
          return {
            ...funding,
            startupDetails: null
          };
        }
      }));
  
      setStartups(enrichedFundings);
    } catch (error) {
      console.error('Error fetching fundings:', error);
    }
  };
  
  const handleSubmitInterest = async (fundingId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/interests`, {
        fundingId,
        investorType,
        name,
        email,
        phone
      });
      alert('Interest submitted successfully!');
      setShowForm(false);
      setSelectedStartup(null);
      setInvestorType('Individual');
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Error submitting interest:', error);
      alert('Failed to submit interest');
    }
  };
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("URL copied to clipboard!");
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredStartups = startups.filter(startup => {
    return (
      (filters.district === '' || startup.location === filters.district) &&
      (filters.sector === '' || startup.sector === filters.sector) &&
      (filters.stage === '' || startup.stage === filters.stage)
    );
  });

  return (
    <div className="p-4">
<section className="bg-white">
      <div className="max-w-screen-xl px-4 py-10 mx-auto grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Text Section */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight mb-6">
            <span className="block">Invest in Start-Ups</span>
            <span className="block text-blue-600">with TACTOS Locally</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-2xl mb-8">
          At TACTOS Strategic Solutions, we connect local investors with high-potential startups from your own region—startups that are ready to scale, innovate, and create lasting impact
          </p>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-2xl mb-8">
          By investing locally, you’re not just growing your portfolio—you’re fueling the next generation of entrepreneurs and helping shape the economic future of your community.
Discover, support, and grow—locally
</p>

        </motion.div>

        {/* Reason Cards - Right Section */}
        <motion.div
  className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 pt-16 gap-6"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2 }}
>
  {[
    { icon: <FaBullseye className="text-4xl text-blue-600" />, title: "High Growth Potential" },
    { icon: <FaChartLine className="text-4xl text-green-600" />, title: "Portfolio Diversification" },
    { icon: <FaCoins className="text-4xl text-yellow-600" />, title: "Wealth Creation" },
  ].map((item, index) => (
    <motion.div
      key={index}
      whileHover={{ scale: 1.05 }}
      className="w-64 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-md px-6 py-6 text-center flex flex-col items-center justify-center transition duration-300 hover:shadow-lg"
    >
      <div className="mb-3 flex justify-center">{item.icon}</div>
      <h2 className="text-base font-semibold text-gray-800">{item.title}</h2>
    </motion.div>
  ))}
</motion.div>

      </div>
    </section>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <select
          name="district"
          value={filters.district}
          onChange={handleFilterChange}
          className="p-3 border border-gray-300 rounded-xl shadow-sm text-sm"
        >
          <option value="">District</option>
          {districts.map((district, idx) => (
            <option key={idx} value={district}>{district}</option>
          ))}
        </select>
        <select
          name="sector"
          value={filters.sector}
          onChange={handleFilterChange}
          className="p-3 border border-gray-300 rounded-xl shadow-sm text-sm"
        >
          <option value="">Sector</option>
          <option value="Tech">Tech</option>
          <option value="Environment">Environment</option>
          {/* Add more sectors if needed */}
        </select>
        <select
          name="stage"
          value={filters.stage}
          onChange={handleFilterChange}
          className="p-3 border border-gray-300 rounded-xl shadow-sm pr-8"
        >
          <option value="">Startup Stage</option>
          <option value="Seed">Seed</option>
          <option value="Series A">Series A</option>
          {/* Add more stages if needed */}
        </select>
      </div>

      {/* Startup Cards */}
      <div className="flex flex-wrap justify-center gap-8 px-4">
  {filteredStartups.length > 0 ? (
    filteredStartups.map((startup, idx) => (
      <div
        key={idx}
        className="w-80 bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 cursor-pointer border border-gray-200"
        onClick={() => setSelectedStartup(startup)}
      >
        {/* Full-width logo image */}
        <motion.img
          src={`${process.env.REACT_APP_API_URL}${startup.logoUrl}`}
          alt="Startup Logo"
          className="w-full h-40 object-cover"
        />

        {/* Card content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 hover:text-indigo-600 transition text-center">
            {startup.startupDetails?.startupName || 'Unknown Startup'}
          </h3>

          <p className="text-sm text-gray-500 text-center mt-1">
            <span className="font-medium text-purple-600">{startup.location}</span> |{" "}
            <span className="font-medium text-blue-600">{startup.stage}</span>|{" "}
            <span className="font-medium text-blue-600">{startup.sector}</span>

          </p>

          <p className="mt-3 text-sm text-gray-700 text-justify leading-relaxed font-medium">
          {startup.shortDescription.length > 150
    ? `${startup.shortDescription.slice(0, 150)}...`
    : startup.shortDescription}
          </p>
        </div>
      </div>
    ))
  ) : (
    <div className="text-gray-500 text-lg">No startups match your filters.</div>
  )}
</div>



 {/* Popup Modal */}
 <AnimatePresence>
  {selectedStartup && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-4 py-8"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white w-full max-w-7xl rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] p-8 relative grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <button
          onClick={() => setSelectedStartup(null)}
          className="absolute top-5 right-6 text-gray-600 hover:text-black text-2xl"
        >
          <FaTimes />
        </button>

        {/* Left Section: Video + Long Description */}
        <div className="space-y-6">
          <div className="w-full h-64 md:h-[28rem] rounded-lg overflow-hidden">
            <iframe
              src={selectedStartup.youtube}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Startup Video"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-950 mb-2">About the Startup</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {selectedStartup.longDescription}
            </p>
          </div>
        </div>

        {/* Right Section: Company Info + Stats + Actions */}
        <div className="space-y-6">
          {/* Company Info */}
          <div className="flex flex-col h-72 items-center text-center space-y-2">
            <img
              src={`${process.env.REACT_APP_API_URL}${selectedStartup.logoUrl}`}
              alt="Logo"
              className="w-24 h-24 object-cover rounded-full border shadow"
            />
                      <h4 className="text-xl font-semibold text-blue-950">
                      {selectedStartup.startupDetails?.startupName || 'Unknown Startup'}
</h4>
             
             <p className="text-sm text-gray-500 text-center mt-1">
            <span className="font-medium text-purple-600">{selectedStartup.location}</span> |{" "}
            <span className="font-medium text-blue-600">{selectedStartup.stage}</span>|{" "}
            <span className="font-medium text-blue-600">{selectedStartup.sector}</span>
            <p className="text-sm text-gray-500 text-center mt-3">{selectedStartup.shortDescription}</p>

          </p>
          </div>

          <hr className="border-t" />

          {/* Actions */}
          <div>
            <h4 className="text-lg font-semibold mb-1 text-blue-950">Share & Connect</h4>
            <div className="flex justify-center gap-4 mb-4">
              <a href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="text-green-500 text-2xl hover:scale-110 transition" />
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-blue-600 text-2xl hover:scale-110 transition" />
              </a>
              <button onClick={handleCopyUrl}>
                <FaRegCopy className="text-gray-700 text-2xl hover:scale-110 transition" />
              </button>
            </div>
            <div className="text-center">
              <button
                className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-indigo-700 transition"
                onClick={() => setShowForm(true)}
              >
                Interested in Investing?
              </button>
            </div>
          </div>
          {/* <hr className="border-t" /> */}
          <h4 className="text-xl font-semibold text-blue-950 mb-2">
   <span>Funding Details</span>
</h4>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-gray-700 text-sm">
  <div>
    <p className="font-semibold text-gray-600">Amount Seeking</p>
    <p className="text-lg font-medium text-green-700">
      ₹{selectedStartup?.amountSeeking?.toLocaleString?.() || 'N/A'}
    </p>
  </div>

  <div>
    <p className="font-semibold text-gray-600">Equity Offered</p>
    <p className="text-lg font-medium">{selectedStartup?.equityOffered ?? 'N/A'}%</p>
  </div>

  <div>
    <p className="font-semibold text-gray-600">Valuation</p>
    <p className="text-lg font-medium text-indigo-700">
      ₹{selectedStartup?.valuation?.toLocaleString?.() || 'N/A'}
    </p>
  </div>

  <div>
    <p className="font-semibold text-gray-600">Fund Usage</p>
    <p className="text-base">{selectedStartup?.fundUsage ?? 'N/A'}</p>
  </div>

  <div>
    <p className="font-semibold text-gray-600">Min Investment</p>
    <p className="text-lg font-medium">
      ₹{selectedStartup?.minimumInvestment?.toLocaleString?.() || 'N/A'}
    </p>
  </div>

  <div>
    <p className="font-semibold text-gray-600">Ticket Size</p>
    <p className="text-lg font-medium">
      ₹{selectedStartup?.ticketSize?.toLocaleString?.() || 'N/A'}
    </p>
  </div>

  <div className="col-span-1 sm:col-span-2">
    <p className="font-semibold text-gray-600">Role for Investors</p>
    <p className="text-base">{selectedStartup?.roleProvided ?? 'N/A'}</p>
  </div>

  {/* Amount Raised & Progress Bar */}
  <div className="col-span-1 sm:col-span-2 mt-4">
    <p className="font-semibold text-gray-600 mb-1">
      Amount Raised:
      <span className="ml-2 font-bold text-green-700">
        ₹{selectedStartup?.amountRaised?.toLocaleString?.() || '0'}
      </span>
    </p>

    <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{
          width: `${
            Math.min(
              ((selectedStartup?.amountRaised || 0) / (selectedStartup?.amountSeeking || 1)) * 100,
              100
            )
          }%`,
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
      />
    </div>

    <div className="text-right text-sm text-gray-500 mt-1">
      {Math.min(
        (((selectedStartup?.amountRaised || 0) / (selectedStartup?.amountSeeking || 1)) * 100).toFixed(2),
        100
      )}% funded
    </div>
  </div>
</div>




          <hr className="border-t" />


        </div>
      </motion.div>

     {/* Interest Form */}
<AnimatePresence>
  {showForm && (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative"
      >
        <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
           Submit Your Interest
        </h3>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitInterest(selectedStartup._id);
          }}
        >
          {/* Investor Type */}
          <div className="space-y-1">
            <label className="text-gray-700 font-medium text-sm">Investor Type</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={investorType}
              onChange={(e) => setInvestorType(e.target.value)}
            >
              <option value="Individual">Individual</option>
              <option value="Institution">Institution</option>
            </select>
          </div>

          {/* Name */}
          <div className="space-y-1">
            <label className="text-gray-700 font-medium text-sm">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-gray-700 font-medium text-sm">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-gray-700 font-medium text-sm">Phone</label>
            <input
              type="tel"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            >
              Submit
            </button>
            <button
              type="button"
              className="flex-1 text-red-600 border border-red-400 py-2 rounded-md hover:bg-red-100 transition"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}

export default StartUps;
