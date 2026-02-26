// src/pages/Signin.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { authAPI, setAuthToken } from "../services/api";
import "./Auth.css";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      alert(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const result = await authAPI.signin({
        email: formData.email,
        password: formData.password
      });

      if (result.token) {
        setAuthToken(result.token);
        localStorage.setItem("authToken", result.token);

        if (result.profileCompleted) {
          navigate("/dashboard");
        } else {
          navigate("/complete-profile");
        }
      } else {
        setErrors({ general: result.message || "Signin failed." });
      }
    } catch (error) {
      setErrors({ general: "Signin failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* LEFT BRAND SECTION */}
      <div className="auth-left">
        <h1 className="brand-title">PROJECT GO</h1>
        <p className="brand-tagline">
          Build. Collaborate. Launch.
        </p>
        <p className="brand-description">
          PROJECT GO is a collaborative platform where developers,
          designers, and innovators connect to build real-world
          projects together. Create ideas, join teams, and turn
          concepts into impactful products.
        </p>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="auth-right">
        <div className="auth-card">
          <h2>Welcome Back</h2>

          {errors.general && (
            <div className="error-message">{errors.general}</div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="switch-link">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;