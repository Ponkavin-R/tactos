import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";

const StartupHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [fullName, setFullName] = useState("");

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false); // Auto-close on mobile
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch fullName from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const startupId = localStorage.getItem('startupId');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/startups/${startupId}`);
        setFullName(response.data.fullName);
      } catch (error) {
        console.error("Error fetching fullName:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          !isMobile ? (sidebarOpen ? "ml-64" : "ml-16") : "ml-0"
        }`}
      >
        {/* Header */}
        <div className="bg-gray-900 p-4 sticky top-0 z-10 flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="text-white md:hidden focus:outline-none"
          >
            ☰
          </button>
          <h1 className="text-white text-lg font-semibold">
            Welcome {fullName || "Founder"}
          </h1>
        </div>

        {/* Dynamic Page Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StartupHome;
