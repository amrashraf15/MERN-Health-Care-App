import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'

const MyAppointments = () => {
  const { appointments, listAppointment,cancelAppointment } = useAuthStore()

  useEffect(() => {
    listAppointment()
  }, [listAppointment])

  return (
    <div className="min-h-screen w-full mt-20 px-4 sm:px-8 md:px-16">
      <p className="pb-3 pt-8 mt-12 font-medium border-b text-lg sm:text-xl">My Appointments</p>

      <div className="flex flex-col gap-6 mt-6">
        {appointments.map((item) => (
          <div
            key={item._id}
            className="border rounded-xl shadow-sm p-4 flex flex-col md:flex-row gap-4 md:items-start bg-base-100"
          >
            {/* Doctor Image */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img
                className="w-32 h-32 object-cover rounded-md bg-base-200"
                src={item.docData.image || '/avatar.png'}
                alt={item.docData.name}
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1 space-y-1 text-center md:text-left">
              <p className="font-semibold text-xl">{item.docData.name}</p>
              <p className="text-sm text-gray-600">{item.docData.speciality}</p>
              <div className="text-sm mt-2">
                <p className="font-medium">Address:</p>
                <p>{item.docData.address.address1}</p>
                <p>{item.docData.address.address2}</p>
              </div>
              <p className="text-sm font-medium mt-2">
                Date & Time: <span className="text-primary">{item.slotDate} | {item.slotTime}</span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 justify-center md:justify-start items-center md:items-end mt-4 md:mt-0">
                {!item.isCompleted && <button disabled={item.cancelled} onClick={()=>cancelAppointment(item._id)} className={`text-sm w-full md:w-40 px-4 py-2 border rounded  ${item.cancelled ? "bg-red-500" :"hover:bg-red-600 hover:scale-105"}  transition-all duration-300`}>
                  {item.cancelled ? "cancelled" : "Cancel Appointment"}
                </button>}
                {item.isCompleted &&
                    <button disabled={item.isCompleted}  className={`text-sm w-full md:w-40 px-4 py-2 border rounded  ${item.isCompleted? "bg-green-500" :""}  transition-all duration-300`}>
                        Completed
                </button>
                }
            
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
