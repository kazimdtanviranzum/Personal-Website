// utils/fetcher.js
import axios from 'axios';
export const fetchData = async (url) => {
    try {
        const response = await axios.get(url);  // Using GET request
        return response.data;  // Return the data from the response
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;  // Throw the error to be handled in the component
    }
};
