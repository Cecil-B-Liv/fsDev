import express from "express";
import {
    getUser,
    getUsers,
    searchUsers,
    updateUserProfile,
    getUserFriends,
    getUserGroups,
    sendFriendRequest,
    sendGroupJoinRequest,
    acceptFriendRequest,
    denyFriendRequest,
    removeFriend,
    suspendUser,
    resumeUser,
} from "../controllers/users.js";
import { isAuthenticated, isSiteAdmin } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/* CREATE */
router.post('/friend-request', isAuthenticated, sendFriendRequest); // Send a friend request
router.post('/group-request', isAuthenticated, sendGroupJoinRequest);   // Send a group request

/* READ */
router.get('/search', isAuthenticated, searchUsers);  // Search user
router.get("/:userId", isAuthenticated, getUser);   // Get user profile
router.get("/:userId/friends", isAuthenticated, getUserFriends);    // Get user's friends
router.get("/:userId/groups", isAuthenticated, getUserGroups);  // Get user's groups
router.get("/", isAuthenticated, getUsers);    // Get a list of users

/* UPDATE */
router.put("/",
    isAuthenticated,
    upload.single("picture"),   // add upload middleware
    updateUserProfile);
router.patch('/friend-request/:requestId/accept', isAuthenticated, acceptFriendRequest);  // Accept a friend request
router.patch('/friend-request/:requestId/deny', isAuthenticated, denyFriendRequest);    // Deny a friend request

/* DELETE */
router.delete("/friends/:friendId", isAuthenticated, removeFriend); // Remove a friend

/* Suspend or Resume user (admin only) */
router.put("/:userId/suspend", isAuthenticated, isSiteAdmin, suspendUser);
router.put("/:userId/resume", isAuthenticated, isSiteAdmin, resumeUser);

export default router;