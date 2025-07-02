import { useEffect } from "react";
import { useAdminStore } from "./store/useAdminStore.js";
import { useThemeStore } from "./store/useThemeStore.js";
import { Loader } from "lucide-react";
import { Route, Routes, Navigate } from "react-router-dom";

// Admin Routes
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import AddDoctor from "./pages/Admin/AddDoctor.jsx";
import AllAppointments from "./pages/Admin/AllAppointments.jsx";
import DoctorsList from "./pages/Admin/DoctorsList.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

// Doctor Routes
import DoctorLogin from "./pages/Doctor/DoctorLogin.jsx";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard.jsx";
import DoctorProfile from "./pages/Doctor/DoctorProfile.jsx";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments.jsx";

// Layout Components
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import DoctorSidebar from "./components/DoctorSidebar.jsx";

// Route Protection
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProtectedRouteDoctor from "./components/ProtectedRouteDoctor.jsx";

// Toast
import { Toaster } from "react-hot-toast";

// Doctor Store
import { useDoctorStore } from "./store/useDoctorStore.js";

const App = () => {
  const { authAdmin, isCheckingAdmin, checkAdmin } = useAdminStore();
  const { authDoctor, isCheckingDoctor, checkDoctor } = useDoctorStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAdmin();
    checkDoctor();
  }, [checkAdmin, checkDoctor]);

  if (isCheckingAdmin || isCheckingDoctor) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme} className="min-h-screen">
      <Navbar />

      <div className="flex pt-[72px]">
      
        {authAdmin ? <Sidebar /> : authDoctor ? <DoctorSidebar /> : null}

        <main className="flex-1 px-6 py-4">
          <Routes>
            {/* Public Auth Routes */}
            <Route path="/admin-login" element={authAdmin ? (<Navigate to="/" />) : authDoctor ? (<Navigate to="/doctor-dashboard" />) : (<AdminLogin />)}/>

            <Route path="/doctor-login" element={!authDoctor ? <DoctorLogin /> : <Navigate to="/doctor-dashboard" />} />

            {/* Admin Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/add-doctor" element={<ProtectedRoute><AddDoctor /></ProtectedRoute>} />
            <Route path="/all-appointments" element={<ProtectedRoute><AllAppointments /></ProtectedRoute>} />
            <Route path="/doctors-list" element={<ProtectedRoute><DoctorsList /></ProtectedRoute>} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* Doctor Protected Routes */}
            <Route path="/doctor-dashboard" element={<ProtectedRouteDoctor><DoctorDashboard /></ProtectedRouteDoctor>} />
            <Route path="/doctor-profile" element={<ProtectedRouteDoctor><DoctorProfile /></ProtectedRouteDoctor>} />
            <Route path="/doctor-appointments" element={<ProtectedRouteDoctor><DoctorAppointments /></ProtectedRouteDoctor>} />

            {/* Catch-all fallback route */}
            <Route
              path="*"
              element={
                authAdmin ? (
                  <Navigate to="/" />
                ) : authDoctor ? (
                  <Navigate to="/doctor-dashboard" />
                ) : (
                  <Navigate to="/admin-login" />
                )
              }
            />
          </Routes>
        </main>
      </div>

      <Toaster />
    </div>
  );
};

export default App;
