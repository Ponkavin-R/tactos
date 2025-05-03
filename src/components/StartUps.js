import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes, FaFacebookF, FaWhatsapp, FaLink } from 'react-icons/fa';

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
      <section class="bg-white">
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-3xl ">Invest in Start-Ups with TACTOS</h1>
            <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl ">At TACTOS, we connect visionary investors with high-potential startups poised to shape the future. By investing through our platform, you gain early access to disruptive ideas, diverse portfolios, and the opportunity to be part of the next big success story.</p>
           
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <div className="reasons grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
  <div className="reason-card bg-white rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:rotate-x-3 hover:rotate-y-3 hover:shadow-2xl">
    <div className="icon text-4xl text-center pt-6">🎯</div>
    <h2 className="text-center text-lg font-semibold text-gray-800 p-4">High Growth Potential</h2>
  </div>
  <div className="reason-card bg-white rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:rotate-x-3 hover:rotate-y-3 hover:shadow-2xl">
    <div className="icon text-4xl text-center pt-6">📈</div>
    <h2 className="text-center text-lg font-semibold text-gray-800 p-4">Portfolio Diversification</h2>
  </div>
  <div className="reason-card bg-white rounded-xl shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:rotate-x-3 hover:rotate-y-3 hover:shadow-2xl">
    <div className="icon text-4xl text-center pt-6">💰</div>
    <h2 className="text-center text-lg font-semibold text-gray-800 p-4">Wealth Creation</h2>
  </div>
</div>

        </div>                
    </div>
</section>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <select
          name="district"
          value={filters.district}
          onChange={handleFilterChange}
          className="p-3 border rounded-md w-40"
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
          className="p-3 border rounded-md w-40"
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
          className="p-3 border rounded-md w-40"
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
              className="bg-white w-80 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition"
              onClick={() => setSelectedStartup(startup)}
            >
              <img src={startup.logoUrl} alt="Logo" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{startup.sector}</h3>
                <p className="text-gray-600">{startup.location} | {startup.stage}</p>
                <p className="text-gray-500 mt-2">{startup.shortDescription}</p>
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
        <img
          src={selectedStartup.logoUrl}
          alt="Logo"
          className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-full shadow-md"
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
