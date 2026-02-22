// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import AuthCallback from "./pages/authCallback";
import CompleteProfile from "./pages/completeProfile";
import Dashboard from "./pages/dashboard";
import CreateProject from "./pages/createProject"; // ADD THIS IMPORT

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/auth-callback" element={<AuthCallback />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-project" element={<CreateProject />} /> {/* ADD THIS ROUTE */}
    </Routes>
  );
}

export default App;
