import express from "express";
import {
    getUser,
    // Friend
    getUserFriendList,
    addRemoveFriend,
    getFriendRequests,
    acceptFriendRequest,
    denyFriendRequest,
    // Group
    getUserGroupList,
    addUserGroup,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ PERMISSION */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriendList);
router.get("/:id/groups", verifyToken, getUserGroupList);
router.get("/:id/friendRequests", verifyToken, getFriendRequests);

/* UPDATE PERMISSION */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.patch("/:id/:groupId", verifyToken, addUserGroup);
router.patch("/:id/acceptFriendRequest/:friendId", verifyToken, acceptFriendRequest);
router.patch("/:id/denyFriendRequest/:friendId", verifyToken, denyFriendRequest);

export default router;