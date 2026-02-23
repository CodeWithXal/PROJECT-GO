import { useAuth } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/signin";
import Signup from "./pages/signup";
import AuthCallback from "./pages/authCallback";
import CompleteProfile from "./pages/CompleteProfile";
import Dashboard from "./pages/dashboard";

function App() {

  return (
    <Routes>
      <Route path="/sign-in" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/auth-callback" element={<AuthCallback />} />
      <Route 
        path="/complete-profile" 
        element={
            <CompleteProfile />
        } 
      />
      <Route 
        path="/dashboard/*" 
        element={
            <Dashboard />
        } 
      />
      <Route path="/" element={<Navigate to="/sign-in" replace />} />
      <Route path="*" element={<Navigate to="/sign-in" replace />} />
    </Routes>
  );
}

export default App;
