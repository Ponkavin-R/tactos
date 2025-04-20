import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';

const JobBoardComponent = ({ job, handleTagClick }) => {
  const {
    company,
    logo,
    isNew,
    featured,
    position,
    contract,
    salary,
    experience,
    tools
  } = job;

  return (
    <div className="flex flex-col sm:flex-row bg-white shadow-md rounded-2xl p-4 sm:p-6 my-4 border border-gray-300 hover:shadow-xl transition-transform duration-300">
      {/* Logo Section */}
      <div className="flex-shrink-0 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
        <img className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-contain" src={logo} alt={company} />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between flex-grow text-xs sm:text-sm">
        {/* Job Title: On Mobile, Below Logo */}
        <h2 className="text-sm sm:text-lg font-semibold text-blue-950 mt-2 sm:mt-0">{position}</h2>

        {/* Company Name, New, Featured Badges */}
        <div className="flex items-center space-x-2 mt-2 sm:mt-0 sm:flex-row sm:space-x-2">
          <h3 className="text-blue-950 font-bold text-sm sm:text-base">{company}</h3>
          {isNew && (
            <span className="text-xxs bg-blue-950 text-white font-semibold px-2 py-0.5 rounded-full uppercase">
              New
            </span>
          )}
          {featured && (
            <span className="text-xxs bg-gray-800 text-white font-semibold px-2 py-0.5 rounded-full uppercase">
              Featured
            </span>
          )}
        </div>

        {/* Salary and Experience Information */}
        <p className="text-gray-600 mt-2">
          <strong>Salary:</strong> {salary} <strong>Experience:</strong> {experience}
        </p>

        {/* Tools Tags */}
        <div className="flex flex-wrap mt-2">
        <strong className="text-gray-600">Tools required:</strong>
          {(tools || []).map((tool) => (
            <span
              key={tool}
              onClick={() => handleTagClick(tool)}
              className="cursor-pointer text-blue-950 bg-blue-100 font-semibold text-xxs sm:text-xs py-1 px-2 rounded-full mr-2 ml-2 mb-1 hover:bg-blue-950 hover:text-white"
            >
              {tool}
            </span>
          ))}
        </div>

        {/* View Job Button */}
        <div className="mt-4 sm:mt-0 sm:ml-auto w-fit">
          <button className="bg-blue-950 text-white font-semibold text-xs sm:text-sm py-1.5 px-4 rounded-lg hover:bg-blue-800 transition">
            <Link to={`/jd/${job._id}`}>View Job</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

const JobList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedTags, setSelectedTags] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/careers`);
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
    filterJobs(term, filter, selectedTags);
  };

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    filterJobs(searchTerm, selectedFilter, selectedTags);
  };

  const handleTagClick = (tag) => {
    const updatedTags = selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag) : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    filterJobs(searchTerm, filter, updatedTags);
  };

  const filterJobs = (term, selectedFilter, tags) => {
    let filtered = allJobs.filter(job => job.position?.toLowerCase().includes(term));
    if (selectedFilter !== "All") filtered = filtered.filter(job => job.contract === selectedFilter);
    if (tags.length > 0) {
      filtered = filtered.filter(job =>
        tags.every(tag => [job.role, job.level, job.salary, job.experience, job.dateOfJoining, ...(job.languages || []), ...(job.tools || [])].includes(tag))
      );
    }
    setFilteredJobs(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilter("All");
    setSelectedTags([]);
    setFilteredJobs(allJobs);
  };

  return (
    <div className="max-w-6xl mx-auto my-10 md:mt-24 lg:mt-24 px-4">
      <section className="text-center mb-10">
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 leading-tight">
          Advance Your Career <br />
          <span className="text-blue-900">with Tactos Careers</span>
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
      </section>

      {/* Mobile Search Button */}
      <div className="flex justify-between items-center mb-6 sm:hidden">
        <h2 className="text-xl font-bold text-gray-800">Jobs</h2>
        <button onClick={() => setShowMobileSearch(!showMobileSearch)} className="text-blue-950 text-lg">
          {showMobileSearch ? <FaTimes /> : <FaSearch />}
        </button>
      </div>

      {showMobileSearch && (
        <div className="mb-4 sm:hidden">
          <input
            type="text"
            placeholder="Search for jobs..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-950 outline-none"
          />
          <select
            value={filter}
            onChange={handleFilterChange}
            className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-950 outline-none"
          >
            <option value="All">All</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
      )}

      {/* Mobile Selected Tags Filter */}
      {selectedTags.length > 0 && (
        <div className="mb-4 sm:hidden">
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedTags.map(tag => (
              <span key={tag} className="bg-blue-200 text-blue-900 px-2 py-1 rounded-full text-xs cursor-pointer" onClick={() => handleTagClick(tag)}>
                {tag} ✕
              </span>
            ))}
            <button onClick={clearFilters} className="text-red-600 text-xs font-semibold">Clear</button>
          </div>
        </div>
      )}

      {/* Job Listings */}
      <div className="hidden sm:flex justify-between items-start mb-6 gap-6">
        <div className="w-1/4 sticky top-20 bg-white p-4 border rounded-xl shadow-sm h-fit">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          <label className="block text-sm font-medium mb-2">Contract Type</label>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="w-full mb-4 p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-950 outline-none"
          >
            <option value="All">All</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Internship">Internship</option>
          </select>
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedTags.map(tag => (
                <span key={tag} className="bg-blue-200 text-blue-900 px-2 py-1 rounded-full text-xs cursor-pointer" onClick={() => handleTagClick(tag)}>
                  {tag} ✕
                </span>
              ))}
              <button onClick={clearFilters} className="text-red-600 text-xs font-semibold">Clear</button>
            </div>
          )}
        </div>
        <div className="w-3/4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobBoardComponent key={job._id || job.id} job={job} handleTagClick={handleTagClick} />
            ))
          ) : (
            <div className="text-center text-gray-600 text-sm font-medium p-6 bg-gray-100 rounded-xl shadow-md">
              No jobs found. Try a different search term or filter.
            </div>
          )}
        </div>
      </div>

      <div className="sm:hidden">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobBoardComponent key={job._id || job.id} job={job} handleTagClick={handleTagClick} />
          ))
        ) : (
          <div className="text-center text-gray-600 text-sm font-medium p-6 bg-gray-100 rounded-xl shadow-md">
            No jobs found. Try a different search term or filter.
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
