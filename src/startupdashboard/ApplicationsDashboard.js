import React, { useEffect, useState } from "react";
import axios from "axios";

const ApplicationsDashboard = () => {
  const [careers, setCareers] = useState([]);
  const [applicationsMap, setApplicationsMap] = useState({});

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const startupId = localStorage.getItem("startupId");
      const careersRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/jobs`);
      const filteredCareers = careersRes.data.filter(
        (job) => String(job.userId) === String(startupId)
      );
      setCareers(filteredCareers);

      const apps = {};
      for (const job of filteredCareers) {
        const appRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/jobapplied/${job._id}`
        );
        apps[job._id] = appRes.data;
      }
      setApplicationsMap(apps);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 w-full max-w-screen-xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
        Job Applications Dashboard
      </h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white custom-scrollbar">
        <table className="min-w-[600px] sm:min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Job Title</th>
              <th className="px-4 py-3">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {careers.map((job) =>
              applicationsMap[job._id]?.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-900">{app.name}</td>
                  <td className="px-4 py-3">{app.email}</td>
                  <td className="px-4 py-3">{app.phone}</td>
                  <td className="px-4 py-3">{job.position}</td>
                  <td className="px-4 py-3">{job.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {careers.every((job) => !applicationsMap[job._id]?.length) && (
          <p className="text-sm text-gray-500 p-4">No applications received yet.</p>
        )}
      </div>

      {/* Custom Scrollbar Style (Scoped for this component) */}
      <style>{`
  .custom-scrollbar::-webkit-scrollbar {
    height: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 8px;
  }
`}</style>

    </div>
  );
};

export default ApplicationsDashboard;
