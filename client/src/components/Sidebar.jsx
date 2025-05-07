import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaExclamationTriangle, FaListAlt, FaSignOutAlt, FaTimes, FaHome } from "react-icons/fa"; 
import { FcFeedback } from "react-icons/fc";
import LogoutModal from "./LogoutModal";
import UserAvatar from "./UserAvatar";

const Sidebar = ({ toggleSidebar, isSidebarOpen }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initials = sessionStorage.getItem('userInitials');
    const email = sessionStorage.getItem('userEmail');
    
    if (initials && email) {
      setUser({
        initials,
        email
      });
    }
  }, []);
  return (
    <div>
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block fixed inset-0 z-10 bg-[#063F3A] bg-opacity-80 md:w-64 md:h-full`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-4 flex-shrink-0 p-4 bg-gray-400 text-white">
            {user ? <UserAvatar setShowLogoutModal={setShowLogoutModal} /> : null }
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="flex-grow overflow-y-auto">
            <Link
              to="/"
              className="flex items-center space-x-2 p-3 hover:bg-[#063F3A] rounded-md text-white"
            >
              <FaHome className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 p-3 hover:bg-[#063F3A] rounded-md text-white"
            >
              <FaSearch className="w-5 h-5" />
              <span>Search the Database</span>
            </Link>
            <Link
              to="/report-scam"
              className="flex items-center space-x-2 p-3 hover:bg-[#063F3A] rounded-md text-white"
            >
              <FaExclamationTriangle className="w-5 h-5" />
              <span>Report a Scam</span>
            </Link>
            <Link
              to="/view-report"
              className="flex items-center space-x-2 p-3 hover:bg-[#063F3A] rounded-md text-white"
            >
              <FaListAlt className="w-5 h-5" />
              <span>View Submitted Reports</span>
            </Link>
            <Link
              to="/submit-testimonial"
              className="flex items-center space-x-2 p-3 hover:bg-[#063F3A] rounded-md text-white"
            >
              <FcFeedback className="w-5 h-5" />
              <span>Submit Testimonial</span>
            </Link>
            <Link
              to=""
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center space-x-2 p-3 hover:bg-[#063F3A] rounded-md text-white"
            >
              <FaSignOutAlt className="w-5 h-5" />
              <span>Logout</span>
            </Link>
          </div>
        </div>

        {showLogoutModal && (
          <LogoutModal onClose={() => setShowLogoutModal(false)} />
        )}
      </div>

      {/* Overlay for mobile */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } fixed inset-0 z-40 bg-[#063F3A] bg-opacity-50 md:hidden`}
        onClick={toggleSidebar}
      >
        <button
          className="cursor-pointer absolute top-4 left-4 text-white text-3xl z-50"
          onClick={(e) => {
            e.stopPropagation()
            toggleSidebar()
          }}
          >
          <FaTimes />
        </button>
        <div className="absolute top-4 border-2 border-gray-400 rounded-full right-4" onClick={(e) => e.stopPropagation()}>
          {user ? <UserAvatar setShowLogoutModal={setShowLogoutModal} /> : null}
        </div>

        <div className="flex flex-col items-center justify-center h-full space-y-4 z-50">
          <Link
              to="/"
              className="text-xl text-white"
          >
            Back to Home
          </Link>
          <Link
            to="/dashboard"
            className="text-white text-xl"
            onClick={toggleSidebar}
          >
            Search the Database
          </Link>
          <Link
            to="/report-scam"
            className="text-white text-xl"
            onClick={toggleSidebar}
          >
            Report a Scam
          </Link>
          <Link
            to="/view-report"
            className="text-white text-xl"
            onClick={toggleSidebar}
          >
            View Submitted Reports
          </Link>
          <Link
            to="/submit-testimonial"
            className="text-white text-xl"
            onClick={toggleSidebar}
          >
            Submit Testimonial
          </Link>
          <div onClick={(e) => { 
            e.stopPropagation();
              setShowLogoutModal(true);
          }}
            className="text-white text-xl">
            Logout
          </div>
        </div>
      </div>

      {/* Render the modal */}
      {showLogoutModal && (
          <LogoutModal onClose={() => setShowLogoutModal(false)} />
        )}
    </div>
  );
};

export default Sidebar;
