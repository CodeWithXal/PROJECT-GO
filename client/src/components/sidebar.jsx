import {
  LayoutDashboard,
  Folder,
  Compass,
  User,
  PlusCircle,
  LogOut
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({
  isOpen,
  activeTab,
  onTabChange,
  onLogout
}) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
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
          {isOpen && <span>Projects</span>}
        </div>

        <div
          className={`menu-item ${activeTab === "explore" ? "active" : ""}`}
          onClick={() => onTabChange("explore")}
        >
          <Compass size={20} />
          {isOpen && <span>Explore</span>}
        </div>

        <div
          className={`menu-item ${activeTab === "my-profile" ? "active" : ""}`}
          onClick={() => onTabChange("my-profile")}
        >
          <User size={20} />
          {isOpen && <span>Profile</span>}
        </div>

        <div
          className={`menu-item ${activeTab === "create-project" ? "active" : ""}`}
          onClick={() => onTabChange("create-project")}
        >
          <PlusCircle size={20} />
          {isOpen && <span>Create</span>}
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="menu-item logout" onClick={onLogout}>
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;