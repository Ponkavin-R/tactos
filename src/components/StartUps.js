import React, { useState } from 'react';
import { FaTimes, FaFacebookF, FaWhatsapp, FaLink } from 'react-icons/fa';

function StartUps() {
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({ district: '', sector: '', stage: '' });

  const startups = [
    {
      logoUrl: 'data:image/png;base64,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',
      youtube: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      location: 'Cuddalore',
      sector: 'Environment',
      shortDescription: 'Eco-friendly products',
      longDescription: 'GreenEco specializes in sustainable and eco-friendly products, promoting a greener planet through innovative solutions and practices.',
      stage: 'Series A',
      companyName: 'GreenEco'
    },
    {
      logoUrl: '/uploads/1745643862867-WhatsApp Image 2025-04-16 at 11.30.50.jpeg',
      youtube: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      location: 'Chennai',
      sector: 'Tech',
      shortDescription: 'AI-powered solutions',
      longDescription: 'InnovateX is revolutionizing AI solutions for businesses with cutting-edge technologies, making workflows faster and smarter.',
      stage: 'Seed',
      companyName: 'InnovateX'
    }
  ];

  const districts = [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode",
    "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam",
    "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga",
    "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur",
    "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
  ];

  const handleInterestedClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);
  const handleStartupClick = (startup) => setSelectedStartup(startup);
  const handleCloseDetail = () => setSelectedStartup(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredStartups = startups.filter(startup => {
    const matchDistrict = filters.district ? startup.location === filters.district : true;
    const matchSector = filters.sector ? startup.sector === filters.sector : true;
    const matchStage = filters.stage ? startup.stage === filters.stage : true;
    return matchDistrict && matchSector && matchStage;
  });

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen pb-12">

      {/* Banner */}
      <div className="h-64 flex items-center justify-center bg-blue-900 text-white">
        <h1 className="text-4xl font-bold">Invest in Start-Ups</h1>
      </div>

      {/* Reasons Section */}
      <div className="flex justify-around py-10 bg-gray-100 flex-wrap">
        {['🎯 High Growth Potential', '📈 Portfolio Diversification', '💰 Wealth Creation'].map((text, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-md text-center w-60 hover:shadow-lg transition">
            <div className="text-4xl mb-4">{text.split(' ')[0]}</div>
            <h2 className="text-xl font-semibold">{text.split(' ').slice(1).join(' ')}</h2>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col items-center py-10 px-4">
        <h2 className="text-2xl font-semibold mb-6">Find your startup to invest in</h2>
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <select name="district" onChange={handleFilterChange} className="p-3 border rounded-md w-40">
            <option value="">District</option>
            {districts.map((district, idx) => (
              <option key={idx} value={district}>{district}</option>
            ))}
          </select>
          <select name="sector" onChange={handleFilterChange} className="p-3 border rounded-md w-40">
            <option value="">Sector</option>
            <option value="Tech">Tech</option>
            <option value="Environment">Environment</option>
          </select>
          <select name="stage" onChange={handleFilterChange} className="p-3 border rounded-md w-40">
            <option value="">Startup Stage</option>
            <option value="Seed">Seed</option>
            <option value="Series A">Series A</option>
          </select>
        </div>
      </div>

      {/* Startup Cards */}
      <div className="flex flex-wrap justify-center gap-8 px-4">
        {filteredStartups.length > 0 ? filteredStartups.map((startup, idx) => (
          <div key={idx} className="bg-white w-80 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition" onClick={() => handleStartupClick(startup)}>
            <img src={startup.logoUrl} alt="Logo" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{startup.sector}</h3>
              <p className="text-gray-600">{startup.location} | {startup.stage}</p>
              <p className="text-gray-500 mt-2">{startup.shortDescription}</p>
            </div>
          </div>
        )) : (
          <div className="text-gray-500 text-lg">No startups match your filters.</div>
        )}
      </div>

      {/* Detailed View */}
      {selectedStartup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 overflow-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-full    h-screen relative flex p-8 gap-10">

            {/* Close Button */}
            <button onClick={handleCloseDetail} className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900">
              <FaTimes />
            </button>

            {/* Left Side */}
            <div className="w-2/3">
              <iframe src={selectedStartup.youtube} title="Startup Video" className="w-full h-80 rounded-md mb-6" frameBorder="0" allowFullScreen />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <p className="text-gray-700 text-lg">{selectedStartup.longDescription}</p>
                <button onClick={handleInterestedClick} className="px-6 py-3 bg-blue-900 text-white rounded-md font-semibold whitespace-nowrap">
                  I'm Interested
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div className="w-1/3 flex flex-col gap-4 items-center text-center">
              <img src={selectedStartup.logoUrl} alt="Logo" className="w-40 h-40 object-cover rounded-full shadow-md" />
              <h2 className="text-2xl font-bold">{selectedStartup.companyName}</h2>
              <p className="text-blue-600 text-lg">{selectedStartup.sector}</p>
              <p className="text-gray-600">{selectedStartup.shortDescription}</p>

              {/* Social Share */}
              <div className="flex gap-6 mt-6">
                <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="text-green-500 text-2xl">
                  <FaWhatsapp />
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-2xl">
                  <FaFacebookF />
                </a>
                <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="text-gray-700 text-2xl">
                  <FaLink />
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
            <select className="w-full p-3 border rounded-md mb-4">
              <option>Individual</option>
              <option>Organization</option>
            </select>
            <input type="text" placeholder="Name / Organization Name" className="w-full p-3 border rounded-md mb-4" />
            <input type="email" placeholder="Email" className="w-full p-3 border rounded-md mb-4" />
            <input type="tel" placeholder="Phone Number" className="w-full p-3 border rounded-md mb-4" />
            <button className="w-full py-3 bg-blue-900 text-white rounded-md font-semibold mb-4">Submit</button>
            <button onClick={handleCloseForm} className="w-full py-3 border text-blue-900 rounded-md">Close</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default StartUps;
