import axios from 'axios';

// Set the base URL for your API requests
const API = axios.create({ baseURL: 'http://localhost:3001' });

/* READ */
// Search for users and approved groups
export const searchUsersAndGroups = async (query) => {
    try {
        const response = await API.get('/search', {
            params: { q: query }
        });
        return response.data;  // Return the users and groups found
    } catch (error) {
        console.error('Error searching for users and groups:', error.response?.data || error.message);
        throw error;
    }
};
