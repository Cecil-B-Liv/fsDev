import express from "express";
import {
    createGroup,
    getGroups,
    getGroup,
    approveGroupRequest,
    declineGroupRequest,
    removeGroupMember,
    deleteGroupPost,
    deleteGroupComment,
} from "../controllers/groups.js";
import { isAuthenticated, isGroupAdmin } from "../middlewares/auth.js";

const router = express.Router();

/* CREATE */
router.post("/", isAuthenticated, createGroup);

/* READ */
router.get("/", isAuthenticated, getGroups); // Get all groups (public)
router.get("/:groupId", isAuthenticated, getGroup);  // Get a specific group (depends on public or private)

/* UPDATE */
router.put("/:groupId/requests/:requestId/approve",
    isAuthenticated,
    isGroupAdmin,
    approveGroupRequest
); // Approve a group join request from groupAdmin
router.put("/:groupId/requests/:requestId/decline",
    isAuthenticated,
    isGroupAdmin,
    declineGroupRequest
); // Decline a group join request from groupAdmin

/* DELETE */
router.delete("/:groupId/members/:memberId",
    isAuthenticated,
    isGroupAdmin,
    removeGroupMember
); // Remove a group member from groupAdmin
router.delete("/:groupId/posts/:postId",
    isAuthenticated,
    deleteGroupPost
); // Delete a group post from post onwer or groupAdmin
router.delete("/:groupId/comments/:commentId",
    isAuthenticated,
    deleteGroupComment
); // Delete a group comment from comment owner or groupAdmin

export default router;