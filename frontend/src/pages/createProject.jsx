// src/pages/CreateProject.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateProject.css";

function CreateProject() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skillsRequired: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate required fields
    if (!formData.title.trim()) {
      setError("Project title is required");
      setLoading(false);
      return;
    }

    if (!formData.skillsRequired.trim()) {
      setError("At least one skill is required");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      
      await axios.post(
        "http://localhost:3000/api/project/create-project",
        {
          title: formData.title.trim(),
          description: formData.description.trim(),
          skillsRequired: formData.skillsRequired
            .split(",")
            .map(skill => skill.trim())
            .filter(skill => skill.length > 0)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Success - redirect to dashboard
      alert("Project created successfully!");
      navigate("/dashboard");
      
    } catch (err) {
      console.error("Create project error:", err);
      
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 401) {
        setError("Please log in again");
        localStorage.removeItem("token");
        navigate("/");
      } else {
        setError("Failed to create project. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-project-container">
      <h2 className="create-project-title">Create New Project</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Project Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter project title"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your project..."
            rows="4"
            className="form-textarea"
          />
        </div>

        <div className="form-group">
          <label htmlFor="skillsRequired" className="form-label">
            Required Skills *
          </label>
          <input
            type="text"
            id="skillsRequired"
            name="skillsRequired"
            value={formData.skillsRequired}
            onChange={handleChange}
            placeholder="Separate skills with commas (e.g., JavaScript, React, Node.js)"
            required
            className="form-input"
          />
          <small className="form-help">
            Separate multiple skills with commas
          </small>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="submit-button"
        >
          {loading ? "Creating Project..." : "Create Project"}
        </button>
      </form>
    </div>
  );
}

export default CreateProject;
