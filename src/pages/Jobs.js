import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';

const JobBoardComponent = ({ job, handleTagClick }) => {
  const {
    _id,
    company,
    logo,
    isNew,
    featured,
    position,
    role,
    level,
    contract,
    salary,
    experience,
    tools,
    languages,
    district,
    dateOfJoining,
  } = job;

  return (
<div className="bg-white shadow-md rounded-2xl overflow-hidden p-0 sm:p-0 my-4 border border-gray-300 hover:shadow-xl transition-transform duration-300">
  {/* Full-width Image */}
  <div className="w-full h-48">
    <img
      className="w-full h-full object-cover"
      src={logo}
      alt={company}
    />
  </div>

  {/* Content Section */}
  <div className="p-4 sm:p-6 flex flex-col justify-between text-xs sm:text-sm">
    <h2 className="text-sm sm:text-lg font-semibold text-blue-950 mt-2 sm:mt-0">{position}</h2>

    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
      <h3 className="text-blue-950 font-bold text-sm sm:text-base">{company}</h3>
      {isNew && <span className="text-xxs bg-blue-950 text-white font-semibold px-2 py-0.5 rounded-full uppercase">New</span>}
      {featured && <span className="text-xxs bg-gray-800 text-white font-semibold px-2 py-0.5 rounded-full uppercase">Featured</span>}
    </div>

    <p className="text-gray-600 mt-2">
      <strong>Role:</strong> {role} | <strong>Level:</strong> {level}
    </p>
    <p className="text-gray-600 mt-1">
      <strong>Contract:</strong> {contract} | <strong>Location:</strong> {district}
    </p>

    <div className="flex flex-wrap mt-2">
    {(languages || []).slice(0, 2).map((lang) => (
        <span
          key={lang}
          onClick={() => handleTagClick(lang)}
          className="cursor-pointer text-green-900 bg-green-100 font-semibold text-xxs sm:text-xs py-1 px-2 rounded-full mr-2 mb-1 hover:bg-green-900 hover:text-white"
        >
          {lang}
        </span>
      ))}
      {(tools || []).slice(0, 1).map((tool) => (
        <span
          key={tool}
          onClick={() => handleTagClick(tool)}
          className="cursor-pointer text-blue-950 bg-blue-100 font-semibold text-xxs sm:text-xs py-1 px-2 rounded-full mr-2 mb-1 hover:bg-blue-950 hover:text-white"
        >
          {tool}
        </span>
      ))}
    </div>

    <div className="mt-4 sm:mt-0 sm:ml-auto w-fit">
      <Link
        to={`/jd/${_id}`}
        className="bg-blue-950 text-white font-semibold text-xs sm:text-sm py-1.5 px-4 rounded-lg hover:bg-blue-800 transition"
      >
        View Job
      </Link>
    </div>
  </div>
</div>

  );
};

