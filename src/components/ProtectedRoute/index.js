import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const userId = useSelector((state) => state.userAuth.userId);
  return userId ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
