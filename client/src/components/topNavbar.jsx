// src/components/TopNavbar.jsx

import { Search } from "lucide-react";
import "./TopNavbar.css";

const TopNavbar = ({ isSidebarOpen }) => {
  return (
    <header className={`top-navbar ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <div className="logo">
        PROJECT GO
      </div>

      <div className="search-container">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        />
      </div>
    </header>
  );
};

export default TopNavbar;