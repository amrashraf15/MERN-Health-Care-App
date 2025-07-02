import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets.js'
import { useEffect, useState } from 'react'
import RelatedDoctors from '../components/RelatedDoctors.jsx'
import { useAuthStore } from '../store/useAuthStore.js'
import toast from 'react-hot-toast'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, getAllDoctors,bookAppointment  } = useAuthStore();
  const [docInfo, setDocinfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [slotDate, setSlotDate] = useState('');

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  useEffect(() => {
    getAllDoctors();
  },[getAllDoctors,doctors])
  
  const fetchDocInfo = () => {
    const doctor = doctors.find(doc => doc._id === docId)
    setDocinfo(doctor)
  }

  const getAvailableSlots = () => {
    const today = new Date()
    const allSlots = []

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date()
      currentDate.setDate(today.getDate() + i)

      const endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (i === 0) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
      } else {
        currentDate.setHours(10, 0, 0, 0)
      }

      const timeSlots = []
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        })
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      allSlots.push(timeSlots)
    }

    setDocSlots(allSlots)
  }

  useEffect(() => {
    fetchDocInfo()
  }, [docId])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }
  }, [docInfo])

  if (!docInfo || docSlots.length === 0) {
    return <p className="text-center py-10">Loading appointment info...</p>
  }
  const handleBooking = () =>{
    if (!slotDate || !slotTime) {
    toast.error("Please select a date and time");
    return;
  }
    bookAppointment({docId,slotDate,slotTime});
  }

  return (
    <div className="mx-6 md:mx-8 lg:mx-16 my-20 py-10">
      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="bg-primary w-full sm:max-w-72 rounded-lg">
          <img src={docInfo.image} alt={docInfo.name} />
        </div>
        <div className="flex-1 border border-base-300 rounded-lg p-8 py-7 mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="verified" />
          </p>
          <div className="flex items-center gap-2 text-sm">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
          </div>
          <div className="mt-3">
            <p className="flex items-center gap-2 text-sm font-medium">
              About
              <img src={assets.info_icon} alt="info" />
            </p>
            <p className="text-sm max-w-[700px]">{docInfo.about}</p>
          </div>
          <p className="mt-2">
            Appointment Fees:
            <span className="text-primary">{` $${docInfo.fees}`}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium">
        <p>Booking Slots</p>

        {/* Day Tabs */}
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots.map((daySlots, index) =>
            daySlots.length > 0 ? (
              <div
                onClick={() => {setSlotIndex(index);
                  const selectedDate = daySlots[0].datetime.toISOString().split('T')[0]; // "YYYY-MM-DD"
                  setSlotDate(selectedDate);
                }}
                className={`text-center py-6 min-w-16 cursor-pointer rounded-full border px-3 ${
                  slotIndex === index ? 'bg-primary text-white' : ''
                }`}
                key={index}
              >
                <p>{daysOfWeek[daySlots[0].datetime.getDay()]}</p>
                <p>{daySlots[0].datetime.getDate()}</p>
              </div>
            ) : null
          )}
        </div>

        {/* Time Slots */}
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots[slotIndex]?.map((slot, i) => (
            <p
              onClick={() => {setSlotTime(slot.time);

              }}
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer border ${
                slot.time === slotTime ? 'bg-primary text-white' : ''
              }`}
              key={i}
            >
              {slot.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={handleBooking} className='bg-primary text-sm font-light px-14 py-3 rounded-full mt-5'>Book An Appointment</button>
      </div>
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  )
}

export default Appointment

