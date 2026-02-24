// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { userAPI, removeAuthToken } from '../services/api';
import TopNavbar from "../components/topNavbar";
import Sidebar from "../components/sidebar";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userAPI.getProfile();
        setUser(response.user);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        removeAuthToken();
        window.location.href = '/signin';
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    window.location.href = '/signin';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview user={user} />;
      case 'my-profile':
        return <MyProfile user={user} />;
      case 'my-projects':
        return <MyProjects />;
      case 'create-project':
        return <CreateProject />;
      case 'explore':
        return <ExploreProjects />;
      default:
        return <DashboardOverview user={user} />;
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (

    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onClose={() => setSidebarOpen(false)}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="dashboard-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <button 
              className="hamburger-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <h1>ProjectGo</h1>
          </div>
          
          <div className="header-right">
            <div className="search-bar">
              <input type="text" placeholder="Search projects..." />
              <button className="search-btn">🔍</button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="content-wrapper">
          {renderContent()}
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = ({ user }) => (
  <div className="overview-container">
    <div className="welcome-section">
      <h2>Welcome back, {user?.username}!
        <span className="welcome-emoji">👋</span>
      </h2>
      <p className="welcome-subtitle">Ready to collaborate on your next project?</p>
    </div>

    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon">📊</div>
        <div className="stat-info">
          <h3>Active Projects</h3>
          <span className="stat-number">0</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">🤝</div>
        <div className="stat-info">
          <h3>Collaborations</h3>
          <span className="stat-number">0</span>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">⭐</div>
        <div className="stat-info">
          <h3>Skills</h3>
          <span className="stat-number">{user?.skills?.length || 0}</span>
        </div>
      </div>
    </div>

    <div className="quick-actions">
      <h3>Quick Actions</h3>
      <div className="actions-grid">
        <button className="action-btn">
          <span className="action-icon">➕</span>
          Create Project
        </button>
        <button className="action-btn">
          <span className="action-icon">🔍</span>
          Explore
        </button>
        <button className="action-btn">
          <span className="action-icon">👥</span>
          My Projects
        </button>
      </div>
    </div>
  </div>
);

// My Profile Component
const MyProfile = ({ user }) => (
  <div className="profile-container">
    <div className="profile-header">
      <h2>My Profile</h2>
      <p>Manage your account information and preferences</p>
    </div>

    <div className="profile-content">
      <div className="profile-card">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {user?.username?.charAt(0)?.toUpperCase() || 'U'}
          </div>
        </div>

        <div className="profile-info">
          <div className="info-section">
            <h3>Personal Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Username</label>
                <span>{user?.username || 'Not set'}</span>
              </div>
              <div className="info-item">
                <label>Email</label>
                <span>{user?.email}</span>
              </div>
              <div className="info-item">
                <label>Profile Completion</label>
                <span className={`status ${user?.profileCompleted ? 'completed' : 'pending'}`}>
                  {user?.profileCompleted ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>Bio</h3>
            <div className="bio-content">
              {user?.bio || 'No bio provided yet. Add a bio to let others know more about you!'}
            </div>
          </div>

          <div className="info-section">
            <h3>Skills</h3>
            <div className="skills-list">
              {user?.skills && user.skills.length > 0 ? (
                user.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="no-skills">No skills added yet</span>
              )}
            </div>
          </div>

          <div className="info-section">
            <h3>Account Details</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Member Since</label>
                <span>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</span>
              </div>
              <div className="info-item">
                <label>Last Updated</label>
                <span>{user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'Never'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Placeholder Components
const MyProjects = () => (
  <div className="tab-content">
    <h2>My Projects</h2>
    <p>Your projects will appear here...</p>
  </div>
);

const CreateProject = () => (
  <div className="tab-content">
    <h2>Create New Project</h2>
    <p>Project creation form will go here...</p>
  </div>
);

const ExploreProjects = () => (
  <div className="tab-content">
    <h2>Explore Projects</h2>
    <p>Browse through exciting projects...</p>
  </div>
);

export default Dashboard;
