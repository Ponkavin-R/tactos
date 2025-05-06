import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes, FaFacebookF, FaWhatsapp, FaLink } from 'react-icons/fa';
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
      setStartups(approvedFundings);
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
      <div className="max-w-screen-xl px-4 py-12 mx-auto grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Text Section */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight mb-6">
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
            {startup.sector}
          </h3>

          <p className="text-sm text-gray-500 text-center mt-1">
            <span className="font-medium text-purple-600">{startup.location}</span> |{" "}
            <span className="font-medium text-blue-600">{startup.stage}</span>
          </p>

          <p className="mt-3 text-sm text-gray-700 text-justify leading-relaxed font-medium">
            {startup.shortDescription}
          </p>
        </div>
      </div>
    ))
  ) : (
    <div className="text-gray-500 text-lg">No startups match your filters.</div>
  )}
</div>



      {selectedStartup && (
  <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] relative flex flex-col md:flex-row overflow-hidden">
      
      {/* Close Button */}
      <button
        onClick={() => setSelectedStartup(null)}
        className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900 z-10"
      >
        <FaTimes />
      </button>

      {/* Right Side (on top for mobile) */}
      <div className="w-full md:w-1/3 order-1 md:order-none border-b md:border-b-0 md:border-l border-gray-200 p-6 flex flex-col items-center text-center overflow-y-auto">
      <motion.img
                src={`${process.env.REACT_APP_API_URL}${selectedStartup.logoUrl}`}
                alt="Logo"
                className="w-16 h-16 object-cover rounded-full transition-transform transform hover:scale-110"
              />


        <h2 className="text-xl md:text-2xl font-bold mt-4">{selectedStartup.companyName}</h2>
        <p className="text-blue-600 text-base md:text-lg mt-1">{selectedStartup.sector}</p>
        <p className="text-gray-600 text-sm mt-2">{selectedStartup.shortDescription}</p>
        <p className="text-gray-500 text-sm mt-1">{selectedStartup.location} | {selectedStartup.stage}</p>
        <p className="text-gray-400 text-xs mt-1">Created: {new Date(selectedStartup.createdAt).toLocaleDateString()}</p>

        {/* Social Share */}
        <div className="flex gap-6 mt-6">
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 text-xl hover:scale-110 transition-transform"
          >
            <FaWhatsapp />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-xl hover:scale-110 transition-transform"
          >
            <FaFacebookF />
          </a>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="text-gray-700 text-xl hover:scale-110 transition-transform"
          >
            <FaLink />
          </button>
        </div>
      </div>

      {/* Left Side (below on mobile) */}
      <div className="w-full md:w-2/3 order-2 md:order-none flex flex-col gap-4 p-6 overflow-y-auto">
        
        {/* Video Embed */}
        <div className="w-full h-64 md:h-96">
          <iframe
            src={selectedStartup.youtube}
            className="w-full h-full rounded-md"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Startup Video"
          />
        </div>

        {/* Long Description */}
        <div className="text-gray-700 text-base whitespace-pre-wrap">
          {selectedStartup.longDescription}
        </div>

        {/* Interest Button */}
        <div className="mt-4">
          <button
            onClick={() => setShowForm(true)}
            className="px-5 py-3 bg-blue-900 text-white rounded-md font-medium hover:bg-blue-800 transition"
          >
            I'm Interested
          </button>
        </div>
      </div>
    </div>
  </div>
)}



      {/* Interested Form Popup */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-bold mb-6">Interested in Investing</h2>
            <select
  value={investorType}
  onChange={(e) => setInvestorType(e.target.value)}
  className="w-full p-3 border rounded-md mb-4"
>
  <option value="Individual">Individual</option>
  <option value="Organization">Organization</option>
</select>

<input
  type="text"
  placeholder="Name / Organization Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full p-3 border rounded-md mb-4"
/>

<input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full p-3 border rounded-md mb-4"
/>

<input
  type="tel"
  placeholder="Phone Number"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  className="w-full p-3 border rounded-md mb-4"
/>

            <button
              onClick={() => handleSubmitInterest(selectedStartup._id)}
              className="w-full py-3 bg-blue-900 text-white rounded-md font-semibold mb-4"
            >
              Submit
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="w-full py-3 border text-blue-900 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StartUps;
