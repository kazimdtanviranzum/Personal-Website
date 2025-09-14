import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api, { endpoints } from '../config/api.js';
import toast from 'react-hot-toast';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      
      // Actions
      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const response = await api.post(endpoints.auth.login, credentials);
          console.log(response);
          if (response.data.success) {
            const { token, admin } = response.data.data;
            
            // Store token in localStorage
            localStorage.setItem('admin_token', token);
            localStorage.setItem('admin_user', JSON.stringify(admin));
            
            set({
              user: admin,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
            
            toast.success('Login successful!');
            return { success: true };
          }
        } catch (error) {
          const message = error.response?.data?.message || 'Login failed';
          toast.error(message);
          set({ isLoading: false });
          return { success: false, message };
        }
      },
      
      logout: async () => {
        try {
          await api.post(endpoints.auth.logout);
        } catch (error) {
          // Ignore logout errors
          console.error('Logout error:', error);
        } finally {
          // Clear local storage
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_user');
          
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
          
          toast.success('Logged out successfully');
        }
      },
      
      verifyToken: async () => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
          set({ isAuthenticated: false, isLoading: false });
          return false;
        }
        
        try {
          const response = await api.get(endpoints.auth.verify);
          
          if (response.data.success) {
            const { admin } = response.data.data;
            set({
              user: admin,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
            return true;
          }
        } catch (error) {
          // Token is invalid, clear everything
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_user');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
          return false;
        }
      },
      
      changePassword: async (passwordData) => {
        set({ isLoading: true });
        try {
          const response = await api.post(endpoints.auth.changePassword, passwordData);
          
          if (response.data.success) {
            toast.success('Password changed successfully');
            set({ isLoading: false });
            return { success: true };
          }
        } catch (error) {
          const message = error.response?.data?.message || 'Password change failed';
          toast.error(message);
          set({ isLoading: false });
          return { success: false, message };
        }
      },
      
      updateProfile: async (profileData) => {
        set({ isLoading: true });
        try {
          const response = await api.put(endpoints.auth.profile, profileData);
          
          if (response.data.success) {
            const { admin } = response.data.data;
            
            // Update local storage
            localStorage.setItem('admin_user', JSON.stringify(admin));
            
            set({
              user: admin,
              isLoading: false,
            });
            
            toast.success('Profile updated successfully');
            return { success: true };
          }
        } catch (error) {
          const message = error.response?.data?.message || 'Profile update failed';
          toast.error(message);
          set({ isLoading: false });
          return { success: false, message };
        }
      },
      
      // Initialize auth state from localStorage
      initialize: () => {
        const token = localStorage.getItem('admin_token');
        const userStr = localStorage.getItem('admin_user');
        
        if (token && userStr) {
          try {
            const user = JSON.parse(userStr);
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
            
            // Verify token is still valid
            get().verifyToken();
          } catch (error) {
            // Invalid stored data, clear it
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin_user');
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        } else {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      // Only persist user and token, not isLoading
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
