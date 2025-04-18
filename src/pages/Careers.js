import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobBoardComponent = ({ job, handleTagClick }) => {
  const {
    company,
    logo,
    isNew,
    featured,
    position,
    role,
    level,
    postedAt,
    contract,
    location,
    salary,
    experience,
    dateOfJoining,
    languages,
    tools
  } = job;

  const primaryTags = [role, level, salary, experience, dateOfJoining];
  const secondaryTags = [...(languages || []), ...(tools || [])];

  return (
    <div className={`flex flex-col bg-white shadow-xl rounded-2xl p-6 my-4 border border-gray-300 transition-transform duration-300 hover:scale-105 hover:shadow-2xl sm:flex-row ${featured ? 'border-l-8 border-blue-950' : ''}`}>
      <div className="flex-shrink-0 flex items-center justify-center sm:mr-6">
        <img className="w-16 h-16 rounded-full object-contain" src={logo} alt={company} />
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <div className="flex items-center space-x-4">
          <h3 className="text-blue-950 font-bold text-lg">{company}</h3>
          {isNew && <span className="text-xs bg-blue-950 text-white font-semibold px-3 py-1 rounded-full uppercase">New</span>}
          {featured && <span className="text-xs bg-gray-800 text-white font-semibold px-3 py-1 rounded-full uppercase">Featured</span>}
        </div>
        <h2 className="text-xl font-semibold mt-1 text-blue-950">{position}</h2>
        <p className="text-gray-600 mt-1">
          <strong>Posted:</strong> {postedAt}  <strong>Contract:</strong> {contract}
        </p>
        <p className="text-gray-600 mt-1">
          <strong>Location:</strong> {location}
        </p>
        <p className="text-gray-600 mt-1">
          <strong>Salary:</strong> {salary}  <strong>Experience:</strong> {experience}  <strong>Date of Joining:</strong> {dateOfJoining}
        </p>
      </div>
      <div className="flex flex-wrap items-center  sm:mt-0 sm:ml-auto md:ml-4">
        {[...primaryTags, ...secondaryTags].map((tag) => (
          <span
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="cursor-pointer text-blue-950 bg-blue-100 font-semibold text-sm py-1 px-3 rounded-full mr-2 mb-1 hover:bg-blue-950 hover:text-white transition"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-6 w-fit">
  <button className="bg-blue-950 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-800 transition-all">
    Apply Now
  </button>
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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("https://tactos-backend.onrender.com/api/careers");
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
    let filtered = allJobs.filter(job => job.position.toLowerCase().includes(term));
    if (selectedFilter !== "All") {
      filtered = filtered.filter(job => job.contract === selectedFilter);
    }
    if (tags.length > 0) {
      filtered = filtered.filter(job => tags.every(tag =>
        [job.role, job.level, job.salary, job.experience, job.dateOfJoining, ...(job.languages || []), ...(job.tools || [])].includes(tag)
      ));
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
    <div className="max-w-4xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">🚀 Tactos Careers</h2>
      <p className="text-center text-gray-500 mb-6">✨ Apply for your dream job & succeed! 🎯</p>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search for jobs..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full sm:w-2/3 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-950 outline-none"
        />
        <select
          value={filter}
          onChange={handleFilterChange}
          className="w-full sm:w-1/3 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-950 outline-none"
        >
          <option value="All">All</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedTags.map(tag => (
            <span key={tag} className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full cursor-pointer" onClick={() => handleTagClick(tag)}>
              {tag} ✕
            </span>
          ))}
          <button onClick={clearFilters} className="text-red-600 font-semibold">Clear</button>
        </div>
      )}

      {filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
          <JobBoardComponent key={job._id || job.id} job={job} handleTagClick={handleTagClick} />
        ))
      ) : (
        <div className="text-center text-gray-600 text-lg font-semibold p-6 bg-gray-100 rounded-xl shadow-md">
          No jobs found. Try a different search term or filter.
        </div>
      )}
    </div>
  );
};

export default JobList;
