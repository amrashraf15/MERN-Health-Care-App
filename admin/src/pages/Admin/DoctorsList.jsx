import React, { useEffect } from 'react';
import { useAdminStore } from '../../store/useAdminStore.js';

const DoctorsList = () => {
  const {
    doctors,
    getAllDoctors,
    changeDoctorAvailability,
  } = useAdminStore();

  useEffect(() => {
    getAllDoctors();
  }, [getAllDoctors]);

  return (
    <div className="mx-4 md:mx-8 mt-5 flex flex-col gap-3">
      <h1 className="font-semibold text-md md:text-xl text-start text-base-content">
        All Doctors
      </h1>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:px-0 pt-5 gap-4">
        {doctors.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No doctors found.
          </p>
        ) : (
          doctors.map((doctor) => (
            <div
              key={doctor._id || doctor.email}
              className="border border-base-300 rounded-xl pb-4 overflow-hidden hover:-translate-y-1 transition-all duration-200"
            >
              <img
                className="w-full object-cover h-fit bg-base-200"
                src={doctor.image || "/avatar.png"}
                alt={doctor.name}
              />

              <div className="flex flex-col pt-2 text-center">
                <div
                  className={`flex items-center justify-center mx-auto gap-2 ${
                    doctor.available ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      doctor.available ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></span>
                  <p>{doctor.available ? 'Available' : 'Unavailable'}</p>
                </div>

                <p className="font-medium text-lg">{doctor.name}</p>
                <p className="text-sm text-gray-600">{doctor.speciality}</p>

                <button
                  onClick={() => changeDoctorAvailability(doctor._id)}
                  className="mt-2 text-sm text-base-content border px-1.5 rounded-full py-0.5 hover:text-secondary-content"
                >
                  Toggle Availability
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
