import { ArrowRight } from "lucide-react";
import { assets } from "../assets/assets_frontend/assets.js";
import { motion as Motion } from "framer-motion";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Motion.div
      className="flex flex-col md:flex-row bg-primary rounded-2xl px-6 md:px-10 lg:px-20 overflow-hidden relative"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Left side */}
      <Motion.div
        className="w-full md:w-1/2 flex flex-col items-start justify-center gap-6 py-12 md:py-[10vw] z-10"
        data-aos="fade-right"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
          Book Appointment <br /> With Trusted Doctors
        </h1>

        <Motion.div
          className="flex flex-col md:flex-row items-center gap-4 font-light text-white"
          data-aos="fade-up"
        >
          <img
            className="w-28 hover:scale-105 transition-transform duration-300"
            src={assets.group_profiles}
            alt="group profiles"
          />
          <p className="text-sm md:text-base leading-relaxed">
            Simply browse through our extensive list of trusted doctors,
            <br /> schedule your appointment hassle-free.
          </p>
        </Motion.div>

        <Motion.a
          href="#speciality"
          className="flex items-center text-sm gap-3 px-6 py-3 border border-white hover:bg-white hover:text-primary transition-all duration-300 rounded-full shadow-lg"
          data-aos="zoom-in"
          whileHover={{ scale: 1.05 }}
        >
          Book Appointment
          <ArrowRight className="size-4 mt-[2px]" />
        </Motion.a>
      </Motion.div>

      {/* Right Side */}
      <Motion.div
        className="w-full md:w-1/2 relative flex justify-center items-center"
        data-aos="fade-left"
      >
        <img
          className="w-full md:w-3/4 md:absolute bottom-0 h-full md:h-3/4 object-contain drop-shadow-2xl"
          src={assets.header_img}
          alt="header image"
        />
      </Motion.div>

      {/* Decorative background blob */}
      <Motion.div
        className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      />
    </Motion.div>
  );
};

export default Header;
