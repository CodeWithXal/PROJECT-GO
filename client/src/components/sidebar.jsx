// src/components/Sidebar.jsx

import {
  LayoutDashboard,
  Folder,
  Compass,
  PlusCircle,
  LogOut,
  User,
  Menu,
  X
} from "lucide-react";

import "./Sidebar.css";

const Sidebar = ({
  isOpen,
  activeTab,
  onTabChange,
  onLogout,
  onToggle,
  user
}) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div>
      {/* Toggle Button */}
      <div className="sidebar-top">
        <button className="toggle-btn" onClick={onToggle}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Profile Section */}
      <div
  className={`profile-section ${
    activeTab === "my-profile" ? "active" : ""
  }`}
  onClick={() => onTabChange("my-profile")}
>
        <div className="profile-avatar">
          {user?.username?.charAt(0)?.toUpperCase() || "U"}
        </div>

        {isOpen && (
          <div className="profile-info">
            <span className="profile-name">{user?.username}</span>
            <span className="profile-email">{user?.email}</span>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="sidebar-menu">

        <div
          className={`menu-item ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => onTabChange("dashboard")}
        >
          <LayoutDashboard size={20} />
          {isOpen && <span>Dashboard</span>}
        </div>

        <div
          className={`menu-item ${activeTab === "my-projects" ? "active" : ""}`}
          onClick={() => onTabChange("my-projects")}
        >
          <Folder size={20} />
          {isOpen && <span>My Projects</span>}
        </div>

        <div
          className={`menu-item ${activeTab === "create-project" ? "active" : ""}`}
          onClick={() => onTabChange("create-project")}
        >
          <PlusCircle size={20} />
          {isOpen && <span>Create Project</span>}
        </div>

        <div
          className={`menu-item ${activeTab === "explore" ? "active" : ""}`}
          onClick={() => onTabChange("explore")}
        >
          <Compass size={20} />
          {isOpen && <span>Explore</span>}
        </div>
      </div>
      </div>

      {/* Logout */}
      <div>
      <div className="sidebar-footer">
        <div className="menu-item logout" onClick={onLogout}>
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Sidebar;