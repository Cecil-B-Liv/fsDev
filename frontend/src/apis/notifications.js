import axios from 'axios';

// Set the base URL for your API requests
const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

// Get all notifications for the current user
export const getNotifications = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/notifications`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error fetching notifications";
    }
};