const Job = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [selectedTags, setSelectedTags] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/jobs`);
        setAllJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterJobs(term, filter, locationFilter, levelFilter, dateFilter, selectedTags);
  };

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    filterJobs(searchTerm, selectedFilter, locationFilter, levelFilter, dateFilter, selectedTags);
  };

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setLocationFilter(selectedLocation);
    filterJobs(searchTerm, filter, selectedLocation, levelFilter, dateFilter, selectedTags);
  };

  const handleLevelChange = (e) => {
    const selectedLevel = e.target.value;
    setLevelFilter(selectedLevel);
    filterJobs(searchTerm, filter, locationFilter, selectedLevel, dateFilter, selectedTags);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDateFilter(selectedDate);
    filterJobs(searchTerm, filter, locationFilter, levelFilter, selectedDate, selectedTags);
  };

  const handleTagClick = (tag) => {
    const updatedTags = selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag) : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    filterJobs(searchTerm, filter, locationFilter, levelFilter, dateFilter, updatedTags);
  };

  const filterJobs = (term, selectedFilter, location, level, date, tags) => {
    let filtered = allJobs.filter(job => job.position?.toLowerCase().includes(term));
    
    if (selectedFilter !== "All") filtered = filtered.filter(job => job.contract === selectedFilter);
    if (location !== "All") filtered = filtered.filter(job => job.district === location);
    if (level !== "All") filtered = filtered.filter(job => job.level === level);
    
    if (date !== "All") {
      const currentDate = new Date();
      let dateThreshold;
      switch(date) {
        case "24h":
          dateThreshold = new Date(currentDate.setDate(currentDate.getDate() - 1));
          break;
        case "7d":
          dateThreshold = new Date(currentDate.setDate(currentDate.getDate() - 7));
          break;
        case "30d":
          dateThreshold = new Date(currentDate.setDate(currentDate.getDate() - 30));
          break;
        default:
          break;
      }
      filtered = filtered.filter(job => new Date(job.dateOfJoining) >= dateThreshold);
    }

    if (tags.length > 0) {
      filtered = filtered.filter(job =>
        tags.every(tag =>
          [job.role, job.level, job.salary, job.experience, job.dateOfJoining, ...(job.languages || []), ...(job.tools || [])].includes(tag)
        )
      );
    }

    setFilteredJobs(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilter("All");
    setLocationFilter("All");
    setLevelFilter("All");
    setDateFilter("All");
    setSelectedTags([]);
    setFilteredJobs(allJobs);
  };

  const tamilNaduDistricts = [
    "Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Tirunelveli", "Erode", "Vellore", "Tiruppur", "Dharmapuri",
    "Karur", "Thanjavur", "Nagapattinam", "Cuddalore", "Kanchipuram", "Villupuram", "Tiruvannamalai", "Dindigul", "Ramanathapuram",
    "Virudhunagar", "Pudukkottai", "Ariyalur", "Namakkal", "Theni", "Sivaganga", "Thoothukudi", "Kanyakumari", "Kanniyakumari",
    "Kallakurichi", "Perambalur", "Krishnagiri", "Tiruvarur", "Chengalpattu", "Puducherry", "Ariyalur", "Nagapattinam",
    "Thanjavur", "Tirupur", "Sivakasi", "Rajapalayam"
  ];

  return (
    <div className="max-w-6xl mx-auto md:mt-36 lg:mt-40 px-4">
      <section className="text-center mb-10">
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 leading-tight">
          Find Your Suitable Jobs <br />
          <span className="text-blue-900">with Tactos</span>
        </h2>
        <div className="mt-4 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          <Typewriter
            options={{
              strings: [
                'Discover your dream job with top companies.',
                'Apply for exciting roles and grow your career.',
                'Find full-time, part-time, and internship opportunities.',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <div className="relative w-72 mt-10">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search job"
            className="w-full pl-10 py-2 pr-3 border border-gray-300 rounded-full focus:outline-none"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </section>
      
     {/* Filter Options */}
<div className="md:flex justify-between mb-8">
  <div className="flex items-center space-x-4 mb-4 md:mb-0 overflow-x-auto md:overflow-visible">
    <select
      className="p-2 pr-8 rounded-lg border border-gray-300 focus:outline-none  flex-shrink-0"
      value={filter}
      onChange={handleFilterChange}
    >
      <option value="All">All Contract Types</option>
      <option value="Full-time">Full-time</option>
      <option value="Part-time">Part-time</option>
      <option value="Internship">Internship</option>
    </select>

    <select
      className="p-2 rounded-lg border border-gray-300 focus:outline-none flex-shrink-0"
      value={locationFilter}
      onChange={handleLocationChange}
    >
      <option value="All">All Locations</option>
      {tamilNaduDistricts.map((district, index) => (
        <option key={index} value={district}>{district}</option>
      ))}
    </select>

    <select
      className="p-2 pr-8 rounded-lg border border-gray-300 focus:outline-none flex-shrink-0"
      value={levelFilter}
      onChange={handleLevelChange}
    >
      <option value="All">All Levels</option>
      <option value="Junior">Junior</option>
      <option value="Mid">Mid</option>
      <option value="Senior">Senior</option>
    </select>

    <select
      className="p-2 rounded-lg border border-gray-300 focus:outline-none flex-shrink-0"
      value={dateFilter}
      onChange={handleDateChange}
    >
      <option value="All">All Time</option>
      <option value="24h">Last 24 Hours</option>
      <option value="7d">Last 7 Days</option>
      <option value="30d">Last 30 Days</option>
    </select>
  </div>

  <div>
    <button
      onClick={clearFilters}
      className="text-blue-950 font-semibold py-1 px-4 bg-blue-100 rounded-full hover:bg-blue-200 transition-all"
    >
      Clear Filters
    </button>
  </div>
</div>


      {/* Jobs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length ? (
          filteredJobs.map(job => (
            <JobBoardComponent key={job._id} job={job} handleTagClick={handleTagClick} />
          ))
        ) : (
          <p>No jobs found</p>
        )}
      </div>
    </div>
  );
};

export default Job;
