import { useEffect } from 'react';

import { X } from 'lucide-react';
import { useDoctorStore } from '../../store/useDoctorStore.js';

const DoctorAppointments = () => {
  const { appointments,doctorAppointments,completeDoctorAppointment } = useDoctorStore();

  useEffect(() => {
    doctorAppointments();
  }, [doctorAppointments]);

  const handleComplete = async (id) => {
    await completeDoctorAppointment(id);
    doctorAppointments(); // refresh list
 };

  return (
    <div className="p-4 sm:p-8 min-h-screen">
      <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4 border-l-4 border-primary pl-3">
        All Appointments
      </h2>

      <div className="overflow-x-auto rounded-md shadow-sm ">
        <table className="min-w-full text-sm text-left">
          <thead className="text-xs sm:text-sm bg-base-100 border-b">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3 hidden sm:table-cell">Phone</th>
              <th className="px-4 py-3 hidden sm:table-cell">Doctor</th>
              <th className="px-4 py-3 hidden sm:table-cell">Fees</th>
              <th className="px-4 py-3 hidden sm:table-cell">Date & Time</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app, index) => (
              <tr key={app._id} className="border-b hover:bg-base-200 transition">
                <td className="px-4 py-4">{index + 1}</td>
                <td className="px-4 py-4 flex items-center gap-3">
                  <img
                    src={app.userData?.image || "/avatar.png"}
                    alt={app.userData?.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                  />
                  <span className="text-sm sm:text-base">{app.userData?.name}</span>
                </td>
                <td className="px-4 py-4 hidden sm:table-cell">{app.userData?.phone || "-"}</td>
                <td className="px-4 py-4 md:flex items-center gap-3 hidden sm:table-cell">
                    <img
                    src={app.docData?.image || "/avatar.png"}
                    alt={app.docData?.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                  />
                  <span className="text-sm sm:text-base">{app.docData?.name}</span>
                </td>
                <td className="px-4 py-4 hidden sm:table-cell">{app.docData?.fees || "-"}</td>
                <td className="px-4 py-4 hidden sm:table-cell whitespace-nowrap">
                  {app.slotDate}, {app.slotTime}
                </td>
                <td className="px-4 py-4 text-center">
                  <button
                    onClick={() => handleComplete(app._id)}
                    disabled={app.cancelled}
                    className={`p-2 rounded-full ${app.cancelled ? "text-red-600 cursor-not-allowed opacity-60" : ""} ${!app.cancelled && app.isCompleted ? "text-green-600" : ""}
                    ${!app.cancelled && !app.isCompleted ? "text-primary" : ""}
                    `}
                  >
                    {app.cancelled ? "Cancelled" : app.isCompleted ? "Completed" : "Click to Complete"}
                  </button>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No Appointments Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointments;