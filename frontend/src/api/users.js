import axios from 'axios';

// Set the base URL for your API requests
const API = axios.create({ baseURL: 'http://localhost:3001' });

// Send a friend request
export const sendFriendRequest = async (recipientId) => {
    try {
        const response = await API.post('/users/friend-request', { recipientId });
        return response.data;
    } catch (error) {
        console.error('Error sending friend request:', error.response?.data || error.message);
        throw error;
    }
};

// Send a group join request
export const sendGroupJoinRequest = async (groupId) => {
    try {
        const response = await API.post('/users/group-request', { groupId });
        return response.data;
    } catch (error) {
        console.error('Error sending group join request:', error.response?.data || error.message);
        throw error;
    }
};

// Get user profile
export const getUser = async (userId) => {
    try {
        const response = await API.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error.response?.data || error.message);
        throw error;
    }
};

// Get user's friends
export const getUserFriends = async (userId) => {
    try {
        const response = await API.get(`/users/${userId}/friends`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user friends:', error.response?.data || error.message);
        throw error;
    }
};

// Get user's groups
export const getUserGroups = async (userId) => {
    try {
        const response = await API.get(`/users/${userId}/groups`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user groups:', error.response?.data || error.message);
        throw error;
    }
};

// Search for users
export const searchUsers = async (query) => {
    try {
        const response = await API.get('/users/search', { params: { q: query } });
        return response.data;
    } catch (error) {
        console.error('Error searching for users:', error.response?.data || error.message);
        throw error;
    }
};

// Get all users
export const getUsers = async () => {
    try {
        const response = await API.get('/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error.response?.data || error.message);
        throw error;
    }
};

// Update user profile
export const updateUserProfile = async (updatedFields) => {
    try {
        const response = await API.put('/users/profile', updatedFields);
        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error.response?.data || error.message);
        throw error;
    }
};

// Accept a friend request
export const acceptFriendRequest = async (requestId, senderId) => {
    try {
        const response = await API.put(`/users/friend-request/${requestId}/accept`, { senderId });
        return response.data;
    } catch (error) {
        console.error('Error accepting friend request:', error.response?.data || error.message);
        throw error;
    }
};

// Deny a friend request
export const denyFriendRequest = async (requestId, senderId) => {
    try {
        const response = await API.put(`/users/friend-request/${requestId}/deny`, { senderId });
        return response.data;
    } catch (error) {
        console.error('Error denying friend request:', error.response?.data || error.message);
        throw error;
    }
};

// Suspend a user (for siteAdmin)
export const suspendUser = async (userId) => {
    try {
        const response = await API.put(`/users/${userId}/suspend`);
        return response.data;
    } catch (error) {
        console.error('Error suspending user:', error.response?.data || error.message);
        throw error;
    }
};

// Resume a user (for siteAdmin)
export const resumeUser = async (userId) => {
    try {
        const response = await API.put(`/users/${userId}/resume`);
        return response.data;
    } catch (error) {
        console.error('Error resuming user:', error.response?.data || error.message);
        throw error;
    }
};

// Remove a friend
export const removeFriend = async (friendId) => {
    try {
        const response = await API.delete(`/users/friends/${friendId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing friend:', error.response?.data || error.message);
        throw error;
    }
};
