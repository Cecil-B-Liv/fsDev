import axios from 'axios';

// Set the base URL for your API requests
const API = axios.create({ baseURL: 'http://localhost:3001' });

/* CREATE */
// Create a new post
export const createPost = async (postData) => {
    try {
        const formData = new FormData();
        for (let key in postData) {
            formData.append(key, postData[key]);
        }

        const response = await API.post('/posts/create', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error.response?.data || error.message);
        throw error;
    }
};

// Create a comment on a post
export const createComment = async (postId, commentMessage) => {
    try {
        const response = await API.post(`/posts/${postId}/comments/create`, { commentMessage });
        return response.data;
    } catch (error) {
        console.error('Error creating comment:', error.response?.data || error.message);
        throw error;
    }
};

/* READ */
// Get all posts for the current user's feed (filtered by relationships and visibility)
export const getFeedPosts = async () => {
    try {
        const response = await API.get('/posts');
        return response.data;
    } catch (error) {
        console.error('Error fetching feed posts:', error.response?.data || error.message);
        throw error;
    }
};

// Get all public posts for the feed
export const getPublicFeed = async () => {
    try {
        const response = await API.get('/posts/public');
        return response.data;
    } catch (error) {
        console.error('Error fetching public feed:', error.response?.data || error.message);
        throw error;
    }
};

// Get all posts from friends for the feed
export const getFriendsFeed = async () => {
    try {
        const response = await API.get('/posts/friends');
        return response.data;
    } catch (error) {
        console.error('Error fetching friends feed:', error.response?.data || error.message);
        throw error;
    }
};

// Get all posts from a specific user
export const getUserPosts = async (userId) => {
    try {
        const response = await API.get(`/posts/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user posts:', error.response?.data || error.message);
        throw error;
    }
};

// Get all posts from a group (optional, if needed in the future)
/* Example:
export const getGroupPosts = async (groupId) => {
    try {
        const response = await API.get(`/posts/groups/${groupId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching group posts:', error.response?.data || error.message);
        throw error;
    }
};
*/

// Get all posts for siteAdmin (no filtering)
export const adminGetPosts = async () => {
    try {
        const response = await API.get('/posts/admin');
        return response.data;
    } catch (error) {
        console.error('Error fetching admin posts:', error.response?.data || error.message);
        throw error;
    }
};

/* UPDATE */
// Add or update a reaction to a post
export const reactToPost = async (postId, reactionType) => {
    try {
        const response = await API.put(`/posts/${postId}/react`, { reactionType });
        return response.data;
    } catch (error) {
        console.error('Error reacting to post:', error.response?.data || error.message);
        throw error;
    }
};

// Update an existing post
export const updatePost = async (postId, updatedData) => {
    try {
        const formData = new FormData();
        for (let key in updatedData) {
            formData.append(key, updatedData[key]);
        }

        const response = await API.put(`/posts/${postId}/update`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating post:', error.response?.data || error.message);
        throw error;
    }
};

// Update an existing comment
export const updateComment = async (commentId, newCommentMessage) => {
    try {
        const response = await API.put(`/posts/comments/${commentId}/update`, { newCommentMessage });
        return response.data;
    } catch (error) {
        console.error('Error updating comment:', error.response?.data || error.message);
        throw error;
    }
};

/* DELETE */
// Delete a post
export const deletePost = async (postId) => {
    try {
        const response = await API.delete(`/posts/${postId}/delete`);
        return response.data;
    } catch (error) {
        console.error('Error deleting post:', error.response?.data || error.message);
        throw error;
    }
};

// Delete a comment from a post
export const deleteComment = async (commentId) => {
    try {
        const response = await API.delete(`/posts/comments/${commentId}/delete`);
        return response.data;
    } catch (error) {
        console.error('Error deleting comment:', error.response?.data || error.message);
        throw error;
    }
};
