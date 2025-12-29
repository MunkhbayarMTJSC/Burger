import React, { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Logout = (props) => {
  const ctx = useContext(UserContext);
  useEffect(() => {
    ctx.logoutUser();
  }, []);
  return <Navigate to={"/"} replace />;
};

export default Logout;
