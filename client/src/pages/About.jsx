import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  const why = [{title:"Efficiency",desc:"Streamlined appointment scheduling that fits into your busy lifestyle"},
              {title:"Convenience",desc:"Access to a network of trusted healthcare professionals in your area."},
              {title:"Personalization",desc:"Tailored recommendations and reminders to help you stay on top of your health."}]
  return (
    <div className='my-20 py-10 px-4 md:px-8'>
      <h1 className='font-medium text-center my-5 text-3xl md:text-4xl lg:text-5xl'>About <span className='font-bold'>US</span></h1>
      <div className='flex flex-col md:flex-row items-center px-4 md:px-8 lg:px-16 '>
        {/*Image */}
        <div className='border rounded overflow-hidden w-full sm:max-w-72'>
          <img src={assets.about_image} alt="about image" />
        </div>
        {/*About Us  */}
        <div className='flex-1 flex-col max-w-[480px] mx-8 md:mx-16 lg:mx-32 lg:max-w-[560px]'>
            <p>Welcome to CareWise — your smart companion for streamlined healthcare.
            At CareWise, we believe managing your health should be simple, accessible, and stress-free. Our platform empowers you to book appointments, track medical records, and stay connected with trusted healthcare providers — all in one place.
              Driven by innovation, designed for care.
            We’re committed to using the latest technology to improve how patients and doctors interact. Whether you’re scheduling a routine checkup or managing long-term care, CareWise is here to make the experience smoother and more personalized.</p>
            <p className='font-medium text-2xl md:text-3xl lg:text-4xl py-4'>Our Vision</p>
            <p className=''>
              At CareWise, our vision is to redefine how people connect with healthcare. We aim to close the gap between patients and providers by offering a unified platform that brings care closer, faster, and more efficiently — when and where you need it most.
            </p>
        </div>
      </div>
      <div>
        <p className='font-medium items-start text-2xl md:text-3xl lg:text-4xl py-4'>Why Choose Us</p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {why.map((t) => (
            <div key={t.title} className='border rounded-sm px-4 md:px-8 '>
              <h3 className='uppercase pt-5'>{t.title}</h3>
              <p className='text-sm py-5 px-10'>{t.desc}</p>
            </div>
          ))}

        </div>
      </div>

    </div>
  )
}

export default About