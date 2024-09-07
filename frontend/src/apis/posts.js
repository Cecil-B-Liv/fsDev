import axios from 'axios';

// Set the base URL for your API requests
const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

// Create a new post
export const createPost = async (formData) => {
    try {
        // const formData = new FormData();
        // for (let key in postData) {
        //     formData.append(key, postData[key]);
        // }

        const response = await axios.post(`${API_BASE_URL}/posts/create`, formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error creating post";
    }
};

// Create a comment on a post
export const createComment = async (postId, commentMessage) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/posts/${postId}/comments/create`, { commentMessage },
            {
                headers: { 'Content-Type': 'application/json' }
            });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error creating comment";
    }
};

// Get all posts to the feed
export const getFeedPosts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error fetching main feed posts";
    }
};

// Get all public posts to the feed
export const getPublicFeed = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/public`,
            {
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error fetching public feed";
    }
};

// Get all friends posts to the feed
export const getFriendsFeed = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL} / posts / friends`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error fetching friends feed";
    }
};

// Get all posts from a specific user
export const getUserPosts = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error fetching user posts";
    }
};

// Get all groups posts from a group (optional, if needed in the future)
/* Example:
export const getGroupPosts = async (groupId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/groups/${groupId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching grou`${API_BASE_URL} posts:', error.response?.data || error.message);
        throw error;
    }
};
*/

// Get all posts for siteAdmin (no filtering)
export const adminGetPosts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/admin`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error fetching admin posts";
    }
};

// Add or update a reaction to a post
export const reactToPost = async (postId, reactionType) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/posts/${postId}/react`, { reactionType },
            {
                headers: { 'Content-Type': 'application/json' }
            });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error reacting to post";
    }
};

// Update an existing post
export const updatePost = async (postId, updatedFields) => {
    try {
        // const formData = new FormData();
        // for (let key in updatedData) {
        //     formData.append(key, updatedData[key]);
        // }

        const response = await axios.put(`${API_BASE_URL}/posts/${postId}/update`, updatedFields,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error updating post";
    }
};

// Update an existing comment
export const updateComment = async (commentId, newCommentMessage) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/posts/comments/${commentId}/update`, { newCommentMessage },
            {
                headers: { 'Content-Type': 'application/json' }
            });
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error updating comment";
    }
};

// Delete a post
export const deletePost = async (postId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/posts/${postId}/delete`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error deleting post";
    }
};

// Delete a comment from a post
export const deleteComment = async (commentId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/posts/comments/${commentId}/delete`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error deleting comment";
    }
};
