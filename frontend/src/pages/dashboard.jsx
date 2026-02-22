// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom"; // ADD THIS IMPORT
import "./Dashboard.css"; // Optional: Create a CSS file for dashboard

function Dashboard() {
  const navigate = useNavigate(); // ADD THIS
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/api/user/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);
      } catch (err) {
        console.error("Dashboard error:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="header-actions">
          <button 
            onClick={() => navigate("/create-project")}
            className="create-project-btn"
          >
            ➕ Create Project
          </button>
          <UserButton />
        </div>
      </div>

      <div className="welcome-section">
        <h3>Welcome, {user.username}!</h3>
        <p className="user-bio">{user.bio || "No bio yet"}</p>
      </div>

      <div className="skills-section">
        <h4>Your Skills:</h4>
        {user.skills && user.skills.length > 0 ? (
          <ul className="skills-list">
            {user.skills.map((skill, index) => (
              <li key={index} className="skill-item">{skill}</li>
            ))}
          </ul>
        ) : (
          <p>No skills added yet</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
