import express from "express";
import {
    getUser,
    updateUserProfile,
    getUserFriends,
    removeFriend,
    sendFriendRequest,
    sendGroupJoinRequest,
    acceptFriendRequest,
    declineFriendRequest,
    searchUsers,
    suspendUser,
    resumeUser,
    getUserGroups,
} from "../controllers/users.js";
import { isAuthenticated, isSiteAdmin } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

/* CREATE */
router.post('/users/:userId/friendRequests', isAuthenticated, sendFriendRequest); // Send a friend request
router.post('/users/:userId/groupRequests', isAuthenticated, sendGroupJoinRequest);   // Send a group request

/* READ */
router.get("/users/:userId", isAuthenticated, getUser);   // Get user profile
router.get("/users/:userId/friends", isAuthenticated, getUserFriends);    // Get user's friends
router.get("/users/:userId/groups", isAuthenticated, getUserGroups);  // Get user's groups
router.get('/search', isAuthenticated, searchUsers);  // Search user

/* UPDATE */
router.patch("/users/:userId",
    isAuthenticated,
    upload.single("picture"),   // add upload middleware
    updateUserProfile);
router.patch('/friendRequests/:requestId/accept', isAuthenticated, acceptFriendRequest);  // Accept a friend request
router.patch('/friendRequests/:requestId/decline', isAuthenticated, declineFriendRequest);    // Decline a friend request

/* DELETE */
router.delete("/users/:userId/friends/:friendId", isAuthenticated, removeFriend); // Remove a friend

/* Suspend or Resume user (admin only) */
router.put("/users/:userId/suspend", isAuthenticated, isSiteAdmin, suspendUser);
router.put("/users/:userId/resume", isAuthenticated, isSiteAdmin, resumeUser);

export default router;