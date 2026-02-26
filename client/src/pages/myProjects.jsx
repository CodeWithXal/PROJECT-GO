import { useState } from "react";
import DashboardLayout from "../layouts/dashboardLayout";
import CreatedProjects from "./createdProjects";
import JoinedProjects from "./joinedProjects";
import "./myProjects.css";

const MyProjects = () => {
  const [activeTab, setActiveTab] = useState("created");

  return (
    <DashboardLayout activeTab="my-projects">

      <div className="myprojects-header">
        <h2>My Projects</h2>

        <div className="toggle-container">
          <button
            className={activeTab === "created" ? "active" : ""}
            onClick={() => setActiveTab("created")}
          >
            Created
          </button>

          <button
            className={activeTab === "joined" ? "active" : ""}
            onClick={() => setActiveTab("joined")}
          >
            Joined
          </button>
        </div>
      </div>

      <div className="projects-grid">
        {activeTab === "created" ? (
          <CreatedProjects />
        ) : (
          <JoinedProjects />
        )}
      </div>

    </DashboardLayout>
  );
};

export default MyProjects;