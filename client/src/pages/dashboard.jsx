// src/pages/Dashboard.jsx

import { useState, useEffect } from "react";
import TopNavbar from "../components/topNavbar";
import Sidebar from "../components/sidebar";
import { userAPI, removeAuthToken } from "../services/api";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userAPI.getProfile();
        setUser(response.user);
      } catch (err) {
        console.error(err);
        removeAuthToken();
        window.location.href = "/signin";
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    window.location.href = "/signin";
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <h2>Dashboard Overview</h2>;
      case "my-profile":
        return <h2>My Profile</h2>;
      case "my-projects":
        return <h2>My Projects</h2>;
      case "create-project":
        return <h2>Create Project</h2>;
      case "explore":
        return <h2>Explore Projects</h2>;
      default:
        return <h2>Dashboard</h2>;
    }
  };

  return (
    <div className="dashboard-layout">
      <TopNavbar isSidebarOpen={sidebarOpen} />

      <Sidebar
        isOpen={sidebarOpen}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        user={user}
      />

      <main
        className={`dashboard-content ${
          sidebarOpen ? "expanded" : "collapsed"
        }`}
      >
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;