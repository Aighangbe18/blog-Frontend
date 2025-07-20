import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const userStr = localStorage.getItem("user");
  const user = userStr && userStr !== "undefined" ? JSON.parse(userStr) : null;

  return user ? <>{children}</> : <Navigate to="/login" replace />;
}
