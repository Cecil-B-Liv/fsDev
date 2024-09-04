import axios from 'axios';

// Set the base URL for your API requests
const API = axios.create({ baseURL: 'http://localhost:3001' });

/* CREATE */
// Create a new group
export const createGroup = async (groupData) => {
    try {
        const response = await API.post('/groups/create', groupData);
        return response.data;
    } catch (error) {
        console.error('Error creating group:', error.response?.data || error.message);
        throw error;
    }
};

// Create a group post
export const createGroupPost = async (groupId, postData) => {
    try {
        const formData = new FormData();
        for (let key in postData) {
            formData.append(key, postData[key]);
        }

        const response = await API.post(`/groups/${groupId}/posts/create`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating group post:', error.response?.data || error.message);
        throw error;
    }
};

/* READ */
// Get all approved groups
export const getGroups = async () => {
    try {
        const response = await API.get('/groups');
        return response.data;
    } catch (error) {
        console.error('Error fetching groups:', error.response?.data || error.message);
        throw error;
    }
};

// Get specific group details and posts
export const getGroup = async (groupId) => {
    try {
        const response = await API.get(`/groups/${groupId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching group details:', error.response?.data || error.message);
        throw error;
    }
};

// Search for approved groups
export const searchGroups = async (query) => {
    try {
        const response = await API.get('/groups/search', { params: { q: query } });
        return response.data;
    } catch (error) {
        console.error('Error searching for groups:', error.response?.data || error.message);
        throw error;
    }
};

// Get all unapproved groups (siteAdmin)
export const getUnapprovedGroups = async () => {
    try {
        const response = await API.get('/groups/unapproved');
        return response.data;
    } catch (error) {
        console.error('Error fetching unapproved groups:', error.response?.data || error.message);
        throw error;
    }
};

/* UPDATE */
// Approve group creation (siteAdmin)
export const approveGroupCreation = async (groupId) => {
    try {
        const response = await API.patch(`/groups/${groupId}/approve`);
        return response.data;
    } catch (error) {
        console.error('Error approving group creation:', error.response?.data || error.message);
        throw error;
    }
};

// Deny group creation (siteAdmin)
export const denyGroupCreation = async (groupId) => {
    try {
        const response = await API.patch(`/groups/${groupId}/deny`);
        return response.data;
    } catch (error) {
        console.error('Error denying group creation:', error.response?.data || error.message);
        throw error;
    }
};

// Update group details (groupAdmin)
export const updateGroup = async (groupId, updatedGroupData) => {
    try {
        const response = await API.put(`/groups/${groupId}/update`, updatedGroupData);
        return response.data;
    } catch (error) {
        console.error('Error updating group:', error.response?.data || error.message);
        throw error;
    }
};

// Approve a group join request (groupAdmin)
export const approveGroupRequest = async (groupId, requestId) => {
    try {
        const response = await API.patch(`/groups/${groupId}/requests/${requestId}/approve`);
        return response.data;
    } catch (error) {
        console.error('Error approving group join request:', error.response?.data || error.message);
        throw error;
    }
};

// Deny a group join request (groupAdmin)
export const denyGroupRequest = async (groupId, requestId) => {
    try {
        const response = await API.patch(`/groups/${groupId}/requests/${requestId}/deny`);
        return response.data;
    } catch (error) {
        console.error('Error denying group join request:', error.response?.data || error.message);
        throw error;
    }
};

/* DELETE */
// Remove a group member (groupAdmin)
export const removeGroupMember = async (groupId, memberId) => {
    try {
        const response = await API.delete(`/groups/${groupId}/members/${memberId}/delete`);
        return response.data;
    } catch (error) {
        console.error('Error removing group member:', error.response?.data || error.message);
        throw error;
    }
};

// Delete a group post
export const deleteGroupPost = async (groupId, postId) => {
    try {
        const response = await API.delete(`/groups/${groupId}/posts/${postId}/delete`);
        return response.data;
    } catch (error) {
        console.error('Error deleting group post:', error.response?.data || error.message);
        throw error;
    }
};

// Delete a comment from a group post
export const deleteGroupComment = async (groupId, commentId) => {
    try {
        const response = await API.delete(`/groups/${groupId}/comments/${commentId}/delete`);
        return response.data;
    } catch (error) {
        console.error('Error deleting group comment:', error.response?.data || error.message);
        throw error;
    }
};
