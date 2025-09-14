import { QueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors except 408
        if (error.response?.status >= 400 && error.response?.status < 500 && error.response?.status !== 408) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      onError: (error) => {
        const message = error.response?.data?.message || 'An error occurred';
        toast.error(message);
      },
    },
    mutations: {
      onError: (error) => {
        const message = error.response?.data?.message || 'An error occurred';
        toast.error(message);
      },
    },
  },
});

export default queryClient;
