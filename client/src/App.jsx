import { useAuth } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import AuthCallback from "./pages/authCallback";
import CompleteProfile from "./pages/CompleteProfile";
import Dashboard from "./pages/Dashboard";

function App() {
  const { isLoaded } = useAuth();
  
  // Protected route wrapper component
  const ProtectedRoute = ({ children }) => {
    const { isLoaded, userId } = useAuth();
    
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    
    if (!userId) {
      return <Navigate to="/sign-in" replace />;
    }
    
    return children;
  };

  if (!isLoaded) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/auth-callback" element={<AuthCallback />} />
      <Route 
        path="/complete-profile" 
        element={
          <ProtectedRoute>
            <CompleteProfile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/*" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/sign-in" replace />} />
      <Route path="*" element={<Navigate to="/sign-in" replace />} />
    </Routes>
  );
}

export default App;
