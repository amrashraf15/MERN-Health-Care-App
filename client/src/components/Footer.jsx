import { Link } from 'react-router-dom';
import { Hospital} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-base-300  px-6 md:px-20 py-10 ">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* Logo + Description */}
        <div className="md:w-1/2">
          <Link
          to="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-all"
        >
          <Hospital className="w-8 h-8 text-primary" />
          <h1 className="text-lg font-bold">CareWise</h1>
        </Link>
          <p className="text-sm  max-w-md">
            CareWise is a modern healthcare platform designed to simplify patient care and clinic management. From easy registration and appointment scheduling to secure medical record storage and real-time SMS notifications, HealthEase empowers both patients and healthcare providers with the tools they need for efficient and compassionate care. Whether you're booking a consultation or managing clinic operations, our user-friendly interface and smart features help streamline the 
            entire healthcare experience.
          </p>
        </div>

        {/* Company Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold ">COMPANY</h3>
          <Link to="/" className="text-sm hover:underline">Home</Link>
          <Link to="/about" className="text-sm hover:underline">About us</Link>
          <Link to="/contact" className="text-sm hover:underline">Contact us</Link>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">GET IN TOUCH</h3>
          <p className="text-sm">+020 000 0000 00</p>
          <p className="text-sm">amrashraf1592@gmail.com</p>
        </div>
      </div>

      {/* Copyright */}
      <hr className="my-6 border-gray-200" />
      <p className="text-center text-xs text-gray-500">
        Copyright © 2025 Amr Ashraf All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
