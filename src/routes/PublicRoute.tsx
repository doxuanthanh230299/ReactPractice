import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../api/auth.api";
import type { JSX } from "react";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  if (isAuthenticated()) {
    return <Navigate to="/customers" replace />;
  }

  return children;
};

export default PublicRoute;