import express from "express";
import {
    createPost,
    getFeedPosts,
    getPublicFeed,
    getFriendsFeed,
    getUserPosts,
    getGroupPosts,
    reactPost,
    updatePost,
    createComment,
    updateComment,
    deletePost,
    deleteComment,
} from "../controllers/posts.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

/* CREATE */
router.post("/", isAuthenticated, createPost);
router.post("/:postId/comments", isAuthenticated, createComment);

/* READ */
router.get("/feed", isAuthenticated, getFeedPosts);
router.get("/public", isAuthenticated, getPublicFeed);
router.get("/friends/:userId", isAuthenticated, getFriendsFeed);
router.get("/user/:userId", isAuthenticated, getUserPosts);
router.get("/group/:groupId", isAuthenticated, getGroupPosts);

/* UPDATE */
router.put("/:postId/react", isAuthenticated, reactPost);
router.put("/:postId", isAuthenticated, updatePost);
router.put("/comments/:commentId", isAuthenticated, updateComment);

/* DELETE */
router.delete("/:postId", isAuthenticated, deletePost);
router.delete("comments/:commentId", isAuthenticated, deleteComment);

export default router;