

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { FaBars, FaTimes } from "react-icons/fa";
import UserAvatar from "./UserAvatar";
import LogoutModal from "./LogoutModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
    <nav className="bg-white shadow-md h-[80px] px-4 sm:px-8 lg:px-30 flex items-center justify-between sticky top-0 z-50 w-full">
      {/* Logo */}
      <div className="logo text-[#0F766E] font-bold text-xl">FraudTrackr</div>

      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="hover:text-[#0F766E] transition-colors">Home</Link>
        <Link to="/about" className="hover:text-[#0F766E] transition-colors">About</Link>
        <Link to="/report-scam" className="hover:text-[#0F766E] transition-colors">Report Scam</Link>
        <Link to="/contact" className="hover:text-[#0F766E] transition-colors">Contact us</Link>
        <Link to="/search" className="hover:text-[#0F766E] transition-colors">Search</Link>
      </div>

      <div className="hidden lg:flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-2">
            <UserAvatar setShowLogoutModal={setShowLogoutModal} />
          </div>
        ) : (
          <Button>
            <Link to="/login">Login</Link>
          </Button>
        )}
      </div>

      <div className="md:hidden">
        <button 
          onClick={toggleMenu}
          className="cursor-pointer text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-[80px] left-0 right-0 bg-white shadow-lg py-4 px-6 z-50">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="hover:text-[#0F766E] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="hover:text-[#0F766E] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/report-scam" 
              className="hover:text-[#0F766E] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Report Scam
            </Link>
            <Link 
              to="/contact" 
              className="hover:text-[#0F766E] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Contact us
            </Link>
            <Link 
              to="/search" 
              className="hover:text-[#0F766E] transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Search
            </Link>
            <div className="pt-2">
            <div className="pt-2">
              {user ? (
                <div className="flex justify-center">
                  <UserAvatar setShowLogoutModal={setShowLogoutModal} />
                </div>
              ) : (
                <Button>
                  <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                </Button>
              )}
            </div>
            </div>
          </div>
        </div>
      )}

      
      {/* Render the modal */}
      {showLogoutModal && (
          <LogoutModal onClose={() => setShowLogoutModal(false)} />
        )}
    </nav>
  );
}