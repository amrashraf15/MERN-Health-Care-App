import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';


const DoctorsMenu = () => {
    const { doctors, getAllDoctors } = useAuthStore();
    useEffect(() => {
    getAllDoctors(); 
  }, [getAllDoctors]);
    const navigate = useNavigate()
  return (
    <div className='flex flex-col gap-4 px-4 md:px-8 lg:px-12   py-10 my-16 items-center'>
        <h1 className='font-bold text-3xl md:text-4xl lg:text-5xl text-center'>Top Doctors To Bank</h1>
        <p className='text-sm text-center max-w-xl'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-3 sm:px-0 pt-5'>
            {doctors.slice(0,10).map((doctor) => (
                <div onClick={()=>navigate(`/doctors/appointment/${doctor._id}`)} key={doctor._id} className='border border-base-300 rounded-xl pb-4 overflow-hidden hover:translate-y-[-20px] transition-all duration-200'>
                    <img className='bg-base-200' src={doctor.image || '/avatar.png'} alt={doctor.name} />
                    <div className='flex flex-col pt-2 text-center'>
                        <div className={`flex items-center  mx-auto gap-2`}>
                            <p className={`w-2 h-2 rounded-full ${doctor.available? "bg-green-500" : "bg-red-500"}`}></p>
                            <p>{doctor.available? "Available" : "Not Available"}</p>
                        </div>
                        <p className='font-medium text-lg'>{doctor.name}</p>
                        <p className='text-sm '>{doctor.speciality}</p>
                    </div>
                </div>
            ))}
        </div>
        <button onClick={()=>{navigate(`/doctors`);scrollTo(0,0)}} className='mx-auto my-4 px-12 py-3 border bg-primary hover:scale-110 rounded-full transition-all duration-200'>More</button>
    </div>
  )
}

export default DoctorsMenu