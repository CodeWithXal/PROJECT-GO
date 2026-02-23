import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

function AuthCallback() {
  const navigate = useNavigate();
  const { isLoaded, getToken, userId } = useAuth();
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    let mounted = true;

    const handleAuthCallback = async () => {
      if (!mounted || processing || !isLoaded) return;
      
      setProcessing(true);

      try {
        // Check if user is actually signed in
        if (!userId) {
          navigate("/sign-in");
          return;
        }

        // Get the Clerk session token
        const clerkToken = await getToken();
        
        if (!clerkToken) {
          console.error("No Clerk token available");
          navigate("/sign-in");
          return;
        }

        // Exchange Clerk token for JWT via your backend
        const response = await axios.post(
          "http://localhost:3000/api/auth/clerk-login",
          {},
          {
            headers: {
              Authorization: `Bearer ${clerkToken}`,
            },
          }
        );

        const { token, profileCompleted } = response.data;
        
        // Store the JWT token
        localStorage.setItem("token", token);
        
        // Redirect based on profile completion status using replace
        if (profileCompleted) {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/complete-profile", { replace: true });
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        localStorage.removeItem("token");
        navigate("/sign-in", { replace: true });
      } finally {
        if (mounted) {
          setProcessing(false);
        }
      }
    };

    handleAuthCallback();

    return () => {
      mounted = false;
    };
  }, [isLoaded, getToken, userId, navigate, processing]);

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh" 
    }}>
      <div>
        <h2>Setting up your account...</h2>
        <p>This should only take a moment</p>
      </div>
    </div>
  );
}

export default AuthCallback;
