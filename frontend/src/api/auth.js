import axios from 'axios';

// Set the base URL for your API requests
const API = axios.create({ baseURL: 'http://localhost:3001' });

// Function to register a new user
export const registerUser = async (userData) => {
    try {
        const response = await API.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error.response?.data || error.message);
        throw error;
    }
};

// Function to log in a user
export const loginUser = async (credentials) => {
    try {
        const response = await API.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Error during login:', error.response?.data || error.message);
        throw error;
    }
};

// Function to log out a user
export const logoutUser = async () => {
    try {
        const response = await API.post('/auth/logout');
        return response.data;
    } catch (error) {
        console.error('Error during logout:', error.response?.data || error.message);
        throw error;
    }
};

// Function to fetch the current user's data (if logged in)
export const fetchCurrentUser = async () => {
    try {
        const response = await API.get('/users/me');
        return response.data;
    } catch (error) {
        console.error('Error fetching current user:', error.response?.data || error.message);
        throw error;
    }
};

// Additional functions can be added here for interacting with posts, groups, notifications, etc.
