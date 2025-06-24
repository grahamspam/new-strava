import axios from 'axios';

const API_URL = 'http://localhost:12000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (email, name) => {
    const response = await api.post('/auth/dev-login', { email, name });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

// Activity services
export const activityService = {
  getActivities: async () => {
    const response = await api.get('/activities');
    return response.data;
  },
  getActivity: async (id) => {
    const response = await api.get(`/activities/${id}`);
    return response.data;
  },
  createActivity: async (activityData) => {
    const response = await api.post('/activities', activityData);
    return response.data;
  },
  updateActivity: async (id, activityData) => {
    const response = await api.put(`/activities/${id}`, activityData);
    return response.data;
  },
  deleteActivity: async (id) => {
    const response = await api.delete(`/activities/${id}`);
    return response.data;
  },
  syncStrava: async () => {
    const response = await api.post('/activities/sync/strava');
    return response.data;
  }
};

// Supplemental work services
export const supplementalService = {
  getSupplementals: async () => {
    const response = await api.get('/supplemental');
    return response.data;
  },
  getSupplemental: async (id) => {
    const response = await api.get(`/supplemental/${id}`);
    return response.data;
  },
  createSupplemental: async (supplementalData) => {
    const response = await api.post('/supplemental', supplementalData);
    return response.data;
  },
  updateSupplemental: async (id, supplementalData) => {
    const response = await api.put(`/supplemental/${id}`, supplementalData);
    return response.data;
  },
  deleteSupplemental: async (id) => {
    const response = await api.delete(`/supplemental/${id}`);
    return response.data;
  }
};

// Wellness services
export const wellnessService = {
  getWellnessEntries: async () => {
    const response = await api.get('/wellness');
    return response.data;
  },
  getWellnessEntry: async (id) => {
    const response = await api.get(`/wellness/${id}`);
    return response.data;
  },
  createWellnessEntry: async (wellnessData) => {
    const response = await api.post('/wellness', wellnessData);
    return response.data;
  },
  updateWellnessEntry: async (id, wellnessData) => {
    const response = await api.put(`/wellness/${id}`, wellnessData);
    return response.data;
  },
  deleteWellnessEntry: async (id) => {
    const response = await api.delete(`/wellness/${id}`);
    return response.data;
  }
};

// Insight services
export const insightService = {
  getSummary: async (startDate, endDate) => {
    const response = await api.get('/insights/summary', {
      params: { startDate, endDate }
    });
    return response.data;
  },
  getCorrelations: async () => {
    const response = await api.get('/insights/correlations');
    return response.data;
  },
  askQuestion: async (question) => {
    const response = await api.post('/insights/ask', { question });
    return response.data;
  }
};

export default api;