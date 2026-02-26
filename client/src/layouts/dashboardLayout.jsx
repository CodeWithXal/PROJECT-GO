import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "../components/topNavbar";
import Sidebar from "../components/sidebar";
import { userAPI, removeAuthToken } from "../services/api";

const DashboardLayout = ({ children, activeTab }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    window.location.href = "/signin";
    return;
  }

  if (user) return; // Prevent refetch
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
  }, [user]);

  const handleLogout = () => {
    removeAuthToken();
    window.location.href = "/signin";
  };

  const handleTabChange = (tab) => {
    navigate(`/${tab}`);
  };

  return (
    <div className="dashboard-layout">
      <TopNavbar isSidebarOpen={sidebarOpen} />

      <Sidebar
        isOpen={sidebarOpen}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onLogout={handleLogout}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        user={user}
      />

      <main
        className={`dashboard-content ${
          sidebarOpen ? "expanded" : "collapsed"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;