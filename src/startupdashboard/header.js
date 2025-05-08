import { Menu } from "lucide-react";
import { motion } from "framer-motion";

const Header = ({ username, toggleSidebar }) => {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="w-screen top-0 z-30 bg-white shadow-sm sticky"
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* Left side - Logo and Hamburger */}
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="md:hidden focus:outline-none">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <img src="/logo.png" alt="Tactos Logo" className="h-10 object-contain" />
        </div>

        {/* Right side - Welcome message */}
        <div className="text-sm md:text-base text-gray-700 font-medium">
          Welcome, <span className="font-semibold text-blue-600">{username}</span>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
