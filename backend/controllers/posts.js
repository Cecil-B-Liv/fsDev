import Post from "../models/Post.js";
import User from "../models/User.js";
import Group from "../models/Group.js";
import Comment from "../models/Comment.js";
import { createNotification } from "./notifications.js";

/* CREATE */
// Create a user post
export const createPost = async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const {
            postVisibility,
            postDescription,
        } = req.body;
        const user = await User.findById(currentUserId);

        // Extract filename from uploaded file to the postPicturePath (if available)
        const postPicturePath = req.files && req.files['postPicturePath']
            ? req.files['postPicturePath'][0].filename
            : "default_avatar.jpg";

        /*
        // Extract filename from uploaded file to the picturePath (if available)
        const picturePath = req.files && req.files['picturePath']
            ? req.files['picturePath'][0].filename
            : "/assets/default_avatar.jpg"; // Default picture if no upload
        */

        // Find the user who is creating the post
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newPost = new Post({
            userId: currentUserId,
            groupId: null,
            postVisibility,
            postDescription,
            postPicturePath,
        });
        await newPost.save();

        // Fetch and populate the newly created post
        const populatedPost = await Post.findById(newPost._id).populate("userId", "username displayName picturePath");

        res.status(201).json(populatedPost);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

// Create a user comment to a post
export const createComment = async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const {postId} = req.params;
        const {commentMessage } = req.body;
        const post = await Post.findById(postId);
        const postOwnerId = post.userId;
        const commenter = await User.findById(currentUserId);

        const newComment = new Comment({
            postId,
            userId: currentUserId,
            commentMessage,
        });
        await newComment.save();

        // Update the post with the new comment
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $push: { postComments: newComment._id } },
            { new: true }
        )
            .populate("postComments") // Populate the comments array to include comment details
            .populate("postComments.userId", "username displayName picturePath") // Populate user details for each comment

        // Create a notification for the post owner (if it's not their own comment)
        if (currentUserId !== postOwnerId) {
            await createNotification(
                postOwnerId,
                currentUserId,
                "addedComment",
                `${commenter.username} (${commenter.displayName}) commented on your post!`
            );
        }
        
        res.status(201).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/* READ */
