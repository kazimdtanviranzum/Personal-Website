import axios from 'axios';

// API base URL - adjust this to match your backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      window.location.href = '/admin/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;

// API endpoints
export const endpoints = {
  // Auth
  auth: {
    login: '/auth/login',
    profile: '/auth/profile',
    verify: '/auth/verify',
    logout: '/auth/logout',
    changePassword: '/auth/change-password',
  },
  
  // Admin
  admin: {
    dashboard: '/admin/dashboard',
    admins: '/admin/admins',
  },
  
  // Content
  content: {
    personal: '/content/personal',
    education: '/content/education',
    experience: '/content/experience',
    publications: '/content/publications',
    research: '/content/research',
    news: '/content/news',
    scholarshipsAwards: '/content/scholarships-awards',
    teaching: '/content/teaching',
    search: '/content/search',
  },
};
