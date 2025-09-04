import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { motion as Motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DoctorsMenu = () => {
  const { doctors, getAllDoctors } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    getAllDoctors();
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, [getAllDoctors]);

  
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col gap-6 px-4 md:px-8 lg:px-12 py-16 my-16 items-center bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Heading */}
      <Motion.h1
        className="font-bold text-3xl md:text-4xl lg:text-5xl text-center"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Top Doctors To <span className="text-primary">Bank On</span>
      </Motion.h1>

      <Motion.p
        className="text-sm md:text-base text-center max-w-xl text-gray-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Simply browse through our extensive list of trusted doctors.
      </Motion.p>

      {/* Doctors Grid */}
      <div
        className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-10"
        data-aos="fade-up"
      >
        {doctors.slice(0, 10).map((doctor, index) => (
          <Motion.div
            key={doctor._id}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            onClick={() => navigate(`/doctors/appointment/${doctor._id}`)}
            className="cursor-pointer border border-gray-200 bg-white shadow-md rounded-xl pb-4 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <img
              className="w-full h-86 object-cover bg-gray-100"
              src={doctor.image || '/avatar.png'}
              alt={doctor.name}
            />
            <div className="flex flex-col pt-4 text-center px-4">
              {/* Availability */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    doctor.available ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></span>
                <p className="text-sm text-gray-600">
                  {doctor.available ? 'Available' : 'Not Available'}
                </p>
              </div>
              {/* Name + Speciality */}
              <p className="font-semibold text-lg text-gray-900">
                {doctor.name}
              </p>
              <p className="text-sm text-gray-500">{doctor.speciality}</p>
            </div>
          </Motion.div>
        ))}
      </div>

      {/* More button */}
      <Motion.button
        onClick={() => {
          navigate(`/doctors`);
          scrollTo(0, 0);
        }}
        className="mx-auto mt-10 px-12 py-3 border bg-primary text-white font-medium hover:scale-110 rounded-full shadow-md transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        More
      </Motion.button>
    </div>
  );
};

export default DoctorsMenu;