// Get all posts to the feed
export const getFeedPosts = async (req, res) => {
    try {
        const currentUserId = req.session.userId;

        // Fetch the user's data to get their friend list and group list
        const user = await User.findById(currentUserId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Construct the query to filter posts
        const posts = await Post.find({
            $or: [
                // Posts from public or friends-only
                {
                    userId: { $in: user.friendList },
                    postVisibility: { $in: ["public", "friends"] },
                },
                // Posts from public or group-only
                {
                    groupId: { $in: user.groupList },
                    postVisibility: { $in: ["public", "group"] },
                },
                // Posts from any visibility
                {
                    currentUserId,
                },
            ],
        })
            .populate("userId", "username displayName picturePath")
            .populate("postComments")
            .populate("postComments.userId", "username displayName picturePath")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Only get all public posts to the feed
export const getPublicFeed = async (req, res) => {
    try {
        const posts = await Post.find({ postVisibility: "public" })
            .populate("userId", "username displayName picturePath")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Only get all friend posts to the feed
export const getFriendsFeed = async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const user = await User.findById(currentUserId);

        const posts = await Post.find({
            userId: { $in: [...user.friendList, currentUserId] },
            postVisibility: "friends",
        })
            .populate("userId", "username displayName picturePath")
            .populate("postComments")
            .populate("postComments.userId", "username displayName picturePath")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Only get all posts from a user
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.session.userId;
        const user = await User.findById(userId);

        // Fetch the user's posts
        const posts = await Post.find({ userId })
            .populate("userId", "username displayName picturePath")
            .populate("postComments")
            .populate("postComments.userId", "username displayName picturePath")
            .sort({ createdAt: -1 });

        // Filter posts based on visibility and relationships
        const filteredPosts = await Promise.all(posts.map(async (post) => {
            if (post.postVisibility === 'public') {
                return post; // Public posts are always visible
            } else if (post.postVisibility === 'friends') {
                // Check if the current user is a friend of the post's owner
                if (user.friendList.includes(currentUserId)) {
                    return post;
                }
            } else if (post.postVisibility === 'group') {
                // Check if the group is public OR the current user is in the same group
                const group = await Group.findById(post.groupId);
                if (group.groupVisibility === 'public' || group.groupMemberList.includes(currentUserId)) {
                    return post;
                }
            }
            return null; // Post is not visible to the current user
        }));

        // Remove posts that are not visible
        const visiblePosts = filteredPosts.filter(post => post !== null);

        res.status(200).json(visiblePosts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Only get all posts from a group
export const getGroupPosts = async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const { groupId } = req.params;
        const group = await Group.findById(groupId);

        // Check if the group exists
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Check the group visibility
        if (group.groupVisibility !== "public" &&
            !group.groupMemberList.includes(currentUserId)) {
            return res.status(403).json({ message: "This group is not public" });
        }

        // Fetch posts from the public group
        const posts = await Post.find({ groupId })
            .populate("userId", "username displayName picturePath")
            .populate("postComments")
            .populate("postComments.userId", "username displayName picturePath")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Get all posts for siteAdmin
export const adminGetPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("userId", "username displayName picturePath")
            .populate("postComments")
            .populate("postComments.userId", "username displayName picturePath")
            .sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */
// Add/Update post reactions
export const reactPost = async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const { postId } = req.params;
        const { reactionType } = req.body;
        const post = await Post.findById(postId);
        const postOwnerId = post.userId;
        const reactor = await User.findById(currentUserId);

        // Check if the user has already reacted the post
        const existingReactionIndex = post.postReaction.findIndex(
            (reaction) => reaction.userId === currentUserId
        );

        if (existingReactionIndex !== -1) {
            // Update the reaction type if already reacted
            post.postReaction[existingReactionIndex].type = reactionType;
        } else {
            // React the post if hasn't reacted
            post.postReaction.push({ currentUserId, type: reactionType });
        }

        // Create a notification for the post owner
        if (currentUserId !== postOwnerId) {
            await createNotification(
                postOwnerId,
                currentUserId,
                "addedReaction",
                `${reactor.username} (${reactor.displayName}) reacted to your post!`
            );
        }

        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Update user post
export const updatePost = async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const { postId } = req.params;
        const { newPostVisibility, newPostDescription } = req.body;
        const post = await Post.findById(postId);

        // Find the post
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        // Check if the current user is the owner of the post
        if (post.userId.toString() !== currentUserId) {
            return res.status(403).json({ msg: "Unauthorized to edit this post" });
        }

        // Store the previous post data in the history array
        post.postHistory.push({
            postDescription: post.postDescription,
            postPicturePath: post.postPicturePath,
        });
        // Update the post
        post.postVisibility = newPostVisibility;
        post.postDescription = newPostDescription;
        // if (newPostPicturePath) {
        //     // Update picturePath only if a new one is provided
        //     post.postPicturePath = newPostPicturePath;
        // }

        // Check if a new picture was uploaded and update the postPicturePath
        if (req.files && req.files['postPicturePath']) {
            post.postPicturePath = req.files['postPicturePath'][0].filename;
        }
        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update user comment from a post
export const updateComment = async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const { commentId } = req.params;
        const { NewCommentMessage } = req.body;
        const comment = await Comment.findById(commentId);

        // Find the comment
        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" });
        }

        // Check if the current user is the owner of the comment
        if (comment.userId.toString() !== currentUserId) {
            return res.status(403).json({ msg: "Unauthorized to edit this comment" });
        }

        // Store the previous comment message in the history array
        comment.commentHistory.push({
            commentMessage: comment.commentMessage,
        });

        // Update the comment
        comment.commentMessage = NewCommentMessage;
        await comment.save();

        // Find the post associated with the comment and populate the comments
        const updatedPost = await Post.findById(comment.postId)
            .populate("postComments")
            .populate("postComments.userId", "username displayName picturePath");

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* DELETE */
// Delete a post
export const deletePost = async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const { postId } = req.params;
        const user = await User.findById(currentUserId);
        const post = await Post.findById(postId);
        const group = await Group.findById(post.groupId);

        // Find the post
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        // Check if the current user is the owner of the post,
        // the group admin if the post belong to the group, or a site admin
        // Check if the current user is the owner of the post,
        // a site admin, or the group admin if the post belongs to the group.
        
        const postUserId = post.userId.toString();

        if (
            postUserId !== currentUserId && // Not the post owner
            user.userRole !== "siteAdmin" && // Not a site admin
            (!group || group.groupAdminId.toString() !== currentUserId) // Not a group admin, or no group associated
        ) {
            return res.status(403).json({ msg: "Unauthorized to delete this post" });
        }
        

        // Delete the post and associated comments
        await Promise.all([
            Post.findByIdAndDelete(postId),
            Comment.deleteMany({ postId: postId }),
        ]);

        res.status(200).json({ msg: "Post and associated comments deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Deleta a comment
export const deleteComment = async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const { commentId } = req.params;
        const user = await User.findById(currentUserId);
        const comment = await Comment.findById(commentId);
        const post = await Post.findById(comment.postId);

        // Find the comment
        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" });
        }

        // Find the post associated with the comment
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the current user is the owner of the comment or a site admin
        if (comment.userId !== currentUserId ||
            user.userRole !== "siteAdmin") {
            return res.status(403).json({ msg: "Unauthorized to delete this comment" });
        }

        // Delete the comment and update the post
        await Promise.all([
            Comment.findByIdAndDelete(commentId),
            Post.findByIdAndUpdate(post._id, { $pull: { postComments: commentId } }),
        ]);

        res.status(200).json({ msg: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};