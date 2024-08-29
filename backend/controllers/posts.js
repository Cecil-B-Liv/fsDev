import Post from "../models/Post.js";
import User from "../models/User.js";
import Group from "../models/Group.js";
import Comment from "../models/Comment.js";

/* CREATE */
// Create a user post
export const createPost = async (req, res) => {
    try {
        const {
            userId,
            groupId,
            postVisibility,
            postDescription,
            postPicturePath,
        } = req.body;

        // Find the user who is creating the post
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If it's a group post, check if the user is a member
        if (groupId) {
            const group = await Group.findById(groupId);
            if (!group || !group.groupMemberList.includes(userId)) {
                return res.status(403).json({ message: "Not authorized to post in this group" });
            }
            // Set visibility to 'group' if posting in a group
            postVisibility = "group";
        }

        const newPost = new Post({
            userId,
            groupId,
            postVisibility,
            postDescription,
            postPicturePath,
            postReaction: [],
            postComments: [],
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
        const { postId, userId, commentMessage } = req.body;

        const newComment = new Comment({
            postId,
            userId,
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

        res.status(201).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/* READ */
// Get all posts to the feed
export const getFeedPosts = async (req, res) => {
    try {
        const userId = req.session.userId;

        // Fetch the user's data to get their friend list and group list
        const user = await User.findById(userId);
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
                    userId,
                },
            ],
        })
            .populate("userId", "username displayName picturePath")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all posts to the public feed
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

// Get all posts to the friends feed
export const getFriendsFeed = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        const posts = await Post.find({
            userId: { $in: [...user.friendList, userId] },
            postVisibility: { $in: ["public", "friends"] },
        })
            .populate("userId", "username displayName picturePath")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get all posts from a user
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId })
            .populate("userId", "username displayName picturePath")
            .sort({ createdAt: -1 });

        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Get all posts from a group
export const getGroupPosts = async (req, res) => {
    try {
        const { groupId } = req.params;
        const post = await Post.find({ groupId })
            .populate("userId", "username displayName picturePath")
            .sort({ createdAt: -1 });

        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */
// Add/Update post reactions
export const reactPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, reactionType } = req.body;
        const post = await Post.findById(id);

        // Check if the user has already reacted the post
        const existingReactionIndex = post.postReaction.findIndex(
            (reaction) => reaction.userId.toString() === userId
        );

        if (existingReactionIndex !== -1) {
            // Update the reaction type if already reacted
            post.postReaction[existingReactionIndex].type = reactionType;
        } else {
            // React the post if hasn't reacted
            post.postReaction.push({ userId, type: reactionType });
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
        const { id } = req.params;
        const { userId, newPostDescription, newPostPicturePath } = req.body;

        // Find the post
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        // Check if the current user is the owner of the post
        if (post.userId.toString() !== userId) {
            return res.status(403).json({ msg: "Unauthorized to edit this post" });
        }

        // Store the previous post data in the history array
        post.postHistory.push({
            postDescription: post.postDescription,
            postPicturePath: post.postPicturePath,
        });

        // Update the post
        post.postDescription = newPostDescription;
        if (newPostPicturePath) {
            // Update picturePath only if a new one is provided
            post.postPicturePath = newPostPicturePath;
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
        const { id } = req.params;
        const { userId, NewCommentMessage } = req.body;

        // Find the comment
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" });
        }

        // Check if the current user is the owner of the comment
        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ msg: "Unauthorized to edit this post" });
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
        const { id } = req.params;
        const { userId, userRole } = req.body;

        // Find the post
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        // Check if the current user is the owner of the post or a site admin
        if (post.userId.toString() !== userId && userRole !== "siteAdmin") {
            return res.status(403).json({ msg: "Unauthorized to delete this post" });
        }

        // Delete the post
        await Post.findByIdAndDelete(id);

        // Delete associated comments
        await Comment.deleteMany({ postId: id });

        res.status(200).json({ msg: "Post and associated comments deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Deleta a comment
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, userRole } = req.body;

        // Find the comment
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ msg: "Comment not found" });
        }

        // Check if the current user is the owner of the comment or a site admin
        if (comment.userId.toString() !== userId && userRole !== "siteAdmin") {
            return res.status(403).json({ msg: "Unauthorized to delete this comment" });
        }

        // Delete the comment
        await Comment.findByIdAndDelete(id);

        // Remove the comment's ID from the post's comments array
        const post = await Post.findById(comment.postId);
        post.comments = post.comments.filter(
            (commentId) => commentId.toString() !== id
        );
        await post.save();

        res.status(200).json({ msg: "Comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};