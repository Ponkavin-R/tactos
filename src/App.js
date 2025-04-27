import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import StartupReg from "./pages/StartupReg";
import CoFounderRegistration from "./pages/CoFounderReg";
import Solution from "./pages/Solution";
import Event from "./pages/Event";
import JobList from "./pages/Careers";
import BusinessIdeationHub from "./pages/BusinessIdeationHub";
import Businessconsultation from "./pages/BusinessConsultation";
import JobDescription from "./components/JobDescription";
import EventDescription from "./components/EventDescription";
import StartupHome from "./startupdashboard/StartupHome";
import StartupDashboardHome from "./startupdashboard/Home";
import StartupProfile from "./startupdashboard/StartupProfile";
import JobPortal from "./startupdashboard/JobPortal";
import Funding from "./startupdashboard/Funding";
import Login from "./startupdashboard/Login";
import StartUps from "./components/StartUps";

function App() {
  const location = useLocation();

  const isStartupDashboardRoute = location.pathname.startsWith("/startup-dashboard");

  return (
    <div className="App">
      {!isStartupDashboardRoute && <Navbar />}
      
      <div className="md:mt-10">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Solution />} />
          <Route path="/events" element={<Event />} />
          <Route path="/event-description/:id" element={<EventDescription />} />
          <Route path="/career" element={<JobList />} />
          <Route path="/jd/:id" element={<JobDescription />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/startup-reg" element={<StartupReg />} />
          <Route path="/startups" element={<StartUps/>} />
          <Route path="/business-idea-hub" element={<BusinessIdeationHub />} />
          <Route path="/business-consultation" element={<Businessconsultation />} />
          <Route path="/cofounder-reg" element={<CoFounderRegistration />} />
          <Route path="/login" element={<Login />} />

          {/* Startup Dashboard Routes */}
          <Route path="/startup-dashboard/*" element={<StartupHome />}>
            <Route index element={<StartupDashboardHome />} />
            <Route path="profile" element={<StartupProfile />} />
            <Route path="jobs" element={<JobPortal />} />
            <Route path="funding" element={<Funding />} />
          </Route>
        </Routes>
      </div>
      
      {!isStartupDashboardRoute && <Footer />}
    </div>
  );
}

export default App;
