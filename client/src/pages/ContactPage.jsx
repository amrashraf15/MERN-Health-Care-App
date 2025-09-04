import React, { useEffect } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { motion as Motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <div className="my-20 py-10 px-8 md:px-16 lg:px-24">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Left Image */}
        <Motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="border rounded-xl overflow-hidden shadow-lg w-full sm:max-w-72"
          data-aos="fade-right"
        >
          <img
            src={assets.contact_image}
            alt="contact"
            className="w-full h-full object-cover"
          />
        </Motion.div>

        {/* Right Content */}
        <Motion.div
          className="flex flex-col text-center md:text-left gap-6 max-w-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          data-aos="fade-left"
        >
          <h3 className="text-3xl md:text-4xl font-semibold text-gray-800">
            Our <span className="text-primary">Office</span>
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            140 Nasr Station <br /> Nasr City, Cairo
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Tel: (02) 48427894 <br /> Email: amrashraf1592@gmail.com
          </p>

          <div className="mt-4">
            <h3 className="text-xl md:text-2xl font-medium text-gray-800">
              Careers at <span className="text-primary">CareWise</span>
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Learn more about our teams and job openings.
            </p>
          </div>

          <Motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 mx-auto md:mx-0"
          >
            Explore Jobs
          </Motion.button>
        </Motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
