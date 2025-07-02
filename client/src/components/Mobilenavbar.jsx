import { Menu, Settings, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Mobilenavbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { authUser, logout } = useAuthStore();

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showMobileMenu]);

  return (
    <div className="flex gap-4 lg:hidden z-50 relative">
      {/* Settings Icon */}
      <Link to="/settings" className="flex items-center">
        <Settings className="w-8 h-6" />
      </Link>

      {/* Menu Toggle Button */}
      <button
        onClick={() => setShowMobileMenu(true)}
        type="button"
        aria-label="Open Menu"
      >
        <Menu className="h-8 w-8 text-primary" />
      </button>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black z-[9998]"
            onClick={() => setShowMobileMenu(false)}
          />

          {/* Sidebar Menu */}
          <div className="fixed top-0 right-0 h-[1000px] w-64 bg-black z-[9999] p-6 shadow-lg flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-primary">Menu</h2>
              <button
                onClick={() => setShowMobileMenu(false)}
                aria-label="Close Menu"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-5 text-white">
              {['/', '/about', '/doctors', '/contact', '/admin'].map((path, index) => (
                <Link
                  key={index}
                  to={path}
                  onClick={() => setShowMobileMenu(false)}
                  className="hover:border-b border-secondary"
                >
                  {path === '/'
                    ? 'Home'
                    : path
                        .replace('/', '')
                        .replace('-', ' ')
                        .replace(/\b\w/g, l => l.toUpperCase())}
                </Link>
              ))}

              {/* Authenticated-only Links */}
              {authUser && (
                <>
                  <Link to="/my-profile" onClick={() => setShowMobileMenu(false)}>My Profile</Link>
                  <Link to="/my-appointments" onClick={() => setShowMobileMenu(false)}>My Appointments</Link>
                </>
              )}

              {/* Auth Actions */}
              {authUser ? (
                <button
                  className="mt-4 px-4 py-2 border-2 border-secondary hover:bg-secondary hover:border-white rounded-full text-white"
                  onClick={() => {
                    logout();
                    setShowMobileMenu(false);
                  }}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/signup"
                  onClick={() => setShowMobileMenu(false)}
                  className="mt-20 px-4 py-2 border-2 border-secondary hover:bg-secondary hover:border-white rounded-full text-white text-center"
                >
                  Create Account
                </Link>
              )}
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default Mobilenavbar;





