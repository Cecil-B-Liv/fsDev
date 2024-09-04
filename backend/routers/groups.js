import express from "express";
import {
    createGroup,
    createGroupPost,
    getGroups,
    getGroup,
    searchGroups,
    getUnapprovedGroups,
    approveGroupCreation,
    denyGroupCreation,
    approveGroupRequest,
    denyGroupRequest,
    removeGroupMember,
    deleteGroupPost,
    deleteGroupComment,
} from "../controllers/groups.js";
import { isAuthenticated, isGroupAdmin, isSiteAdmin } from "../middlewares/auth.js";

const router = express.Router();

/* CREATE */
router.post("/create", isAuthenticated, createGroup);
router.post("/:groupId/posts/create", isAuthenticated, createGroupPost);

/* READ */
router.get("/search", isAuthenticated, searchGroups);   // Search all approved groups
router.get("/", isAuthenticated, getGroups); // Get all approved groups
router.get("/:groupId", isAuthenticated, getGroup);  // Get a specific approved group detail and posts (depends on public or private)
router.get("/unapproved", isAuthenticated, isSiteAdmin, getUnapprovedGroups);   // Get all unapproved groups for siteAdmin

/* UPDATE */
router.put("/:groupId/approve",
    isAuthenticated,
    isSiteAdmin,
    approveGroupCreation
);  // Approve a group creation by siteAdmin
router.put("/:groupId/deny",
    isAuthenticated,
    isSiteAdmin,
    denyGroupCreation
);  // Deny a group creation by siteAdmin
router.put("/:groupId/requests/:requestId/approve",
    isAuthenticated,
    isGroupAdmin,
    approveGroupRequest
); // Approve a group join request by groupAdmin
router.put("/:groupId/requests/:requestId/deny",
    isAuthenticated,
    isGroupAdmin,
    denyGroupRequest
); // Deny a group join request by groupAdmin

/* DELETE */
router.delete("/:groupId/members/:memberId/delete",
    isAuthenticated,
    isGroupAdmin,
    removeGroupMember
); // Remove a group member by groupAdmin
router.delete("/:groupId/posts/:postId/delete",
    isAuthenticated,
    deleteGroupPost
); // Delete a group post by post onwer or groupAdmin
router.delete("/:groupId/comments/:commentId/delete",
    isAuthenticated,
    deleteGroupComment
); // Delete a group comment by comment owner or groupAdmin

export default router;