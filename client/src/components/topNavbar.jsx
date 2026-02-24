import { Menu, Search } from "lucide-react";
import "./TopNavbar.css";

const TopNavbar = ({ onToggleSidebar }) => {
  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={onToggleSidebar}>
          <Menu size={22} />
        </button>

        <h1 className="logo">PROJECT GO</h1>
      </div>

      <div className="navbar-right">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search projects..." />
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;