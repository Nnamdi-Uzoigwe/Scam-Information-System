import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login page with the original location saved
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If token exists, allow access
  return <Outlet />;
};

export default RequireAuth;
