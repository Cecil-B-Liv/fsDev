import Post from "../models/Post.js";
import User from "../models/User.js";
// import Comment from "../models/Comment.js";

/* CREATE */
// Create a user post
export const getPosts = async (req, res) => {
    try {
        const { userId, postDescription, postVisibility, postPicturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            postOwnerName: user.username,
            postOwnerDisplayName: user.displayName,
            ownerPicturePath: user.picturePath,
            postVisibility,
            postDescription,
            postPicturePath,
            postReaction: {},
            postComments: [],
        })
        await newPost.save();

        const post = await Post.find(); // Return all posts to frontend
        res.status(201).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Create a user comment to a post
// export const getComments = async (req, res) => {
//     try {
//         const { userId, postId, commentDescription } = req.body;
//         const user = await User.findById(userId);
//         const newComment = new Comment({
//             userId,
//             postId,
//             commentOwnerName: user.username,
//             ownerPicturePath: user.picturePath,
//             commentDescription,
//         })
//         await newComment.save();

//         const updatedPost = await Post.findByIdAndUpdate(
//             postId,
//             { $push: { postComments: newComment._id } },
//             { new: true }
//         );

//         res.status(201).json(updatedPost);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// };

/* READ */
// Get all posts to the public feed
export const getPublicFeed = async (req, res) => {
    try {
        const post = await Post.find({ postVisibility: "public" });
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get all posts to the friends feed
export const getFriendsFeed = async (req, res) => {
    try {
        const post = await Post.find({ postVisibility: "friends" });
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get all posts to the feed (no visibility option)
// export const getFeedPosts = async (req, res) => {
//     try {
//         const post = await Post.find();
//         res.status(200).json(post);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// };

// Get all posts for a user
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/* UPDATE */
// Update post reactions
export const reactPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isReacted = post.postReaction.get(userId);

        if (isReacted) {
            post.reacts.delete(userId);
        } else {
            post.reacts.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { reacts: post.reacts },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};