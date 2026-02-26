import { useEffect, useState } from "react";
import { projectAPI } from "../services/api";
import ProjectCard from "../components/projectCard";

const CreatedProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await projectAPI.getMyProjects();
        setProjects(res.projects || []);
      } catch (error) {
        console.error("Failed to fetch created projects", error);
      }
    };

    loadProjects();
  }, []);

  if (!projects.length) {
    return <p className="placeholder-text">No created projects yet.</p>;
  }

  return (
    <>
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          type="created"
        />
      ))}
    </>
  );
};

export default CreatedProjects;