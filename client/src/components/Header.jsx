import {  ArrowRight } from 'lucide-react';
import { assets } from '../assets/assets_frontend/assets.js';

const Header = () => {
  return (
    <div className='flex flex-row md:flex-row flex-wrap bg-primary h-auto rounded-lg px-6 md:px-10 lg:px-20 '>
        {/*Left side */}
        <div className='w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <p className='text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight'>Book Appointment <br />With Trusted Doctors</p>
            <div className="flex flex-col md:flex-row items-center gap-3 font-light">
                <img className='w-28' src={assets.group_profiles} alt="group profiles" />
                <p>Simply browse through our extensive list of trusted doctors,
                    <br/>schedule your appointment hassle-free
                </p>

            </div>
            <a href="#speciality" className="flex items-start text-sm m-auto gap-3 px-4 py-2 border hover:scale-110 hover:bg-secondary transition duration-200 rounded-full">
                Book appointment
                <ArrowRight className='size-4 mt-1'/>
            </a>

        </div>
        {/*Right Side */}
        <div className='md:w-1/2 relative'>
            <img className='w-full md:w-3/4 md:absolute bottom-0 h-full md:h-3/4 object-contain rounded-lg' src={assets.header_img} alt="header image" />
        </div>
        
    </div>
  )
}

export default Header