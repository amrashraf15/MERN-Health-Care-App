import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
  import { Settings } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { assets } from '../assets/assets_frontend/assets.js';

const DesktopNavbar = () => {
  const { authUser, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Navigation Links */}
      <nav className="hidden lg:flex items-center gap-6">
        <Link to="/" className="hover:border-b-4 hover:border-secondary transition-all duration-200">Home</Link>
        <Link to="/about" className="hover:border-b-4 hover:border-secondary transition-all duration-200">About</Link>
        <Link to="/doctors" className="hover:border-b-4 hover:border-secondary transition-all duration-200">All Doctors</Link>
        <Link to="/contact" className="hover:border-b-4 hover:border-secondary transition-all duration-200">Contact</Link>
        <a href='http://localhost:5174' target="_blank" className="border-2 rounded-full px-3 py-2 hover:border-white transition-all duration-200">Admin Panel</a>
      </nav>

      {/* Settings & Auth Area */}
      <div className="hidden lg:flex items-center gap-6">
        <Link to="/settings" className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>

        {authUser ? (
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <img
                src={authUser.image || "/avatar.png"}
                alt="profile"
                className="w-8 h-8 rounded-full object-cover border-2"
              />
              <img src={assets.dropdown_icon} alt="dropdown" className="w-4 h-4" />
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 border bg-base-300 rounded-lg shadow-lg py-2 z-50">
                <Link
                  to="/my-profile"
                  className="block px-4 py-2 hover:text-primary"
                  onClick={() => setShowDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/my-appointments"
                  className="block px-4 py-2 hover:text-primary "
                  onClick={() => setShowDropdown(false)}
                >
                  My Appointments
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setShowDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:text-primary "
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/signup"
            className="px-4 py-2 border-2 border-secondary hover:bg-secondary hover:border-white rounded-full text-center"
          >
            Create Account
          </Link>
        )}
      </div>
    </>
  );
};

export default DesktopNavbar;

