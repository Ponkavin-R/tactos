import { FiHome } from "react-icons/fi";
import { AiOutlineTeam, AiOutlineBulb, AiOutlineSolution } from "react-icons/ai";
import { FaRegCalendarAlt, FaRegUser } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link , useLocation} from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { MdMoreHoriz } from "react-icons/md";
import  {ReactComponent as Logo}  from "../assest/l2.svg";
const Navbar = ({ isLoggedIn, handleLogout}) => {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState("/");
  const [activeItem, setActiveItem] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [sidebarLinks, setSidebarLinks] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const location = useLocation();

  const toggleNotificationPanel = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  
    // Populate sidebar links
    setSidebarLinks([
      { to: "/startup-reg", label: "Startup Registration" },
      { to: "/cofounder-reg", label: "Cofounder Registration" },
      { to: "/business-idea-hub", label: "Business Ideation Hub" },
      { to: "/career", label: "Career" },
      { to: "/contact", label: "Contact" }
    ]);
  }, []);
  
  if (!isClient) return null;

  return (
    <div className="w-full container mx-auto">
      {/* 🔹 Mobile Navbar */}
      <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="lg:hidden top-0 h-fit left-0 w-screen -translate-x-1/2 bg-gradient-to-r from-[#0a192f] to-[#1c3b57] shadow-xl p-1 flex justify-between items-center rounded-xl border border-gray-200 backdrop-blur-xl z-50"
    >
      {/* 🔹 Logo */}
      <Link to="/" className="flex flex-row items-center">
        <img
          src="/l1.png"
          alt=""
          className="object-contain h-16 w-fit"
        />
        {/* <span className="text-gray-800 text-3xl font-extrabold tracking-wide">TACTOS</span> */}
      </Link>

    </motion.div>

      {/* 🔹 Desktop Navbar */}
      <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="hidden lg:flex bg-gradient-to-r bg-white shadow-lg px-6 items-center justify-between rounded-xl w-full mx-auto"
    >
      {/* Logo Section */}
      <Link to="/" className="flex items-center space-x-3">
      <img 
  src="/l1.png" 
  alt="Logo" 
  className="h-20 w-auto object-contain scale-110 bg-transparent" 
/>

        {/* <span className="text-blue-950 text-3xl font-extrabold tracking-wide">TACTOS</span> */}
      </Link>

      {/* Navigation Links */}
      <nav className="flex space-x-10 text-black font-medium">
      <Link
        to="/"
        className={`hover:text-blue-700 transition duration-300 transform hover:scale-105 flex flex-col items-center ${
          location.pathname === "/" ? "text-blue-700" : ""
        }`}
        onClick={() => setActiveItem("Home")}
      >
        Home
        {activeItem === "Home" && <Logo className="text-blue-700 mt-1 w-8 h-8" />}
      </Link>

      <Link
        to="/solutions"
        className={`hover:text-blue-700 transition duration-300 transform hover:scale-105 flex flex-col items-center ${
          location.pathname === "/solutions" ? "text-blue-700" : ""
        }`}
        onClick={() => setActiveItem("Solutions")}
      >
        Solutions
        {activeItem === "Solutions" && <Logo className="text-blue-700 mt-1 w-8 h-8" />}
      </Link>

      {/* Dropdown Menu for Registration */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-1 hover:text-blue-700 transition duration-300 transform hover:scale-105"
        >
          <span>Registration</span>
          <ChevronDown size={18} />
        </button>

        {isDropdownOpen && (
          <div className="absolute left-0 mt-2 w-56 bg-white shadow-md rounded-lg py-2 z-50">
            <Link
              to="/startup-reg"
              className="block px-4 py-2 text-black hover:bg-blue-950 hover:text-white transition duration-300"
              onClick={() => {
                setIsDropdownOpen(false);
                setActiveItem("Startup Registration");
              }}
            >
              Startup Registration
            </Link>
            <Link
              to="/cofounder-reg"
              className="block px-4 py-2 text-black hover:bg-blue-950 hover:text-white transition duration-300"
              onClick={() => {
                setIsDropdownOpen(false);
                setActiveItem("Cofounder Registration");
              }}
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
        {activeItem === "Events" && <Logo className="text-blue-700 mt-1 w-8 h-8" />}
      </Link>

      <Link
        to="/business-idea-hub"
        className={`hover:text-blue-700 transition duration-300 transform hover:scale-105 flex flex-col items-center ${
          location.pathname === "/business-idea-hub" ? "text-blue-700" : ""
        }`}
        onClick={() => setActiveItem("Business Ideation Hub")}
      >
        Business Ideation Hub
        {activeItem === "Business Ideation Hub" && <Logo className="text-blue-700 mt-1 w-8 h-8" />}
      </Link>

      <Link
        to="/business-consultation"
        className={`hover:text-blue-700 transition duration-300 transform hover:scale-105 flex flex-col items-center ${
          location.pathname === "/business-consultation" ? "text-blue-700" : ""
        }`}
        onClick={() => setActiveItem("Business Consultation")}
      >
        Business Consultation
        {activeItem === "Business Consultation" && <Logo className="text-blue-700 mt-1 w-8 h-8" />}
      </Link>

      <Link
        to="/career"
        className={`hover:text-blue-700 transition duration-300 transform hover:scale-105 flex flex-col items-center ${
          location.pathname === "/career" ? "text-blue-700" : ""
        }`}
        onClick={() => setActiveItem("Career")}
      >
        Career
        {activeItem === "Career" && <Logo className="text-blue-700 mt-1 w-8 h-8" />}
      </Link>

      <Link
        to="/contact"
        className={`hover:text-blue-700 transition duration-300 transform hover:scale-105 flex flex-col items-center ${
          location.pathname === "/contact" ? "text-blue-700" : ""
        }`}
        onClick={() => setActiveItem("Contact")}
      >
        Contact
        {activeItem === "Contact" && <Logo className="text-blue-700 mt-1 w-8 h-8" />}
      </Link>
    </nav>

    </motion.header>


 {/* Mobile Floating Navigation */}
 <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="lg:hidden fixed bottom-1 w-screen bg-white shadow-xl p-1 flex justify-between items-center rounded-2xl border-t border-gray-300  backdrop-blur-xl z-50 flex-col"
      >
        <div className="flex justify-between w-full">
          <NavItem to="/" icon={<FiHome />} label="Home" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem to="/solutions" icon={<AiOutlineSolution />} label="Solutions" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem to="/events" icon={<FaRegCalendarAlt />} label="Events" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem onClick={() => setIsMoreOpen(!isMoreOpen)} icon={<MdMoreHoriz />} label="More" activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        
        {/* More Options Expanding Menu */}
        <AnimatePresence>
          {isMoreOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="w-full bg-white shadow-lg rounded-xl p-2 grid grid-cols-2 sm:grid-cols-2 gap-2 "
            >
              <NavItem to="/startup-reg" icon={<AiOutlineTeam />} label="Startup Registration" activeTab={activeTab} setActiveTab={setActiveTab} />
<NavItem to="/cofounder-reg" icon={<FaRegUser />} label="Cofounder Registration" activeTab={activeTab} setActiveTab={setActiveTab} />
<NavItem to="/business-idea-hub" icon={<AiOutlineBulb />} label="Business Ideation Hub" activeTab={activeTab} setActiveTab={setActiveTab} />
<NavItem to="/business-consultation" icon={<AiOutlineBulb />} label="Business Consultation" activeTab={activeTab} setActiveTab={setActiveTab} />
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
        <Link to={to} onClick={() => setActiveTab(to)} className="relative flex flex-col items-center">
          <div className={`w-12 h-8 flex items-center justify-center rounded-lg transition-all ${isActive ? "text-white bg-blue-950" : "text-gray-700"}`}>{icon}</div>
          <span className="mt-1 text-xs font-medium whitespace-nowrap">{label}</span>

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
