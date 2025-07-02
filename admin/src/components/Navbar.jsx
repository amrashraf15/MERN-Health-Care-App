import { Hospital } from "lucide-react";
import { Settings } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";
import { useAdminStore } from "../store/useAdminStore.js";
import { useDoctorStore } from "../store/useDoctorStore.js";

const Navbar = () => {
  const { authAdmin, logout } = useAdminStore();
  const { authDoctor,logoutDoctor} = useDoctorStore();
  const location = useLocation();
  const pathname = location.pathname;

  
  let role = "Admin"; 

  if ( pathname === "/admin-login" || pathname === "/add-doctor" || pathname === "/all-appointments" || pathname === "/" || pathname === "/doctors-list") {
    role = "Admin";
  }

  if (pathname === "/doctor-login" || pathname === "/doctor-dashboard" || pathname === "/doctor-profile" || pathname === "/doctor-appointments" ) {
    role = "Doctor";
  }

  return (
    <div className="bg-base-100 border-b border-base-300 w-full fixed px-8 py-6 top-0 z-40 backdrop-blur-lg">
      <div className="flex items-center justify-between w-full">
        {/* Logo and App Name */}
        <Link
          to="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-all"
        >
          <Hospital className="w-8 h-8 text-primary" />
          <h1 className="text-lg font-bold">CareWise</h1>
          <p className="border px-2.5 py-0.5 rounded-full text-sm">{role}</p>
        </Link>

        {/* Logout button if admin is authenticated */}
        {authAdmin && role === "Admin" &&  (
          <div className="flex flex-row gap-2">
            <Link to="/settings" className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              <span className="hidden md:inline">Settings</span>
            </Link>
          <button
            onClick={logout}
            className="btn btn-sm btn-outline text-sm hover:bg-primary hover:text-white transition-all"
          >
            Logout
          </button>
          </div>
        )}
         {/* Logout button if Doctor is authenticated */}
          {authDoctor  &&  (
          <div className="flex flex-row gap-2">
            <Link to="/settings" className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              <span className="hidden md:inline">Settings</span>
            </Link>
          <button
            onClick={logoutDoctor}
            className="btn btn-sm btn-outline text-sm hover:bg-primary hover:text-white transition-all"
          >
            Logout
          </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
