// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };
};

// Generic request helper with proper error handling
const makeRequest = async (endpoint, options = {}) => {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: getAuthHeaders(),
      ...options,
    });
    
    const data = await response.json();
    console.log(`API Response for ${endpoint}:`, { status: response.status, data }); // Debug log
    
    if (!response.ok) {
      // Create a proper error object with response details
      const error = new Error(data.message || `HTTP error! status: ${response.status}`);
      error.response = response;
      error.data = data;
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('API Request failed:', error);
    
    // If it's already an error with response, rethrow it
    if (error.response) {
      throw error;
    }
    
    // Otherwise, create a proper error object
    const fetchError = new Error(error.message || 'Network request failed');
    fetchError.isNetworkError = true;
    throw fetchError;
  }
};

// Auth API calls
export const authAPI = {
  signup: async (userData) => {
    return makeRequest('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  signin: async (credentials) => {
    return makeRequest('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
};

// User API calls
export const userAPI = {
  completeProfile: async (profileData) => {
    return makeRequest('/api/user/complete-profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  getProfile: async () => {
    return makeRequest('/api/user/my-profile');
  },

  getCurrentUser: async () => {
    return makeRequest('/api/user/me');
  },
};

// Project API calls
export const projectAPI = {
  // ... (keep all your existing project API methods the same)
  createProject: async (projectData) => {
    return makeRequest('/api/project/create-project', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  },
  getMyProjects: async () => {
    return makeRequest('/api/project/my-projects');
  },
  exploreProjects: async () => {
    return makeRequest('/api/project/explore');
  },
  searchProjects: async (query, page = 1, limit = 5) => {
    const params = new URLSearchParams({
      query: query,
      page: page.toString(),
      limit: limit.toString()
    });
    return makeRequest(`/api/project/search?${params}`);
  },
  getProject: async (projectId) => {
    return makeRequest(`/api/project/${projectId}`);
  },
  requestToJoin: async (projectId) => {
    return makeRequest(`/api/project/${projectId}/request`, {
      method: 'POST',
    });
  },
  cancelJoinRequest: async (projectId) => {
    return makeRequest(`/api/project/${projectId}/cancel-request`, {
      method: 'PUT',
    });
  },
  getJoinRequests: async (projectId) => {
    return makeRequest(`/api/project/${projectId}/join-requests`);
  },
  getMyJoinRequests: async () => {
  return makeRequest("/api/project/my-join-requests");
},
  acceptRequest: async (projectId, userId) => {
    return makeRequest(`/api/project/${projectId}/accept/${userId}`, {
      method: 'PUT',
    });
  },
  rejectRequest: async (projectId, userId) => {
    return makeRequest(`/api/project/${projectId}/reject/${userId}`, {
      method: 'PUT',
    });
  },
  getMembers: async (projectId) => {
    return makeRequest(`/api/project/members/${projectId}`);
  },
  kickMember: async (projectId, userId) => {
    return makeRequest(`/api/project/${projectId}/kick/${userId}`, {
      method: 'PUT',
    });
  },
  leaveProject: async (projectId) => {
    return makeRequest(`/api/project/${projectId}/leave`, {
      method: 'PUT',
    });
  },
  deleteProject: async (projectId) => {
    return makeRequest(`/api/project/${projectId}/delete`, {
      method: 'DELETE',
    });
  },
  getJoinedProjects: async () => {
  return makeRequest("/api/project/joined-projects");
},
};

// Authentication utilities
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return token !== null && token !== 'undefined' && token !== '';
};

export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

export const getStoredToken = () => {
  return localStorage.getItem('authToken');
};

// Check if user has completed profile (useful for routing)
export const checkProfileCompleted = async () => {
  try {
    const userData = await userAPI.getCurrentUser();
    return userData.profileCompleted || false;
  } catch (error) {
    console.error('Profile completion check failed:', error);
    return false;
  }
};

// Login helper that stores token automatically
export const loginUser = async (credentials) => {
  const response = await authAPI.signin(credentials);
  if (response.token) {
    setAuthToken(response.token);
    return response;
  }
  throw new Error('No token received');
};

// Logout helper
export const logoutUser = () => {
  removeAuthToken();
  // Optional: Redirect to login page
  window.location.href = '/login';
};

// Token validation helper
export const validateToken = async () => {
  if (!isAuthenticated()) {
    return false;
  }
  
  try {
    await userAPI.getCurrentUser();
    return true;
  } catch (error) {
    console.error('Token validation failed:', error);
    removeAuthToken();
    return false;
  }
};

export default {
  authAPI,
  userAPI,
  projectAPI,
  isAuthenticated,
  setAuthToken,
  removeAuthToken,
  loginUser,
  logoutUser,
  validateToken,
  checkProfileCompleted
};
