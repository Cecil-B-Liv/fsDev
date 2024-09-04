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

// Function to log in a user and store userId in localStorage
export const loginUser = async (credentials) => {
    try {
        const response = await API.post('/auth/login', credentials);
        
        // Assuming the response contains user data with the user ID
        const userId = response.user._id;
        
        // Store the userId in localStorage
        localStorage.setItem('currentUserId', userId);
        
        return response.data;
    } catch (error) {
        console.error('Error during login:', error.response?.data || error.message);
        throw error;
    }
};


// Function to log out a user and clear userId from localStorage
export const logoutUser = async () => {
    try {
        const response = await API.post('/auth/logout');
        
        // Remove the userId from localStorage
        localStorage.removeItem('currentUserId');
        
        return response.data;
    } catch (error) {
        console.error('Error during logout:', error.response?.data || error.message);
        throw error;
    }
};

// // Single function to fetch and handle current user's data based on stored userId
// export const loadCurrentUser = async () => {
//     try {
//         const userId = localStorage.getItem('currentUserId'); // Get userId from local Storage
//         if (!userId) {
//             throw new Error('User ID not found. User might not be logged in.');
//         }

//         // Fetch user data using userId
//         const response = await API.get(`/users/${userId}`);
//         const user = response.data;

//         // Handle the fetched user data (you can log it or update state, etc.)
//         console.log('Current user data:', user);
        
//         return user; // Return user if you need it elsewhere
//     } catch (error) {
//         console.error('Error fetching current user:', error.response?.data || error.message);
//         throw error;
//     }
// };

// Additional functions can be added here for interacting with posts, groups, notifications, etc.