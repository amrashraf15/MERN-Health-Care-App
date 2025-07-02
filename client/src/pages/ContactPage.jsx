import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const ContactPage = () => {
  return (
    <div className='my-20 py-10 px-8 md:px-16 lg:px-24'>
      <div className='flex flex-col md:flex-row items-center justify-center'>
        <div className='border rounded overflow-hidden w-full sm:max-w-72'>
          <img src={assets.contact_image} alt="contact image" />
        </div>
        <div className='flex mx-10 py-10 flex-col text-center gap-4'>
          <h3 className='text-3xl md:text-4xl'>Our Office</h3>
          <p className='text-sm'>140 Nasr Station<br/>Nasr City, Cairo</p>
          <p className='text-sm'>Tel:(02) 48427894<br/>Email:amrashraf1592@gmail.com</p>
          <h3 className='text-xl md:text-2xl'>Careers at CareWise</h3>
          <p className='text-sm'>Learn more about our teams and job openings.</p>
          <button className="flex items-start text-sm m-auto gap-3 px-4 py-2 border hover:scale-110 hover:bg-secondary transition duration-200 rounded-full">Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default ContactPage