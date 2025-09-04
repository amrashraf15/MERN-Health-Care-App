import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';
import { motion as Motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Banner = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <Motion.div
      className="bg-primary flex flex-col md:flex-row rounded-2xl px-8 md:px-12 lg:px-16 my-12 py-8 md:py-16 mx-6 md:mx-12 lg:mx-16 shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Left Side */}
      <div
        className="flex-1 flex flex-col justify-center items-start gap-6"
        data-aos="fade-right"
      >
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
          <p>Book Appointment</p>
          <p className="mt-2">With 1000+ Trusted Doctors</p>
        </div>

        <Motion.button
          onClick={() => {
            navigate('/signup');
            scrollTo(0, 0);
          }}
          className="flex items-center text-sm md:text-base font-medium gap-3 px-8 py-3 border border-white text-white bg-transparent hover:bg-white hover:text-primary transition-all duration-300 rounded-full shadow-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Account
        </Motion.button>
      </div>

      {/* Right Side */}
      <Motion.div
        className="hidden md:flex md:w-1/2 lg:w-[370px] relative justify-center items-end"
        data-aos="fade-left"
      >
        <img
          className="w-full max-w-sm md:max-w-md object-contain drop-shadow-xl"
          src={assets.appointment_img}
          alt="appointment illustration"
        />
      </Motion.div>
    </Motion.div>
  );
};

export default Banner;
