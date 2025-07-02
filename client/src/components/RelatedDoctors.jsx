import { useEffect, useState } from "react";
import { doctors } from "../assets/assets_frontend/assets.js";  
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({docId,speciality}) => {
    const navigate = useNavigate();
    const [relDoc,setRelDoc] = useState([])

    useEffect(() => {
        if(doctors.length > 0 && speciality){
            const filteredDoctors = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
            setRelDoc(filteredDoctors);
        } else {
            setRelDoc([]);
        }
    },[doctors,docId,speciality])
  return (
    <div className="flex flex-col items-center pt-5">
        <p className="text-3xl md:text-4xl lg:text-5xl text-primary">Related Doctors</p>
        <p className="text-sm pt-2">Simply browse through our extensive list of trusted doctors.</p>
    <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-3 sm:px-0 pt-5">
        {relDoc.length > 0 && relDoc.map((doc) => (
            <div onClick={()=>navigate(`appointment/${doc._id}`)} key={doc._id} className='border border-base-300 rounded-xl pb-4 overflow-hidden hover:translate-y-[-20px] transition-all duration-200'>
                    <img className='bg-base-200' src={doc.image} alt={doc.name} />
                    <div className='flex flex-col pt-2 text-center'>
                        <div className='flex items-center  mx-auto gap-2 text-green-500'>
                            <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                            <p>Available</p>
                        </div>
                        <p className='font-medium text-lg'>{doc.name}</p>
                        <p className='text-sm '>{doc.speciality}</p>
                    </div>
                </div>
        ))}
    </div>
    </div>
  )
}

export default RelatedDoctors