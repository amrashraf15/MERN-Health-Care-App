import { specialityData } from '../assets/assets_frontend/assets.js';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Speciality = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true, 
      easing: 'ease-in-out',
    });
  }, []);
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      id="speciality"
      className="flex flex-col gap-6 py-16 items-center bg-gradient-to-b from-white via-gray-50 to-white"
    >
      {/* Heading */}
      <Motion.h1
        className="font-bold text-3xl md:text-4xl lg:text-5xl text-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Find By <span className="text-primary">Speciality</span>
      </Motion.h1>

      <Motion.p
        className="text-sm md:text-base text-center max-w-xl text-gray-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Simply browse through our extensive list of trusted doctors, and
        schedule your appointment hassle-free.
      </Motion.p>

      {/* Speciality Cards */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mt-10 w-full px-4 md:px-8 lg:px-16"
        data-aos="fade-up"
      >
        {specialityData.map((s, index) => (
          <Motion.div
            key={s.speciality}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link
              to={`/doctors/${s.speciality}`}
              className="flex flex-col items-center bg-white shadow-md rounded-xl p-5 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <img
                src={s.image}
                alt={s.speciality}
                className="w-20 h-20 object-contain mb-3"
              />
              <p className="mt-2 font-medium text-gray-800 text-center">
                {s.speciality}
              </p>
            </Link>
          </Motion.div>
        ))}
      </div>
    </div>
  );
};

export default Speciality;
