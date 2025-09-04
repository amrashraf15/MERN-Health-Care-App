import React, { useEffect } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { motion as Motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  const why = [
    {
      title: "Efficiency",
      desc: "Streamlined appointment scheduling that fits into your busy lifestyle",
    },
    {
      title: "Convenience",
      desc: "Access to a network of trusted healthcare professionals in your area.",
    },
    {
      title: "Personalization",
      desc: "Tailored recommendations and reminders to help you stay on top of your health.",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="my-20 py-10 px-4 md:px-8">
      {/* Title */}
      <Motion.h1
        className="font-medium text-center my-5 text-3xl md:text-4xl lg:text-5xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        About <span className="font-bold text-primary">US</span>
      </Motion.h1>

      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center px-4 md:px-8 lg:px-16 gap-10">
        {/* Image */}
        <Motion.div
          className="border rounded-lg overflow-hidden w-full sm:max-w-72 shadow-lg"
          data-aos="fade-right"
        >
          <img
            src={assets.about_image}
            alt="about"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </Motion.div>

        {/* Text Content */}
        <Motion.div
          className="flex-1 flex-col max-w-[480px] mx-4 md:mx-12 lg:mx-20 lg:max-w-[560px]"
          data-aos="fade-left"
        >
          <p className="text-gray-700 leading-relaxed">
            Welcome to <span className="font-semibold text-primary">CareWise</span> — your smart
            companion for streamlined healthcare. At CareWise, we believe managing your health
            should be simple, accessible, and stress-free. Our platform empowers you to book
            appointments, track medical records, and stay connected with trusted healthcare providers
            — all in one place. <br /> <br />
            <span className="font-medium">Driven by innovation, designed for care.</span> We’re
            committed to using the latest technology to improve how patients and doctors interact.
            Whether you’re scheduling a routine checkup or managing long-term care, CareWise is here
            to make the experience smoother and more personalized.
          </p>

          <p className="font-medium text-2xl md:text-3xl lg:text-4xl py-6 text-primary">
            Our Vision
          </p>
          <p className="text-gray-700 leading-relaxed">
            At CareWise, our vision is to redefine how people connect with healthcare. We aim to
            close the gap between patients and providers by offering a unified platform that brings
            care closer, faster, and more efficiently — when and where you need it most.
          </p>
        </Motion.div>
      </div>

      {/* Why Choose Us */}
      <Motion.div
        className="mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-medium text-2xl md:text-3xl lg:text-4xl py-6 text-center text-primary">
          Why Choose Us
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {why.map((t, index) => (
            <Motion.div
              key={t.title}
              className="border rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 bg-white"
              data-aos="fade-up"
              data-aos-delay={index * 150} // staggered delay
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="uppercase text-lg font-semibold text-primary">
                {t.title}
              </h3>
              <p className="text-gray-600 mt-3">{t.desc}</p>
            </Motion.div>
          ))}
        </div>
      </Motion.div>
    </div>
  );
};

export default About;
