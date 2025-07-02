import { Hospital} from 'lucide-react';
import { Link } from 'react-router-dom';
import DesktopNavbar from './DesktopNavbar.jsx';
import Mobilenavbar from './Mobilenavbar.jsx';

const Navbar = () => {
  return (
    <div className="bg-base-100 border-b border-base-300 w-full fixed px-8 py-6 top-0 z-40 backdrop-blur-lg">
      <div className="flex items-center justify-between w-full">
        {/* Logo and Name */}
        <Link
          to="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-all"
        >
          <Hospital className="w-8 h-8 text-primary" />
          <h1 className="text-lg font-bold">CareWise</h1>
        </Link>

        {/* Desktop & Mobile Nav */}
        
          <DesktopNavbar />
          <Mobilenavbar />
      </div>
    </div>
  );
};

export default Navbar;
