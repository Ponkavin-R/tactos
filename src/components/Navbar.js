import { FiHome } from "react-icons/fi";
import { AiOutlineTeam, AiOutlineBulb, AiOutlineSolution } from "react-icons/ai";
import { FaRegCalendarAlt, FaRegUser } from "react-icons/fa";
import { MdBusinessCenter, MdMoreHoriz } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { ReactComponent as Logo } from "../assest/l2.svg";

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
      "/solutions": "Solutions",
      "/startup-reg": "Startup Registration",
      "/cofounder-reg": "Cofounder Registration",
      "/events": "Events",
      "/business-idea-hub": "Business Ideation Hub",
      "/business-consultation": "Business Consultation",
      "/career": "Career",
      "/contact": "Contact"
    };
    setActiveItem(pathToLabel[location.pathname] || "");
    setActiveTab(location.pathname);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
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
        className="lg:hidden top-0 h-fit left-0 w-screen -translate-x-1/2 bg-gradient-to-r from-[#0a192f] to-[#1c3b57] shadow-xl p-1 flex justify-between items-center rounded-xl border border-gray-200 backdrop-blur-xl z-50"
      >
        <Link to="/" className="flex flex-row items-center">
          <img
            src="/l1.png"
            alt="logo"
            className="object-contain h-16 w-fit"
          />
        </Link>
      </motion.div>

      {/* 🔹 Desktop Navbar */}
        <div className="hidden md:flex fixed top-2 items-center w-full justify-center z-30">
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-fit h-20 bg-white/90 backdrop-blur-lg shadow-xl px-10 rounded-full flex items-center justify-center space-x-12"
    >
  {/* Logo */}
  <Link to="/" className="flex items-center justify-center">
    <img
      src="/l2.jpeg"
      alt="logo"
      className="object-contain h-16 w-fit mix-blend-multiply filter brightness-200 -mt-3 invert"
    />
  </Link>

  {/* Nav Links */}
  <nav className="flex space-x-10 text-black font-medium mt-3">
    <Link
      to="/"
      className={`hover:text-blue-700 transition duration-300 transform hover:scale-105 flex flex-col items-center ${
        location.pathname === "/" ? "text-blue-700" : ""
      }`}
      onClick={() => setActiveItem("Home")}
    >
      Home
      {location.pathname === "/" && (
        <Logo className="text-blue-700 mt-0.5 w-6 h-6" />
      )}
    </Link>

    <Link
      to="/solutions"
      className={`hover:text-blue-700 transition duration-300 transform hover:scale-105 flex flex-col items-center ${
        location.pathname === "/solutions" ? "text-blue-700" : ""
      }`}
      onClick={() => setActiveItem("Solutions")}
    >
      IT Solutions
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
            Cofounder Registration
          </Link>
        </div>
      )}
    </div>

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
      to="/career"
      className={`hover:text-blue-700 transition duration-300 transform hover:scale-105 flex flex-col items-center ${
        location.pathname === "/career" ? "text-blue-700" : ""
      }`}
      onClick={() => setActiveItem("Career")}
    >
      Career
      {location.pathname === "/career" && (
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
</div>


      {/* 🔹 Mobile Floating Navigation */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="lg:hidden fixed bottom-1 w-screen bg-white shadow-xl p-1 flex justify-between items-center rounded-2xl border-t border-gray-300 backdrop-blur-xl z-50 flex-col"
      >
        <div className="flex justify-between w-full">
          <NavItem to="/" icon={<FiHome />} label="Home" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem to="/solutions" icon={<AiOutlineSolution />} label="Solutions" activeTab={activeTab} setActiveTab={setActiveTab} />
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
              className="w-full bg-white shadow-lg rounded-xl p-2 grid grid-cols-2 gap-2"
            >
              <NavItem to="/startup-reg" icon={<AiOutlineTeam />} label="Startup Registration" activeTab={activeTab} setActiveTab={setActiveTab} />
              <NavItem to="/cofounder-reg" icon={<FaRegUser />} label="Cofounder Registration" activeTab={activeTab} setActiveTab={setActiveTab} />
              <NavItem to="/business-idea-hub" icon={<AiOutlineBulb />} label="Business Ideation Hub" activeTab={activeTab} setActiveTab={setActiveTab} />
              <NavItem to="/business-consultation" icon={<MdBusinessCenter />} label="Business Consultation" activeTab={activeTab} setActiveTab={setActiveTab} />
              <NavItem to="/career" icon={<AiOutlineSolution />} label="Career" activeTab={activeTab} setActiveTab={setActiveTab} />
              <NavItem to="/contact" icon={<FaRegCalendarAlt />} label="Contact" activeTab={activeTab} setActiveTab={setActiveTab} />
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
          <div className="w-10 h-8 flex items-center justify-center rounded-lg text-gray-700">{icon}</div>
          <span className="mt-1 text-xs font-medium">{label}</span>
        </button>
      )}
    </motion.div>
  );
};

export default Navbar;
