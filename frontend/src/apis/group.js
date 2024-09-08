import axios from 'axios';

// Set the base URL for your API requests
const API_BASE_URL = import.meta.env.VITE_SERVER_URL;


// Create a new group
export const createGroup = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/groups/create`, formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error creating group";
    }
};

// Create a group post
export const createGroupPost = async (groupId, postData) => {
    try {
        // const formData = new FormData();
        // for (let key in postData) {
        //     formData.append(key, postData[key]);
        // }

        const response = await axios.post(`${API_BASE_URL}/groups/${groupId}/posts/create`, postData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error creating group post";
    }
};

// Get all approved groups
export const getGroups = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/groups`,
            {
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error fetching groups";
    }
};

// Get specific group details and posts
export const getGroup = async (groupId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/groups/${groupId}`,
            {
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error fetching group details";
    }
};

// Search for approved groups
export const searchGroups = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/groups/search`, { params: { q: query } },
            {
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error searching for groups";
    }
};

// Get all unapproved groups (siteAdmin)
export const getUnapprovedGroups = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/groups/unapproved`,
            {
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error fetching unapproved groups";
    }
};

// Approve group creation (siteAdmin)
export const approveGroupCreation = async (groupId) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/groups/${groupId}/approve`,
            {
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error approving group creation";
    }
};

// Deny group creation (siteAdmin)
export const denyGroupCreation = async (groupId) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/groups/${groupId}/deny`,
            {
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error denying group creation";
    }
};

// Update group details (groupAdmin)
export const updateGroup = async (groupId, updatedFields) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/groups/${groupId}/update`, updatedFields,
            {
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error updating group details";
    }
};

// Approve a group join request (groupAdmin)
export const approveGroupRequest = async (groupId, requestId) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/groups/${groupId}/requests/${requestId}/approve`,
            {
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error approving group join request";
    }
};

// Deny a group join request (groupAdmin)
export const denyGroupRequest = async (groupId, requestId) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/groups/${groupId}/requests/${requestId}/deny`,
            {
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error denying group join request";
    }
};

// Remove a group member (groupAdmin)
export const removeGroupMember = async (groupId, memberId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/groups/${groupId}/members/${memberId}/delete`,
            {
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error removing group member";
    }
};

// Delete a group post
export const deleteGroupPost = async (groupId, postId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/groups/${groupId}/posts/${postId}/delete`,
            {
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error deleting group post";
    }
};

// Delete a comment from a group post
export const deleteGroupComment = async (groupId, commentId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/groups/${groupId}/comments/${commentId}/delete`,
            {
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error deleting group comment";
    }
};
