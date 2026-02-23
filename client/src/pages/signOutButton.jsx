// src/components/SignOutButton.jsx
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function SignOutButton({ children = "Sign Out", ...props }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      // Clear your JWT token first
      localStorage.removeItem("token");
      
      // Sign out from Clerk
      await signOut();
      
      // Navigate to sign-in page
      navigate("/sign-in");
    } catch (error) {
      console.error("Sign out error:", error);
      // Even if signOut fails, clear local data and redirect
      localStorage.removeItem("token");
      navigate("/sign-in");
    }
  };

  return (
    <button 
      onClick={handleSignOut} 
      {...props}
    >
      {children}
    </button>
  );
}

export default SignOutButton;
