// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Signup from "./pages/signup";
import Signin from "./pages/signin";
import CompleteProfile from "./pages/completeProfile";
import Dashboard from "./pages/dashboard";
import CreateProject from "./pages/createProject";
import MyProfile from "./pages/myProfile";
import Requests from "./pages/requests";
import MyProjects from "./pages/myProjects";
import Landing from "./pages/landing";

import AuthGuard from "./components/AuthGuard";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* PROTECTED WRAPPER */}
        <Route
          element={
            <ProtectedRoute>
              <AuthGuard />
            </ProtectedRoute>
          }
        >
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/my-projects" element={<MyProjects />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;