import axios from 'axios';

// Set the base URL for your API requests
const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

// Register
export const register = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, formData);
        return response.data; // Backend returns a success msg and registered user data
    } catch (error) {
        throw error.response?.data?.error || "An error occurred during registration";
    }
};

// Login
export const login = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);
        return response.data; // Backend returns a success msg and user data
    } catch (error) {
        throw error.response?.data?.error || "An error occurred during login";
    }
};

// Logout
export const logout = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/logout`);
      return response.data; // Backend returns a success msg
    } catch (error) {
      throw error.response?.data?.error || "An error occurred during logout";
    }
  };