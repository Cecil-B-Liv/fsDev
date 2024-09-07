import axios from 'axios';

// Set the base URL for your API requests
const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

// Send a friend request
export const sendFriendRequest = async (recipientId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/friend-request`, { recipientId });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error sending friend request";
    }
};

// Send a group join request
export const sendGroupJoinRequest = async (groupId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/group-request`, { groupId });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error sending group join request";
    }
};

// Get user profile
export const getUser = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error fetching user profile";
    }
};

// Get user's friends
export const getUserFriends = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}/friends`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error fetching user friends";
    }
};

// Get user's groups
export const getUserGroups = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}/groups`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error fetching user groups";
    }
};

// Search for users
export const searchUsers = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/search`, { params: { q: query } });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error searching for users";
    }
};

// Get all users
export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error fetching users";
    }
};

// Update user profile
export const updateUserProfile = async (updatedFields) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/users/update`, updatedFields);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error updating user profile";
    }
};

// Accept a friend request
export const acceptFriendRequest = async (requestId) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/users/friend-request/${requestId}/accept`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error accepting friend request";
    }
};

// Deny a friend request
export const denyFriendRequest = async (requestId) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/users/friend-request/${requestId}/deny`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error denying friend request";
    }
};

// Suspend a user (for siteAdmin)
export const suspendUser = async (userId) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/users/${userId}/suspend`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error suspending user";
    }
};

// Resume a user (for siteAdmin)
export const resumeUser = async (userId) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/users/${userId}/resume`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error resuming user";
    }
};

// Remove a friend
export const removeFriend = async (friendId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/users/friends/${friendId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error removing friend";
    }
};
