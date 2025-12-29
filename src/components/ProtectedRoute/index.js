import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../../context/UserContext";

const ProtectedRoute = () => {
  const ctx = useContext(UserContext);

  // 🛡 safety guard
  if (!ctx) {
    throw new Error("ProtectedRoute must be used inside <UserStore>");
  }

  if (!ctx.state?.token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
