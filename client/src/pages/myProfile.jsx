// src/pages/MyProfile.jsx

import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/dashboardLayout";
import { userAPI } from "../services/api";
import {
  User,
  Mail,
  FileText,
  Layers
} from "lucide-react";
import "./MyProfile.css";

const MyProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await userAPI.getProfile();
      setUser(res.user);
    };
    fetchProfile();
  }, []);

  return (
    <DashboardLayout activeTab="my-profile">
      <div className="profile-container">

        {/* Tab 1 - Basic Info */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar">
              {user?.username?.charAt(0).toUpperCase()}
            </div>

            <div className="profile-main-info">
              <h2>
                <User size={18} /> {user?.username || "No Username"}
              </h2>
              <p>
                <Mail size={16} /> {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Tab 2 - Bio */}
        <div className="profile-card">
          <h3>
            <FileText size={18} /> Bio
          </h3>
          <p className="profile-text">
            {user?.bio || "No bio added yet."}
          </p>
        </div>

        {/* Tab 3 - Skills */}
        <div className="profile-card">
          <h3>
            <Layers size={18} /> Skills
          </h3>
          <div className="skills-container">
            {user?.skills?.length ? (
              user.skills.map((skill, index) => (
                <span key={index} className="skill-badge">
                  {skill}
                </span>
              ))
            ) : (
              <p className="profile-text">No skills added yet.</p>
            )}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default MyProfile;