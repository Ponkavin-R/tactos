import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import StartupReg from "./pages/StartupReg";
import CoFounderRegistration from "./pages/CoFounderReg";
import Solution from "./pages/Solution";
import Event from "./pages/Event";
import JobList from "./pages/Careers";
import BusinessIdeationHub from "./pages/BusinessIdeationHub";
import Businessconsultation from "./pages/BusinessConsultation";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solutions" element={<Solution />} />
        <Route path="/events" element={<Event/>} />
        <Route path="/career" element={<JobList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/startup-reg" element={<StartupReg />} />
        <Route path="/business-idea-hub" element={<BusinessIdeationHub/>}/>
        <Route path="/business-consultation" element={<Businessconsultation/>}/>
        <Route path="/cofounder-reg" element={<CoFounderRegistration />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
