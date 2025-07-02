import { Navigate } from "react-router-dom";
import { useAdminStore } from "../store/useAdminStore.js";
import { Loader } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const { authAdmin, isCheckingAdmin } = useAdminStore();

  if (isCheckingAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return authAdmin ? children : <Navigate to="/admin-login" />;
};

export default ProtectedRoute;