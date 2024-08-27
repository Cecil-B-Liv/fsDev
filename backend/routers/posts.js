import express from "express";
import {
    // getFeedPosts,
    getPublicFeed,  // Added by Tung
    getFriendsFeed, // Added by Tung
    getUserPosts,
    deleteUserPost, // Added by Tung
    editUserPost,   // Added by Tung
    getUserComments,    // Added by Tung
    editUserComment,    // Added by Tung
    deleteUserComment,  // Added by Tung
    reactPost,
    commentPost,    // Added by Tung
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
// router.get("/", verifyToken, getFeedPosts);
router.get("/", verifyToken, getPublicFeed);
router.get("/friends", verifyToken, getFriendsFeed);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:userId/comments", verifyToken, getUserComments);    // Added by Tung

/* UPDATE */
router.patch("/:userId/postID", verifyToken, editUserPost);    // Added by Tung
router.patch("/:id/reaction", verifyToken, reactPost);
router.patch("/:id/comment", verifyToken, commentPost); // Added by Tung
router.patch("/:userId/comment/:commentId", verifyToken, editUserComment);  // Added by Tung


/* DELETE */
router.delete("/:userId/postID", verifyToken, deleteUserPost);  // Added by Tung
router.delete("/:userId/comment/:commentId", verifyToken, deleteUserComment);   // Added by Tung

export default router;