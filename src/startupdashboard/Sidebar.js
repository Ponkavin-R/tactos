import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { useEffect } from "react";

const navItems = [
  { name: "Home", path: "/startup-dashboard" },
  { name: "Profile", path: "/startup-dashboard/profile" },
  { name: "Job Portal", path: "/startup-dashboard/jobs" },
  { name: "Funding", path: "/startup-dashboard/funding" },
  { name: "Logout", path: "/" },
];

const Sidebar = ({ isOpen, toggleSidebar, isMobile }) => {
  // Prevent background scrolling when sidebar is open on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, isMobile]);

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-white text-blue-600 sm:hidden rounded-full shadow-lg focus:outline-none md:block"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-gray-800 text-white h-screen p-6 fixed top-0 left-0 z-40 transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="text-xl font-bold mb-8 tracking-wide">
          {isOpen ? "" : ""}
        </div>
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded transition font-medium hover:bg-gray-700 text-sm ${
                  isActive ? "bg-gray-700 font-semibold" : "text-gray-300"
                }`
              }
              title={isOpen ? "" : item.name}
            >
              {isOpen ? item.name : item.name.charAt(0)}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <>
            {/* Overlay to close on outside click */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              onClick={toggleSidebar}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50 p-6 md:hidden shadow-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold tracking-wide">Dashboard</span>
                <button onClick={toggleSidebar}>
                  <X className="text-white" size={24} />
                </button>
              </div>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={toggleSidebar}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded transition font-medium hover:bg-gray-700 ${
                        isActive ? "bg-gray-700 font-semibold" : "text-gray-300"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
