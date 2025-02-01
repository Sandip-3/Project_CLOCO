import { useUser } from "@/context/User";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({  }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/user/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
