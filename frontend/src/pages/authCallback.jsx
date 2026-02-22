import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AuthCallback() {
  const { getToken, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const hasSent = useRef(false); // prevent double execution

  useEffect(() => {
    const sendToBackend = async () => {
      if (!isSignedIn || hasSent.current) return;

      hasSent.current = true;

      try {
        const clerkToken = await getToken({ skipCache: true });

        const res = await axios.post(
          "http://localhost:3000/api/auth/clerk-login",
          {},
          {
            headers: {
              Authorization: `Bearer ${clerkToken}`,
            },
          }
        );

        localStorage.setItem("token", res.data.token);

        if (!res.data.profileCompleted) {
          navigate("/complete-profile", { replace: true });
        } else {
          navigate("/dashboard", { replace: true });
        }

      } catch (err) {
        console.error(err);
      }
    };

    sendToBackend();
  }, [isSignedIn, getToken, navigate]);

  return <div>Authenticating...</div>;
}

export default AuthCallback;