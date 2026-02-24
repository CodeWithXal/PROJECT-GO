// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// Auth API calls
export const authAPI = {
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await response.json();
  },

  signin: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  },
};

// User API calls
export const userAPI = {
  completeProfile: async (profileData) => {
    const response = await fetch(`${API_BASE_URL}/api/user/complete-profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    return await response.json();
  },

  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/api/user/my-profile`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return await response.json();
  },

  checkAuth: async () => {
    const response = await fetch(`${API_BASE_URL}/api/user/me`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return await response.json();
  },
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return localStorage.getItem('authToken') !== null;
};

// Store token
export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Remove token
export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};
