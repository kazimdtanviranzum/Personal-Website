import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api, { endpoints } from '../config/api.js';
import toast from 'react-hot-toast';

// Generic content hooks
export const useContent = (contentType, options = {}) => {
  const endpoint = endpoints.content[contentType];
  
  if (!endpoint) {
    throw new Error(`Invalid content type: ${contentType}`);
  }
  
  return useQuery({
    queryKey: [contentType],
    queryFn: async () => {
      const response = await api.get(endpoint);
      return response.data.data;
    },
    ...options,
  });
};

export const useContentById = (contentType, id, options = {}) => {
  const endpoint = endpoints.content[contentType];
  
  return useQuery({
    queryKey: [contentType, id],
    queryFn: async () => {
      const response = await api.get(`${endpoint}/${id}`);
      return response.data.data.item;
    },
    enabled: !!id,
    ...options,
  });
};

export const useCreateContent = (contentType) => {
  const queryClient = useQueryClient();
  const endpoint = endpoints.content[contentType];
  
  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post(endpoint, data);
      return response.data.data.item;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([contentType]);
      toast.success(`${contentType} created successfully`);
    },
  });
};

export const useUpdateContent = (contentType) => {
  const queryClient = useQueryClient();
  const endpoint = endpoints.content[contentType];
  
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.put(`${endpoint}/${id}`, data);
      return response.data.data.item;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries([contentType]);
      queryClient.invalidateQueries([contentType, variables.id]);
      toast.success(`${contentType} updated successfully`);
    },
  });
};

export const useDeleteContent = (contentType) => {
  const queryClient = useQueryClient();
  const endpoint = endpoints.content[contentType];
  
  return useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`${endpoint}/${id}`);
      return response.data;
    },
    onSuccess: (data, id) => {
      queryClient.invalidateQueries([contentType]);
      queryClient.removeQueries([contentType, id]);
      toast.success(`${contentType} deleted successfully`);
    },
  });
};

// Specific hooks for each content type
export const usePersonal = (options = {}) => {
  return useQuery({
    queryKey: ['personal'],
    queryFn: async () => {
      const response = await api.get(endpoints.content.personal);
      return response.data.data.personal;
    },
    ...options,
  });
};

export const useUpdatePersonal = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data) => {
      const response = await api.put(endpoints.content.personal, data);
      return response.data.data.personal;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['personal']);
      toast.success('Personal information updated successfully');
    },
  });
};

// Education hooks
export const useEducation = (options = {}) => useContent('education', options);
export const useEducationById = (id, options = {}) => useContentById('education', id, options);
export const useCreateEducation = () => useCreateContent('education');
export const useUpdateEducation = () => useUpdateContent('education');
export const useDeleteEducation = () => useDeleteContent('education');

// Experience hooks
export const useExperience = (options = {}) => useContent('experience', options);
export const useExperienceById = (id, options = {}) => useContentById('experience', id, options);
export const useCreateExperience = () => useCreateContent('experience');
export const useUpdateExperience = () => useUpdateContent('experience');
export const useDeleteExperience = () => useDeleteContent('experience');

// Publication hooks
export const usePublications = (options = {}) => useContent('publications', options);
export const usePublicationById = (id, options = {}) => useContentById('publications', id, options);
export const useCreatePublication = () => useCreateContent('publications');
export const useUpdatePublication = () => useUpdateContent('publications');
export const useDeletePublication = () => useDeleteContent('publications');

// Research hooks
export const useResearch = (options = {}) => useContent('research', options);
export const useResearchById = (id, options = {}) => useContentById('research', id, options);
export const useCreateResearch = () => useCreateContent('research');
export const useUpdateResearch = () => useUpdateContent('research');
export const useDeleteResearch = () => useDeleteContent('research');

// News hooks
export const useNews = (options = {}) => useContent('news', options);
export const useNewsById = (id, options = {}) => useContentById('news', id, options);
export const useCreateNews = () => useCreateContent('news');
export const useUpdateNews = () => useUpdateContent('news');
export const useDeleteNews = () => useDeleteContent('news');

// Scholarships & Awards hooks
export const useScholarshipsAwards = (options = {}) => useContent('scholarshipsAwards', options);
export const useScholarshipAwardById = (id, options = {}) => useContentById('scholarshipsAwards', id, options);
export const useCreateScholarshipAward = () => useCreateContent('scholarshipsAwards');
export const useUpdateScholarshipAward = () => useUpdateContent('scholarshipsAwards');
export const useDeleteScholarshipAward = () => useDeleteContent('scholarshipsAwards');

// Teaching hooks
export const useTeaching = (options = {}) => useContent('teaching', options);
export const useTeachingById = (id, options = {}) => useContentById('teaching', id, options);
export const useCreateTeaching = () => useCreateContent('teaching');
export const useUpdateTeaching = () => useUpdateContent('teaching');
export const useDeleteTeaching = () => useDeleteContent('teaching');

// Search hook
export const useSearch = (query, type = 'all', options = {}) => {
  return useQuery({
    queryKey: ['search', query, type],
    queryFn: async () => {
      const response = await api.get(endpoints.content.search, {
        params: { q: query, type },
      });
      return response.data.data;
    },
    enabled: !!query && query.trim().length >= 2,
    ...options,
  });
};
