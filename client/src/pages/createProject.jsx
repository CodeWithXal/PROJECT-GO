// src/pages/createProject.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/dashboardLayout";
import { projectAPI } from "../services/api";
import "./CreateProject.css";

const CreateProject = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skillsRequired: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await projectAPI.createProject({
        title: formData.title,
        description: formData.description,
        skillsRequired: formData.skillsRequired
          .split(",")
          .map((s) => s.trim()),
      });

      console.log("Project created:", response);

      navigate("/my-projects"); // better UX than dashboard
    } catch (error) {
      console.error("Project creation failed:", error);
      alert(error?.data?.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout activeTab="create-project">
      <div className="create-project-container">
        <h2>Create New Project</h2>

        <form onSubmit={handleSubmit} className="create-project-form">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="skillsRequired"
            placeholder="Skills Required (comma separated)"
            value={formData.skillsRequired}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateProject;