// src/pages/CompleteProfile.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';
import './CompleteProfile.css';

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    skills: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const skillsArray = formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
      
      const result = await userAPI.completeProfile({
        username: formData.username,
        bio: formData.bio,
        skills: skillsArray
      });

      if (result.message === 'Profile completed successfully') {
        navigate('/dashboard');
      } else {
        setErrors({ general: result.message });
      }
    } catch (error) {
        console.error(error);
      setErrors({ general: 'Failed to complete profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="complete-profile-container">
      <div className="complete-profile-card">
        <h2>Complete Your Profile</h2>
        
        {errors.general && (
          <div className="error-message general-error">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit} className="complete-profile-form">
          <div className="form-group">
            <label htmlFor="username">Username *</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'error' : ''}
              placeholder="Enter your username"
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="skills">Skills</label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Enter skills separated by commas (e.g., React, Node.js, Design)"
            />
            <small className="help-text">Separate multiple skills with commas</small>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Complete Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
