import { useEffect } from "react";
import { CalendarCheck, Users, Banknote } from "lucide-react";
import { useDoctorStore } from "../../store/useDoctorStore.js";

const DoctorDashboard = () => {
  const { dashboardData, doctorDashboard } = useDoctorStore();

  useEffect(() => {
    doctorDashboard();
  }, [doctorDashboard]);

  const {
    earnings = 0,
    patients = 0,
    appointments = 0,
    latestAppointments = [],
  } = dashboardData;

  return (
    <div className="sm:p-0 md:p-10 min-h-screen bg-base-100">
      <h1 className="text-lg sm:text-2xl md:text-3xl font-bold mb-6 border-l-4 border-primary pl-3 sm:pl-4">
        Doctor Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        <StatCard
          icon={<Users className="text-secondary" size={24} />}
          label="Patients"
          value={patients}
        />
        <StatCard
          icon={<Banknote className="text-secondary" size={24} />}
          label="Earnings"
          value={earnings}
        />
        <StatCard
          icon={<CalendarCheck className="text-secondary" size={24} />}
          label="Appointments"
          value={appointments}
        />
      </div>

      {/* Latest Appointments Table */}
      <div className="bg-base-200 rounded-xl shadow p-4 sm:p-6 overflow-x-auto">
        <h2 className="text-base sm:text-xl font-semibold mb-4 border-b pb-2">
          Latest Appointments
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="bg-base-300 text-left">
                <th className="px-2 md:px-4 py-2">#</th>
                <th className="px-2 md:px-4 py-2">Patient</th>
                <th className="px-2 md:px-4 py-2">Doctor</th>
                <th className="px-2 md:px-4 py-2">Date & Time</th>
                <th className="px-2 md:px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {latestAppointments.length > 0 ? (
                latestAppointments.map((app, idx) => (
                  <tr
                    key={app._id}
                    className="border-b hover:bg-primary"
                  >
                    <td className="sm:px-1 lg:px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3">
                      {app.userData?.name || "N/A"}
                    </td>
                    <td className="sm:px-1 lg:px-4 py-3">
                      {app.docData?.name || "N/A"}
                    </td>
                    <td className="sm:px-1 lg:px-4 py-3">
                      {app.slotDate}, {app.slotTime}
                    </td>
                    <td className={`${app.isCompleted ? "text-green-500" : "" } ${app.cancelled ? "text-red-600" : "" } ${(!app.isCompleted && !app.cancelled) ? "text-blue-500" : "" } sm:px-1 lg:px-4 py-3`}>
                      {app.isCompleted?"Completed":""} {app.cancelled ? "Cancelled" : ""} { (!app.isCompleted && !app.cancelled) ? "Pending" : "" }
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-4"
                  >
                    No recent appointments
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-base-300 rounded-xl shadow p-3 md:p-4   flex items-center gap-3">
    <div className="shrink-0">{icon}</div>
    <div className="truncate">
      <p className="text-xs sm:text-sm ">{label}</p>
      <p className="text-lg sm:text-xl font-bold">{value}</p>
    </div>
  </div>
);

export default DoctorDashboard;
