import axios from 'axios';

// Set the base URL for your API requests
const API = axios.create({ baseURL: 'http://localhost:3001' });

/* CREATE */
// Create a notification and send it to the recipient
export const createNotification = async (notificationData) => {
    try {
        const response = await API.post('/notifications', notificationData);
        return response.data;
    } catch (error) {
        console.error('Error creating notification:', error.response?.data || error.message);
        throw error;
    }
};

/* READ */
// Get all notifications for the current user
export const getNotifications = async () => {
    try {
        const response = await API.get('/notifications');
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error.response?.data || error.message);
        throw error;
    }
};
