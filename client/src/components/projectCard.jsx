import "./ProjectCard.css";
import { Layers, User } from "lucide-react";

const ProjectCard = ({ project, type }) => {
  return (
    <div className="dashboard-card project-card">

      <h3>{project.title}</h3>
      <p>{project.description || "No description provided."}</p>

      <div className="skills-section">
        <Layers size={18} />
        <span>
          {project.skillsRequired?.length
            ? project.skillsRequired.join(", ")
            : "No skills required"}
        </span>
      </div>

      {type === "joined" && (
        <div className="creator-section">
          <User size={18} />
          <span>
            {project.createdBy?.username} ({project.createdBy?.email})
          </span>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;