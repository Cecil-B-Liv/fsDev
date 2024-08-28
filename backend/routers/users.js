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
router.post('/:userId/friendRequests', isAuthenticated, sendFriendRequest); // Send a friend request
router.post('/:userId/groupRequests', isAuthenticated, sendGroupJoinRequest);   // Send a group request

/* READ */
router.get("/:userId", isAuthenticated, getUser);   // Get user profile
router.get("/:userId/friends", isAuthenticated, getUserFriends);    // Get user's friends
router.get("/:userId/groups", isAuthenticated, getUserGroups);  // Get user's groups
router.get('/search', isAuthenticated, searchUsers);  // Search user

/* UPDATE */
router.patch("/:userId",
    isAuthenticated,
    upload.single("picture"),   // add upload middleware
    updateUserProfile);
router.patch('/friendRequests/:requestId/accept', isAuthenticated, acceptFriendRequest);  // Accept a friend request
router.patch('/friendRequests/:requestId/decline', isAuthenticated, declineFriendRequest);    // Decline a friend request

/* DELETE */
router.delete("/:userId/friends/:friendId", isAuthenticated, removeFriend); // Remove a friend

/* Suspend or Resume user (admin only) */
router.put("/:userId/suspend", isAuthenticated, isSiteAdmin, suspendUser);
router.put("/:userId/resume", isAuthenticated, isSiteAdmin, resumeUser);

export default router;