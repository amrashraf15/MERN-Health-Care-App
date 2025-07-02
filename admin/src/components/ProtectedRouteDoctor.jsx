import { Navigate } from "react-router-dom";
import { useDoctorStore } from "../store/useDoctorStore.js";
import { Loader } from "lucide-react";

const ProtectedRouteDoctor = ({ children }) => {
  const { authDoctor, isCheckingDoctor} = useDoctorStore();

  if (isCheckingDoctor) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return authDoctor ? children : <Navigate to="/doctor-login" />;
};

export default ProtectedRouteDoctor;
