import axios from 'axios';

// Set the base URL for your API requests
const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

// Register
export const register = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "An error occurred during registration";
    }
};

// Login
export const login = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, formData,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error.response?.data?.error || "An error occurred during login";
    }
};

// Check Auth from user (isAuth, username, displayName, user, userId)
export const checkAuth = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/check-auth`,
            {
                withCredentials: true
            }
        );
        return response.data; // Backend returns user data if authenticated
    } catch (error) {
        throw error.response?.data?.error || "An error occurred during authentication check";
    }
};

// Logout
export const logout = async () => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/auth/logout`,
            {
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "An error occurred during logout";
    }
};