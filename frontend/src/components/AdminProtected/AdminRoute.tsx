import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/context/User";

const ProtectedAdminRoute = () => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/admin/login" />;
  }

  // Check if the user's role is "superadmin"
  if (user.role !== "superadmin") {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
