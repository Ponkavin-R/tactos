import { FiHome } from "react-icons/fi";
import { AiOutlineTeam, AiOutlineBulb, AiOutlineSolution } from "react-icons/ai";
import { FaRegCalendarAlt, FaRegUser } from "react-icons/fa";
import { MdBusinessCenter, MdMoreHoriz } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { ReactComponent as Logo } from "../assest/l2.svg";
import Falcon from "../assest/l.png";
import { RiTeamLine, RiLoginCircleLine } from "react-icons/ri";
import { MdWorkOutline, MdContactPhone } from "react-icons/md";
import { GiRocket } from "react-icons/gi";


const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [isClient, setIsClient] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("/");
  const location = useLocation();
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const dropdownRef = useRef();

  useEffect(() => {
    const pathToLabel = {
      "/": "Home",
      "/solutions": "Tech Support",
      "/startup-reg": "Startup Registration",
      "/cofounder-reg": "Co-Founder Registration",
      "/events": "Events",
      "/startups": "Start-Ups",
      "/login": "Login",
      "/business-idea-hub": "Business Ideation Hub",
      "/business-consultation": "Business Consultation",
      "/jobs": "Job Portal",
      "/contact": "Contact"
    };
    setActiveItem(pathToLabel[location.pathname] || "");
    setActiveTab(location.pathname);
  }, [location.pathname]);
  const mobileNavRef = useRef(null);


  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target)
      ) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isClient) return null;

  const navLink = (to, label) => (
    <Link
      to={to}
      onClick={() => setActiveItem(label)}
      className="hover:text-blue-700 transition duration-300 transform hover:scale-105 flex flex-col items-center relative min-h-[3.5rem]"
    >
      <span className={`${location.pathname === to ? "text-blue-700 font-semibold" : ""}`}>{label}</span>
      {activeItem === label && (
        <div className="absolute -bottom-5">
          <Logo className="w-6 h-6 text-blue-700" />
        </div>
      )}
    </Link>
  );

  return (
    <div className="w-full container mx-auto">
      {/* 🔹 Mobile Navbar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="lg:hidden top-0 h-fit left-0 w-screen -translate-x-1/2 bg-white shadow-xl p-1 flex justify-between items-center rounded-xl border border-gray-200 backdrop-blur-xl z-50"
      >
        <Link to="/" className="flex flex-row items-center">
          <img
            src={Falcon}
            alt="logo"
            className="object-contain h-16 w-fit"
          />
        </Link>
      </motion.div>

      {/* 🔹 Desktop Navbar */}
{/* 🔹 Desktop Navbar */}
<div className="hidden md:flex fixed top-0 left-0 w-full h-24 items-center justify-between px-2 z-30 bg-transparent backdrop-blur-lg ">
  {/* Logo on the left */}
  <Link to="/" className="flex items-center justify-start">
    <img
      src={Falcon}
      alt="logo"
      className="object-contain h-20 w-fit "
    />
  </Link>

  {/* Centered Nav inside motion */}
  <motion.header
initial={{ opacity: 0, y: -10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: "easeOut" }}
className="bg-white/90 backdrop-blur-lg shadow-xl rounded-full px-4 mr-16 py-3 flex items-center mt-4 justify-center space-x-12"
>
    <nav className="flex space-x-10 text-black font-medium">
      {/* Home */}
      <Link
        to="/"
        className={`hover:text-blue-700 transition duration-300 transform hover:scale-105 flex flex-col items-center ${
          location.pathname === "/" ? "text-blue-700" : ""
        }`}
        onClick={() => setActiveItem("Home")}
      >
        Home
        <Logo
          className={`mt-0.5 w-6 h-6 transition-opacity duration-300 ${
            location.pathname === "/" ? "text-blue-700 opacity-100" : "opacity-0"
          }`}
        />
      </Link>

      {/* Solutions */}
      <Link
        to="/solutions"
        className={`hover:text-blue-700 transition duration-300 transform hover:scale-105 flex flex-col items-center ${
          location.pathname === "/solutions" ? "text-blue-700" : ""
        }`}
        onClick={() => setActiveItem("Tech Support")}
      >
        Tech Support
        {location.pathname === "/solutions" && (
          <Logo className="text-blue-700 mt-0.5 w-6 h-6" />
        )}
      </Link>

      {/* Registration Dropdown */}
      <div className="relative flex flex-col items-center" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex flex-col items-center space-y-0.5 hover:text-blue-700 transition duration-300 transform hover:scale-105"
        >
          <div className="flex items-center space-x-1">
            <span
              className={`${
                location.pathname === "/startup-reg" ||
                location.pathname === "/cofounder-reg"
                  ? "text-blue-700 font-semibold"
                  : ""
              }`}
            >
              Registration
            </span>
            <ChevronDown size={18} />
          </div>
          {(location.pathname === "/startup-reg" ||
            location.pathname === "/cofounder-reg") && (
            <Logo className="text-blue-700 w-6 h-6 mt-1" />
          )}
        </button>

        {isDropdownOpen && (
          <div className="absolute top-16 right-0 w-56 bg-white shadow-md rounded-lg py-2 z-50">
            <Link
              to="/startup-reg"
              className="block px-4 py-2 text-black hover:bg-blue-950 hover:text-white transition duration-300"
              onClick={() => setIsDropdownOpen(false)}
            >
              Startup Registration
            </Link>
            <Link
              to="/cofounder-reg"
              className="block px-4 py-2 text-black hover:bg-blue-950 hover:text-white transition duration-300"
              onClick={() => setIsDropdownOpen(false)}
            >
              Co-Founder Registration
            </Link>
          </div>
        )}
      </div>

      {/* Other Nav Items */}
      <Link
        to="/events"
        className={`hover:text-blue-700 transition duration-300 transform hover:scale-105 flex flex-col items-center ${
          location.pathname === "/events" ? "text-blue-700" : ""
        }`}
        onClick={() => setActiveItem("Events")}
      >
        Events
        {location.pathname === "/events" && (
          <Logo className="text-blue-700 mt-0.5 w-6 h-6" />
        )}
      </Link>

      <Link
        to="/startups"
        className={`hover:text-blue-700 transition duration-300 transform hover:scale-105 flex flex-col items-center ${
          location.pathname === "/startups" ? "text-blue-700" : ""
        }`}
        onClick={() => setActiveItem("Start-Ups")}
      >
       Invest in Start-Ups
        {location.pathname === "/startups" && (
          <Logo className="text-blue-700 mt-0.5 w-6 h-6" />
        )}
      </Link>

      <Link
        to="/jobs"
        className={`hover:text-blue-700 transition duration-300 transform hover:scale-105 flex flex-col items-center ${
          location.pathname === "/jobs" ? "text-blue-700" : ""
        }`}
        onClick={() => setActiveItem("Career")}
      >
       Job Portal
        {location.pathname === "/jobs" && (
          <Logo className="text-blue-700 mt-0.5 w-6 h-6" />
        )}
      </Link>

      <Link
        to="/contact"
        className={`hover:text-blue-700 transition duration-300 transform hover:scale-105 flex flex-col items-center ${
          location.pathname === "/contact" ? "text-blue-700" : ""
        }`}
        onClick={() => setActiveItem("Contact")}
      >
        Contact
        {location.pathname === "/contact" && (
          <Logo className="text-blue-700 mt-0.5 w-6 h-6" />
        )}
      </Link>
    </nav>
  </motion.header>

  {/* Login / Logout Button on the right */}
  <div className="flex items-center justify-end mt-2 mr-6">
  {isLoggedIn ? (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
    >
      Logout
    </button>
  ) : (
    <Link
      to="/login"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-12 w-24 flex items-center justify-center rounded-full transition duration-300"
    >
      Login
    </Link>
  )}
</div>

</div>




      {/* 🔹 Mobile Floating Navigation */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        ref={mobileNavRef}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="lg:hidden fixed bottom-1 w-screen bg-white shadow-xl p-1 flex justify-between items-center rounded-2xl border-t border-gray-300 backdrop-blur-xl z-50 flex-col"
      >
        <div className="flex justify-between  w-full">
          <NavItem to="/" icon={<FiHome />} label="Home" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem to="/solutions" icon={<AiOutlineSolution />} label="Tech Support" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem to="/events" icon={<FaRegCalendarAlt />} label="Events" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem onClick={() => setIsMoreOpen(!isMoreOpen)} icon={<MdMoreHoriz />} label="More" />
        </div>

        <AnimatePresence>
          {isMoreOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="w-full bg-white shadow-lg rounded-xl p-2 grid grid-cols-4 gap-2"
            >
              <NavItem to="/startup-reg" icon={<AiOutlineTeam />} label="Startup" activeTab={activeTab} setActiveTab={setActiveTab} />
              <NavItem to="/cofounder-reg" icon={<FaRegUser />} label="Co-Founder" activeTab={activeTab} setActiveTab={setActiveTab} />
              <NavItem to="/business-idea-hub" icon={<AiOutlineBulb />} label="Business Hub" activeTab={activeTab} setActiveTab={setActiveTab} />
              <NavItem to="/business-consultation" icon={<RiTeamLine />} label="Business Consultation" activeTab={activeTab} setActiveTab={setActiveTab} />
              <NavItem to="/jobs" icon={<MdWorkOutline />} label="Jobs" activeTab={activeTab} setActiveTab={setActiveTab} />
              <NavItem to="/startups" icon={<GiRocket />} label="Start-Ups" activeTab={activeTab} setActiveTab={setActiveTab} />
              <NavItem to="/login" icon={<RiLoginCircleLine />} label="Login" activeTab={activeTab} setActiveTab={setActiveTab} />
              <NavItem to="/contact" icon={<MdContactPhone />} label="Contact" activeTab={activeTab} setActiveTab={setActiveTab} />
             
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

const NavItem = ({ to, onClick, icon, label, activeTab, setActiveTab }) => {
  const isActive = activeTab === to;

  return (
    <motion.div whileTap={{ scale: 0.9 }} className="flex flex-col items-center px-3">
      {to ? (
        <Link
          to={to}
          onClick={() => setActiveTab(to)}
          className="relative flex flex-col items-center"
        >
          <div className={`w-12 h-8 flex items-center justify-center rounded-lg transition-all ${isActive ? "text-white bg-blue-950" : "text-gray-700"}`}>
            {icon}
          </div>
          <span className=" text-xs font-medium">{label}</span>
          {isActive && <Logo className="w-5 h-5 text-blue-700 " />}
        </Link>
      ) : (
        <button onClick={onClick} className="relative flex flex-col items-center">
        <div className="w-10 h-8 flex items-center justify-center rounded-lg text-gray-700">
          {icon}
        </div>
        <span className="mt-1 text-xs font-medium text-center w-full">
          {label}
        </span>
      </button>
      
      )}
    </motion.div>
  );
};

export default Navbar;
