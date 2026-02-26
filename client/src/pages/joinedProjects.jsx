import { useEffect, useState } from "react";
import { projectAPI } from "../services/api";
import ProjectCard from "../components/projectCard";

const JoinedProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await projectAPI.getJoinedProjects();
        setProjects(res.projects || []);
      } catch (error) {
        console.error("Failed to fetch joined projects", error);
      }
    };

    loadProjects();
  }, []);

  if (!projects.length) {
    return <p className="placeholder-text">No joined projects yet.</p>;
  }

  return (
    <>
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          type="joined"
        />
      ))}
    </>
  );
};

export default JoinedProjects;