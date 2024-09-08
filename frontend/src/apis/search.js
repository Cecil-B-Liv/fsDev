import axios from 'axios';

// Set the base URL for your API requests
const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

// Search for users and approved groups
export const searchUsersAndGroups = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search`,
            {
                params: { q: query },
                withCredentials: true
            });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error searching for users and groups";
    }
};
