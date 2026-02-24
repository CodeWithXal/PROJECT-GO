// src/components/AuthGuard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI, removeAuthToken } from '../services/api';

const AuthGuard = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          navigate('/signin');
          return;
        }

        const response = await userAPI.checkAuth();
        
        if (response.profileCompleted) {
          setIsAuthorized(true);
        } else {
          navigate('/complete-profile');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        removeAuthToken();
        navigate('/signin');
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isChecking) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return isAuthorized ? children : null;
};

export default AuthGuard;
