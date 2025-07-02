import {
  LayoutDashboard,
  CalendarCheck,
  UserPlus,
  Stethoscope,
  Users
} from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/all-appointments', label: 'Appointments', icon: <CalendarCheck className="w-5 h-5" /> },
    { path: '/add-doctor', label: 'Add Doctor', icon: <UserPlus className="w-5 h-5" /> },
    { path: '/doctors-list', label: 'Doctors List', icon: <Stethoscope className="w-5 h-5" /> },
  ];

  return (
    <aside className="min-h-screen py-10 max-w-[200px]  border-r-2 border-base-200">
      <nav className="py-8 px-2 flex flex-col items-start gap-6">
        {links.map(({ path, label, icon }) => {
          const isActive = location.pathname === path;
          return (
            <div
              key={path}
              onClick={() => {
                navigate(path);
                scrollTo(0, 0);
              }}
              className={`flex flex-row gap-2 py-3 px-4  cursor-pointer items-center w-full
                ${isActive ? "border-r-4 border-primary font-semibold" : "hover:border-r-4 hover:border-primary"}
              `}
            >
              {icon}
              <span className="hidden md:inline">{label}</span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
