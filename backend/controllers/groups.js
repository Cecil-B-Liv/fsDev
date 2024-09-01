import Group from "../models/Group.js";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import { createNotification } from "../controllers/notifications.js";

/* CREATE */
// Create a new group
export const createGroup = async (req, res) => {
    try {
        const { name, description, groupAdminId, groupVisibility } = req.body;

        // Check if a group with the same name already exists
        const existingGroup = await Group.findOne({ name });
        if (existingGroup) {
            return res.status(400).json({ message: "Group name already exists" });
        }

        const newGroup = new Group({
            name,
            description,
            groupAdminId,
            groupMemberList: [groupAdminId], // Add the admin to the member list initially
            groupVisibility,
            pendingRequests: [],
            isApproved: false,
        });
        await newGroup.save();

        // Add the new group to the admin's groupList
        const groupAdmin = await User.findById(groupAdminId);
        groupAdmin.groupList.push(newGroup._id);
        await groupAdmin.save();

        // Find siteAdmin
        const siteAdmins = await User.find({ userRole: "siteAdmin" });

        // Send notification to siteAdmin
        for (const siteAdmin of siteAdmins) {
            await createNotification(
                siteAdmin._id,
                groupAdminId,
                "groupCreationApproval",
                `New group '${newGroup.name}' created by ${groupAdmin.username} (${groupAdmin.displayName}) is awaiting your approval.`
            );
        }

        res.status(201).json(newGroup);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

/* READ */
// Get all groups
export const getGroups = async (req, res) => {
    try {
        const groups = await Group.find({ isApproved: true })
            .populate("groupAdminId", "username displayName picturePath")
            .sort({ createdAt: -1 });

        res.status(200).json(groups);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Get a specific group
export const getGroup = async (req, res) => {
    try {
        const { groupId } = req.params;
        const userId = req.session.userId;

        // Find the group
        const group = await Group.findById(groupId)
            .populate("groupAdminId", "username displayName picturePath");

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Check group visibility and user membership
        if (group.groupVisibility === "private") {
            if (!userId || !group.groupMemberList.includes(userId)) {
                // User is not a member of the private group
                return res.status(403).json({
                    message: "This is a private group. You need to be a member to view its details.",
                    group: { _id: group._id, name: group.name, description: group.description }, // Return limited info
                });
            }
        }

        // If the group is public or the user is a member
        if (group.groupVisibility === "public" || group.groupMemberList.includes(userId)) {
            await group.populate("groupMemberList", "username displayName picturePath");
        }

        res.status(200).json(populatedGroup);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */
// Approve a group creation
export const approveGroupCreation = async (req, res) => {
    try {
        const { groupId } = req.params;
        const group = await Group.findById(groupId);

        // Find the group
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Check if the group is already approved
        if (group.isApproved) {
            return res.status(400).json({ message: "Group is already approved" });
        }

        // Update the group's approval status
        group.isApproved = true;
        await group.save();

        // Create a notification for the group admin
        await createNotification(
            group.groupAdminId,
            req.session.userId,
            "groupCreationApproved",
            `Your group '${group.name}' has been approved!`
        );

        res.status(200).json({ message: "Group creation approved successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Deny a group creation
export const denyGroupCreation = async (req, res) => {
    try {
        const { groupId } = req.params;
        const group = await Group.findById(groupId);

        // Find the group
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Check if the group is already approved
        if (group.isApproved) {
            return res.status(400).json({ message: "Group is already approved" });
        }

        // Delete the group
        await Group.findByIdAndDelete(groupId);

        // Create a notification for the group admin
        await createNotification(
            group.groupAdminId,
            req.session.userId,
            "groupCreationDenied",
            `Your group '${group.name}' has been denied.`
        );

        res.status(200).json({ message: "Group creation denied and group deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Approve a group join request
export const approveGroupRequest = async (req, res) => {
    try {
        const { groupId, requestId } = req.params;

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Check if the request exists
        if (!group.pendingRequests.includes(requestId)) {
            return res.status(400).json({ message: "Request not found" });
        }

        // Remove the request from pendingRequests
        group.pendingRequests = group.pendingRequests.filter(
            (id) => id.toString() !== requestId
        );

        // Add the user to the groupMemberList
        group.groupMemberList.push(requestId);

        // Add the group to that user's groupList
        const user = await User.findById(requestId);
        user.groupList.push(groupId);

        await group.save();
        await user.save();

        // Create a notification to the approved user
        const groupAdmin = await User.findById(req.session.userId);
        await createNotification(
            requestId,
            groupAdmin._id,
            "groupMemberAccepted",
            `Your request to join group '${group.name}' has been approved by ${groupAdmin.username} (${groupAdmin.displayName})!`
        );

        res.status(200).json({ message: "Join request approved successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Deny a group join request
export const denyGroupRequest = async (req, res) => {
    try {
        const { groupId, requestId } = req.params;

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Check if the request exists
        if (!group.pendingRequests.includes(requestId)) {
            return res.status(400).json({ message: "Request not found" });
        }

        // Remove the request from pendingRequests
        group.pendingRequests = group.pendingRequests.filter(
            (id) => id.toString() !== requestId
        );

        await group.save();


        // Create a notification to the denied user
        const groupAdmin = await User.findById(req.session.userId);
        await createNotification(
            requestId,
            groupAdmin._id,
            "groupMemberDenied",
            `Your request to join group '${group.name}' has been declined by ${groupAdmin.username} (${groupAdmin.displayName}).`
        );

        res.status(200).json({ message: "Join request declined successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* DELETE */
// Remove a group member
export const removeGroupMember = async (req, res) => {
    try {
        const { groupId, memberId } = req.params;

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Check if the member exists in the group
        if (!group.groupMemberList.includes(memberId)) {
            return res.status(400).json({ message: "Member not found in the group" });
        }

        // Remove the member from the groupMemberList
        group.groupMemberList = group.groupMemberList.filter(
            (id) => id.toString() !== memberId
        );

        // Remove the group from that user's groupList
        const user = await User.findById(memberId);
        user.groupList = user.groupList.filter((id) => id.toString() !== groupId);

        await group.save();
        await user.save();

        // Create a notification to the removed member
        const groupAdmin = await User.findById(req.session.userId);
        await createNotification(
            requestId,
            groupAdmin._id,
            "groupMemberRemoved",
            `You have been removed from group '${group.name}' by ${groupAdmin.username} (${groupAdmin.displayName}).`
        );

        res.status(200).json({ message: "Member removed successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a group post
export const deleteGroupPost = async (req, res) => {
    try {
        const { groupId, postId } = req.params;
        const { userId, userRole } = req.body;

        // Find the group
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Find the post
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the post belongs to the group
        if (post.groupId.toString() !== groupId) {
            return res.status(400).json({ message: "Post does not belong to this group" });
        }

        // Check if the current user is the owner of the post, a groupAdmin, or a site admin
        if (
            post.userId.toString() !== userId &&
            userRole !== "groupAdmin" &&
            userRole !== "siteAdmin"
        ) {
            return res.status(403).json({ msg: "Unauthorized to delete this post" });
        }

        // Delete the post and associated comments
        await Promise.all([
            Post.findByIdAndDelete(postId),
            Comment.deleteMany({ postId }),
        ]);

        res.status(200).json({ message: "Group post and associated comments deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a post comment from a group post
export const deleteGroupComment = async (req, res) => {
    try {
        const { groupId, commentId } = req.params;
        const { userId, userRole } = req.body;

        // Find the group
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Find the comment
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Find the post associated with the comment
        const post = await Post.findById(comment.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the post belongs to the group
        if (post.groupId.toString() !== groupId) {
            return res.status(400).json({ message: "Comment does not belong to this group" });
        }

        // Check if the current user is the owner of the comment, a groupAdmin, or a site admin
        if (
            comment.userId.toString() !== userId &&
            userRole !== "groupAdmin" &&
            userRole !== "siteAdmin"
        ) {
            return res.status(403).json({ msg: "Unauthorized to delete this post" });
        }

        // Delete the comment and update the post
        await Promise.all([
            Comment.findByIdAndDelete(commentId),
            Post.findByIdAndUpdate(post._id, { $pull: { postComments: commentId } }),
        ]);

        res.status(200).json({ message: "Group comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};