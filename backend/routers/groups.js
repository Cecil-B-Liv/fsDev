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
    updateGroup,
    approveGroupRequest,
    denyGroupRequest,
    removeGroupMember,
    deleteGroupPost,
    deleteGroupComment,
} from "../controllers/groups.js";
import { isAuthenticated, isGroupAdmin, isSiteAdmin } from "../middlewares/auth.js";
import {
    validateCreateGroup,
    validateCreatePost,
    validateUpdateGroup,
    validateSearchQuery
} from "../middlewares/validate.js"
import { uploadPostPicture } from "../middlewares/upload.js";

const router = express.Router();

/* CREATE */
router.post("/create",
    isAuthenticated,
    validateCreateGroup,    // Add validation middleware
    createGroup);   // Create a new group
router.post("/:groupId/posts/create",
    isAuthenticated,
    validateCreatePost,    // Add validation middleware
    uploadPostPicture,   // Add upload middleware
    createGroupPost);   // Create a group post

/* READ */
router.get("/search",
    isAuthenticated,
    validateSearchQuery,    // Add validation middleware
    searchGroups);   // Search all approved groups
router.get("/", isAuthenticated, getGroups); // Get all approved groups
router.get("/:groupId",
    isAuthenticated,
    getGroup);  // Get a specific approved group detail and posts (depends on public or private)
router.get("/unapproved",
    isAuthenticated,
    isSiteAdmin,
    getUnapprovedGroups);   // Get all unapproved groups for siteAdmin

/* UPDATE */
router.patch("/:groupId/approve",
    isAuthenticated,
    isSiteAdmin,
    approveGroupCreation
);  // Approve a group creation by siteAdmin
router.patch("/:groupId/deny",
    isAuthenticated,
    isSiteAdmin,
    denyGroupCreation
);  // Deny a group creation by siteAdmin
router.put("/:groupId/update",
    isAuthenticated,
    isGroupAdmin,
    validateUpdateGroup,    // Add validation middleware
    updateGroup
);  // Update a group detail
router.patch("/:groupId/requests/:requestId/approve",
    isAuthenticated,
    isGroupAdmin,
    approveGroupRequest
); // Approve a group join request by groupAdmin
router.patch("/:groupId/requests/:requestId/deny",
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