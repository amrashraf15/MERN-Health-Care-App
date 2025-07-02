import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets';

const Banner = () => {
    const navigate = useNavigate()
  return (
    <div className='bg-primary flex rounded-lg px-8 md:px-12 lg:px-16 my-10 py-5 mx-6 md:mx-12 lg:mx-16'>
        {/*Left Side */}
        <div className='flex-1 flex-col py-8 md:py-16 lg:py-24'>
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold'>
            <p className=''>Book Appointment </p>
            <p>With 1000+ Trusted Doctors</p>
        </div>
            <button onClick={()=>{navigate('/signup');scrollTo(0,0)}} className="flex items-center text-sm mt-6 gap-3 px-8 py-2 text-center border hover:scale-110 hover:bg-secondary transition duration-200 rounded-full">
                Create Account
            </button>
        </div>
        {/*Right Side */}
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
            <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="appointment image" />
        </div>

    </div>
  )
}

export default Banner