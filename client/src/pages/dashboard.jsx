import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/dashboardLayout";
import { userAPI } from "../services/api";
import {
  PlusCircle,
  User,
  Layers,
  Mail
} from "lucide-react";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userAPI.getProfile();
      setUser(res.user);
    };
    fetchUser();
  }, []);

  return (
    <DashboardLayout activeTab="dashboard">
      <div className="dashboard-header">
        <h2>Welcome 👋 {user?.name}</h2>
      </div>

      <div className="dashboard-grid">

        <div
          className="dashboard-card"
          onClick={() => navigate("/my-profile")}
        >
          <User size={28} />
          <h3>My Profile</h3>
          <p>View and manage your profile.</p>
        </div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/create-project")}
        >
          <PlusCircle size={28} />
          <h3>Create Project</h3>
          <p>Start building something amazing.</p>
        </div>

        <div
  className="dashboard-card"
  onClick={() => navigate("/my-projects")}
>
  <Layers size={28} />
  <h3>My Projects</h3>
  <p>View projects you created or joined.</p>
</div>

        <div
          className="dashboard-card"
          onClick={() => navigate("/requests")}
        >
          <Mail size={28} />
          <h3>Requests</h3>
          <p>View pending join requests.</p>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;