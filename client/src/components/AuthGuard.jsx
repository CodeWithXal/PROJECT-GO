// src/components/AuthGuard.jsx

import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userAPI, removeAuthToken, isAuthenticated } from "../services/api";

const AuthGuard = () => {
  const [status, setStatus] = useState("checking"); 
  // "checking" | "authorized" | "unauthorized" | "complete-profile"

  const location = useLocation();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (!isAuthenticated()) {
          setStatus("unauthorized");
          return;
        }

        const response = await userAPI.getCurrentUser();
        const user = response.user || response;

        if (!user.profileCompleted) {
          setStatus("complete-profile");
        } else {
          setStatus("authorized");
        }
      } catch (err) {
        console.error("AuthGuard error:", err);
        removeAuthToken();
        setStatus("unauthorized");
      }
    };

    verifyUser();
  }, []);

  // 🔥 Professional Loading State
  if (status === "checking") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "#fff",
          fontSize: "18px",
          letterSpacing: "1px"
        }}
      >
        Loading...
      </div>
    );
  }

  // 🔥 Not logged in
  if (status === "unauthorized") {
    return <Navigate to="/signin" replace />;
  }

  // 🔥 Profile not completed
  if (
    status === "complete-profile" &&
    !location.pathname.includes("/complete-profile")
  ) {
    return <Navigate to="/complete-profile" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;