import { useEffect } from "react";
import { useAdminStore } from "../../store/useAdminStore.js";
import { CalendarCheck, User, Stethoscope } from "lucide-react";

const Dashboard = () => {
  const { dashboardData, dashboard } = useAdminStore();

  useEffect(() => {
    dashboard();
  }, [dashboard]);

  const {
    doctors = 0,
    patients = 0,
    appointments = 0,
    latestAppointments = [],
  } = dashboardData;

  return (
    <div className="sm:p-0 md:p-10 min-h-screen bg-base-100">
      <h1 className="text-lg sm:text-2xl md:text-3xl font-bold mb-6 border-l-4 border-primary pl-3 sm:pl-4">
        Admin Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        <StatCard
          icon={<User className="text-secondary" size={24} />}
          label="Patients"
          value={patients}
        />
        <StatCard
          icon={<Stethoscope className="text-secondary" size={24} />}
          label="Doctors"
          value={doctors}
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
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Patient</th>
                <th className="px-4 py-2">Doctor</th>
                <th className="px-4 py-2">Date & Time</th>
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

export default Dashboard;
