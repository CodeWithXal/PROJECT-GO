import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { signIn, setActive } = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // First, attempt to create sign in
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      // Check if 2FA is needed
      if (signInAttempt.status === "needs_second_factor") {
        setError("Two-factor authentication is required");
        setLoading(false);
        return;
      }

      // Check if verification is needed
      if (signInAttempt.status === "needs_first_factor") {
        setError("Please check your email for verification");
        setLoading(false);
        return;
      }

      // If sign in is complete, set active session
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        navigate("/auth-callback");
      } else {
        setError("Sign in failed. Please try again.");
      }
    } catch (err) {
      console.error("Sign in error:", err);
      if (err.errors) {
        const firstError = err.errors[0];
        if (firstError.code === "form_identifier_not_found") {
          setError("No account found with that email address");
        } else if (firstError.code === "form_password_incorrect") {
          setError("Incorrect password");
        } else if (firstError.code === "session_exists") {
          // User is already signed in, proceed to auth callback
          navigate("/auth-callback");
        } else {
          setError(firstError.longMessage || firstError.message || "Sign in failed");
        }
      } else {
        setError("Sign in failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Sign In</h2>
        
        {error && (
          <div style={{
            backgroundColor: '#fee',
            color: '#c53030',
            padding: '0.75rem',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <p>
            Don't have an account?{' '}
            <button
              onClick={() => navigate("/sign-up")}
              style={{
                background: 'none',
                border: 'none',
                color: '#007bff',
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
