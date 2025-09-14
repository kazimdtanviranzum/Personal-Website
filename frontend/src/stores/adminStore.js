import { create } from 'zustand';
import api, { endpoints } from '../config/api.js';
import toast from 'react-hot-toast';

const useAdminStore = create((set, get) => ({
  // State
  dashboardStats: null,
  admins: [],
  isLoading: false,
  
  // Actions
  fetchDashboardStats: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get(endpoints.admin.dashboard);
      
      if (response.data.success) {
        set({
          dashboardStats: response.data.data.stats,
          isLoading: false,
        });
        return { success: true, data: response.data.data.stats };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch dashboard stats';
      toast.error(message);
      set({ isLoading: false });
      return { success: false, message };
    }
  },
  
  fetchAdmins: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get(endpoints.admin.admins);
      
      if (response.data.success) {
        set({
          admins: response.data.data.admins,
          isLoading: false,
        });
        return { success: true, data: response.data.data.admins };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch admins';
      toast.error(message);
      set({ isLoading: false });
      return { success: false, message };
    }
  },
  
  createAdmin: async (adminData) => {
    set({ isLoading: true });
    try {
      const response = await api.post(endpoints.admin.admins, adminData);
      
      if (response.data.success) {
        const newAdmin = response.data.data.admin;
        
        set((state) => ({
          admins: [...state.admins, newAdmin],
          isLoading: false,
        }));
        
        toast.success('Admin created successfully');
        return { success: true, data: newAdmin };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create admin';
      toast.error(message);
      set({ isLoading: false });
      return { success: false, message };
    }
  },
  
  updateAdmin: async (adminId, adminData) => {
    set({ isLoading: true });
    try {
      const response = await api.put(`${endpoints.admin.admins}/${adminId}`, adminData);
      
      if (response.data.success) {
        const updatedAdmin = response.data.data.admin;
        
        set((state) => ({
          admins: state.admins.map((admin) =>
            admin._id === adminId ? updatedAdmin : admin
          ),
          isLoading: false,
        }));
        
        toast.success('Admin updated successfully');
        return { success: true, data: updatedAdmin };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update admin';
      toast.error(message);
      set({ isLoading: false });
      return { success: false, message };
    }
  },
  
  deleteAdmin: async (adminId) => {
    set({ isLoading: true });
    try {
      const response = await api.delete(`${endpoints.admin.admins}/${adminId}`);
      
      if (response.data.success) {
        set((state) => ({
          admins: state.admins.filter((admin) => admin._id !== adminId),
          isLoading: false,
        }));
        
        toast.success('Admin deleted successfully');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete admin';
      toast.error(message);
      set({ isLoading: false });
      return { success: false, message };
    }
  },
  
  // Clear store data
  clear: () => {
    set({
      dashboardStats: null,
      admins: [],
      isLoading: false,
    });
  },
}));

export default useAdminStore;
