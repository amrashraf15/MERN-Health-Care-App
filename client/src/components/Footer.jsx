import { Link } from 'react-router-dom';
import { Hospital } from 'lucide-react';
import { motion as Motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <footer className="bg-base-300 px-6 md:px-20 py-12 rounded-t-2xl shadow-inner mt-16">
      <Motion.div
        className="flex flex-col md:flex-row justify-between gap-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Logo + Description */}
        <div className="md:w-1/2 space-y-4" data-aos="fade-right">
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
          >
            <Hospital className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold">CareWise</h1>
          </Link>
          <p className="text-sm text-gray-600 max-w-md leading-relaxed">
            CareWise is a modern healthcare platform designed to simplify patient
            care and clinic management. From appointment scheduling to secure
            medical records and real-time notifications, CareWise empowers both
            patients and healthcare providers with efficient and compassionate
            care.
          </p>
        </div>

        {/* Company Links */}
        <Motion.div
          className="flex flex-col gap-2"
          data-aos="fade-up"
        >
          <h3 className="font-semibold text-lg">Company</h3>
          <Link to="/" className="text-sm hover:underline hover:text-primary transition">
            Home
          </Link>
          <Link to="/about" className="text-sm hover:underline hover:text-primary transition">
            About Us
          </Link>
          <Link to="/contact" className="text-sm hover:underline hover:text-primary transition">
            Contact Us
          </Link>
        </Motion.div>

        {/* Contact Info */}
        <Motion.div
          className="flex flex-col gap-2"
          data-aos="fade-left"
        >
          <h3 className="font-semibold text-lg">Get in Touch</h3>
          <p className="text-sm">📞 +020 000 0000 00</p>
          <p className="text-sm">📧 amrashraf1592@gmail.com</p>
        </Motion.div>
      </Motion.div>

      {/* Divider + Copyright */}
      <Motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <hr className="my-6 border-gray-300" />
        <p className="text-center text-xs text-gray-500">
          © {new Date().getFullYear()} <span className="font-semibold">Amr Ashraf</span> — All Rights Reserved.
        </p>
      </Motion.div>
    </footer>
  );
};

export default Footer;
