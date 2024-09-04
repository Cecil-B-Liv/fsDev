import express from "express";
import {
    createPost,
    getFeedPosts,
    getPublicFeed,
    getFriendsFeed,
    getUserPosts,
    getGroupPosts,
    adminGetPosts,
    reactPost,
    updatePost,
    createComment,
    updateComment,
    deletePost,
    deleteComment,
} from "../controllers/posts.js";
import { isAuthenticated, isSiteAdmin } from "../middlewares/auth.js";

const router = express.Router();

/* CREATE */
router.post("/create", isAuthenticated, createPost);    // For create a user post
router.post("/:postId/comments/create", isAuthenticated, createComment);   // For create a user comment to a post

/* READ */
router.get("/", isAuthenticated, getFeedPosts);     // Get all user unfilter posts (depend on user relationship and post visibility)
router.get("/public", isAuthenticated, getPublicFeed);      // Get all user public posts (filter)
router.get("/friends", isAuthenticated, getFriendsFeed);    // Get all user friend posts (filter)
router.get("/:userId", isAuthenticated, getUserPosts);      // Get all posts from a user
// router.get("/:groupId", isAuthenticated, getGroupPosts);    // *Get all posts from a group (maybe use getGroup from groups.js router)*
router.get("/admin", isAuthenticated, isSiteAdmin, adminGetPosts);    // Get all posts without obstruction for siteAdmin

/* UPDATE */
router.put("/:postId/react", isAuthenticated, reactPost);   // Add/Update reaction to a post
router.put("/:postId/update", isAuthenticated, updatePost);    // Update user post
router.put("/comments/:commentId/update", isAuthenticated, updateComment);  // Update user comment to a post

/* DELETE */
router.delete("/:postId/delete", isAuthenticated, deletePost);      // Delete user post with its comments
router.delete("comments/:commentId/delete", isAuthenticated, deleteComment);    // Delete user comment to a post

export default router;