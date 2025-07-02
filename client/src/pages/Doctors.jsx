import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useAdminStore } from '../../../admin/src/store/useAdminStore.js';

const Doctors = () => {
  const { doctors, getAllDoctors } = useAdminStore();
  const navigate = useNavigate()
  const { speciality } = useParams();
  const [filterDoc,setFilterDoc] = useState([]);

  const applyFilter = () => {
    if(speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    }else{
      setFilterDoc(doctors);
    }
  }
  useEffect(() => {
    getAllDoctors();
    applyFilter()
  },[getAllDoctors,doctors,speciality])
  return (
    <div className='px-6 md:px-8 lg:px-16 mt-20 py-10'>
      <p>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='flex flex-col gap-4 '>
        <p onClick={() => speciality === 'General physician' ? navigate(`/doctors`):navigate(`/doctors/General physician`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-base-200 rounded transition-all cursor-pointer  ${speciality === "General physician" ? "text-primary":"" }`}>General Physician</p>
        <p onClick={() => speciality === 'Gynecologist' ? navigate(`/doctors`):navigate(`/doctors/Gynecologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-base-200 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "text-primary":"" } `}>Gynecologist</p>
        <p onClick={() => speciality === 'Dermatologist' ? navigate(`/doctors`):navigate(`/doctors/Dermatologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-base-200 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "text-primary":"" } `}>Dermatologist</p>
        <p onClick={() => speciality === 'Pediatricians' ? navigate(`/doctors`):navigate(`/doctors/Pediatricians`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-base-200 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "text-primary":"" } `}>Pediatricians</p>
        <p onClick={() => speciality === 'Neurologist' ? navigate(`/doctors`):navigate(`/doctors/Neurologist`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-base-200 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "text-primary":"" } `}>Neurologist</p>
        <p onClick={() => speciality === 'Gastroenterologistt' ? navigate(`/doctors`):navigate(`/doctors/Gastroenterologistt`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-base-200 rounded transition-all cursor-pointer ${speciality === "Gastroenterologistt" ? "text-primary":"" } `}>Gastroenterologistt</p>
        </div>
        <div className='w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-3 sm:px-0 pt-5'>
          {filterDoc.map((doctor)=>(
            <div key={doctor._id} onClick={()=>navigate(`/doctors/appointment/${doctor._id}`)} className='border border-base-300 rounded-xl pb-4 overflow-hidden hover:translate-y-[-20px] transition-all duration-200'>
                <img className='bg-base-200' src={doctor.image || '/avatar.png'} alt={doctor.name} />
                    <div className='flex flex-col pt-2 text-center'>
                        <div className='flex items-center  mx-auto gap-2'>
                          <p className={`w-2 h-2 rounded-full ${doctor.available? "bg-green-500" : "bg-red-500"}`}></p>
                          <p>{doctor.available? "Available" : "Not Available"}</p>
                        </div>
                        <p className='font-medium text-lg'>{doctor.name}</p>
                        <p className='text-sm '>{doctor.speciality}</p>
                    </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors