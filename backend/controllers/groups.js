import Group from "../models/Group.js";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import { createNotification } from "../controllers/notifications.js";

/* CREATE */
// Create a new group
export const createGroup = async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const {
            name,
            description,
            groupVisibility
        } = req.body;

        // Check if a group with the same name already exists
        const existingGroup = await Group.findOne({ name });
        if (existingGroup) {
            return res.status(400).json({ message: "Group name already exists" });
        }

        const newGroup = new Group({
            name,
            description,
            groupAdminId: currentUserId,
            groupMemberList: [currentUserId], // Add the admin to the member list initially
            groupVisibility,
            pendingRequests: [],
            isApproved: false,
        });
        await newGroup.save();

        // Add the new group to the group admin's groupList
        const groupAdmin = await User.findById(currentUserId);
        groupAdmin.groupList.push(newGroup._id);
        groupAdmin.userRole = "groupAdmin";     // Update the userRole to groupAdmin
        await groupAdmin.save();

        // Find siteAdmin
        const siteAdmins = await User.find({ userRole: "siteAdmin" });
        // Send notification to siteAdmin
        for (const siteAdmin of siteAdmins) {
            await createNotification(
                siteAdmin._id,
                currentUserId,
                "groupCreationApproval",
                `New group '${newGroup.name}' created by ${groupAdmin.username} (${groupAdmin.displayName}) is awaiting your approval.`
            );
        }

        res.status(201).json(newGroup);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

// Create a group post
export const createGroupPost = async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const { groupId } = req.params;
        const {
            postVisibility,
            postDescription,
            postPicturePath,
        } = req.body;
        const user = await User.findById(currentUserId);
        const group = await Group.findById(groupId);

        // Find the user who is creating the post
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If it's a group post, check if the user is a member
        if (groupId) {
            if (!group || !group.groupMemberList.includes(currentUserId)) {
                return res.status(403).json({ message: "Not authorized to post in this group" });
            }
            // Set visibility to 'group' if posting in a group
            postVisibility = "group";
        }

        const newPost = new Post({
            currentUserId,
            groupId,
            postVisibility,
            postDescription,
            postPicturePath,
            // postReaction: [],
            // postComments: [],
            // postHistory: [],
        });
        await newPost.save();

        // Fetch and populate the newly created post
        const populatedPost = await Post.findById(newPost._id).populate("userId", "username displayName picturePath");

        res.status(201).json(populatedPost);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

/* READ */
// Get all approved groups
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

// Get a specific group detail and group posts
export const getGroup = async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const { groupId } = req.params;
        const user = await User.findById(currentUserId);
        let group = await Group.findById(groupId);

        // Check if the group exist
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Check if the group is approved by siteAdmin
        if (!group.isApproved) {
            return res.status(403).json({ message: "Group is not approved" });
        }

        // Show the group's initial info
        group = await group.populate("groupAdminId", "username displayName picturePath");

        // Check group visibility and user membership
        if (group.groupVisibility === "private") {
            if (!currentUserId || !group.groupMemberList.includes(currentUserId)) {
                // User is not a member of the private group
                return res.status(403).json({
                    message: "This is a private group. You need to be a member to view its details.",
                    group: { _id: group._id, name: group.name, description: group.description }, // Return limited info
                });
            }
        }

        // If the group is public or the user is a member or the user is the siteAdmin
        if (group.groupVisibility === "public" ||
            group.groupMemberList.includes(currentUserId) ||
            user.userRole === "siteAdmin"
        ) {
            await group.populate("groupMemberList", "username displayName picturePath");

            // Get all posts associated with the group
            const groupPosts = await Post.find({ groupId: groupId })
                .populate("userId", "username displayName picturePath")
                .sort({ createdAt: -1 });

            // Add the posts to the group object
            group = group.toObject(); // Convert Mongoose document to plain object
            group.posts = groupPosts;
        }

        res.status(200).json(group);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Search for approved groups
export const searchGroups = async (req, res) => {
    try {
        const { q } = req.query;

        // Set a minimum query length
        const minQueryLength = 3;
        if (q.length < minQueryLength) {
            return res.status(200).json([]); // Return an empty array
        }

        // Perform a search on group name
        const groups = await Group.find({
            $and: [
                { name: { $regex: new RegExp(`\\b${q}\\b`, "i") } },
                { isApproved: true },
            ],
        }).populate("groupAdminId", "username displayName picturePath").sort({ createdAt: -1 });

        res.status(200).json(groups);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Get all unapproved groups (siteAdmin)
export const getUnapprovedGroups = async (req, res) => {
    try {
        const groups = await Group.find({ isApproved: false })
            .populate("groupAdminId", "username displayName picturePath")
            .sort({ createdAt: -1 });

        res.status(200).json(groups);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */
// Approve a group creation (siteAdmin)
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

// Deny a group creation (siteAdmin)
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

// Approve a group join request (groupAdmin)
export const approveGroupRequest = async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const { groupId, requestId } = req.params;
        const group = await Group.findById(groupId);
        const groupAdmin = await User.findById(currentUserId);

        // Check if the request exists
        if (!group.pendingRequests.includes(requestId)) {
            return res.status(400).json({ message: "Request not found" });
        }

        // Remove the request from pendingRequests
        group.pendingRequests = group.pendingRequests.filter(
            (id) => !id.equals(requestId)
        );

        // Add the user to the groupMemberList
        group.groupMemberList.push(requestId);

        // Add the group to that user's groupList
        const user = await User.findById(requestId);
        user.groupList.push(groupId);

        await group.save();
        await user.save();

        // Create a notification to the approved user
        await createNotification(
            requestId,
            currentUserId,
            "groupMemberAccepted",
            `Your request to join group '${group.name}' has been approved by ${groupAdmin.username} (${groupAdmin.displayName})!`
        );

        res.status(200).json({ message: "Join request approved successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Deny a group join request (groupAdmin)
export const denyGroupRequest = async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const { groupId, requestId } = req.params;
        const groupAdmin = await User.findById(currentUserId);

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
            (id) => !id.equals(requestId)
        );

        await group.save();


        // Create a notification to the denied user
        await createNotification(
            requestId,
            currentUserId,
            "groupMemberDenied",
            `Your request to join group '${group.name}' has been declined by ${groupAdmin.username} (${groupAdmin.displayName}).`
        );

        res.status(200).json({ message: "Join request declined successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* DELETE */
// Remove a group member (groupAdmin)
export const removeGroupMember = async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const { groupId, memberId } = req.params;
        const group = await Group.findById(groupId);
        const member = await User.findById(memberId);
        const groupAdmin = await User.findById(currentUserId);

        // Check if the group exists
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Check if the current user is the group admin of the group
        if (!group.groupAdminId.equals(currentUserId)) {
            return res.status(403).json({ message: "Only the group admin can remove members" });
        }

        // Check if the member exists in the group
        if (!group.groupMemberList.includes(memberId)) {
            return res.status(400).json({ message: "Member not found in the group" });
        }

        // Remove the member from the groupMemberList
        group.groupMemberList = group.groupMemberList.filter(
            (id) => !id.equals(memberId)
        );

        // Remove the group from that member's groupList
        member.groupList = member.groupList.filter(
            (id) => !id.equals(groupId)
        );

        await group.save();
        await member.save();

        // Create a notification to the removed member
        await createNotification(
            requestId,
            currentUserId,
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
        const currentUserId = req.session.userId;
        const { groupId, postId } = req.params;
        const user = await User.findById(currentUserId);
        const group = await Group.findById(groupId);
        const post = await Post.findById(postId);

        // Find the group
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Find the post
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the post belongs to the group
        if (post.groupId !== groupId) {
            return res.status(400).json({ message: "Post does not belong to this group" });
        }

        // Check if the current user is the owner of the post, a group admin of the group, or a site admin
        if (
            post.userId !== currentUserId ||
            group.groupAdminId !== currentUserId ||
            user.userRole !== "siteAdmin"
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
        const currentUserId = req.session.userId;
        const { groupId, commentId } = req.params;
        const user = await User.findById(currentUserId);
        const group = await Group.findById(groupId);
        const comment = await Comment.findById(commentId);

        // Find the group
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Find the comment
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Find the post associated with the comment
        const post = await Post.findById(comment.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the post belongs to the group
        if (post.groupId !== groupId) {
            return res.status(400).json({ message: "Comment does not belong to this group" });
        }

        // Check if the current user is the owner of the comment, the group admin of the group, or a site admin
        if (
            comment.userId !== currentUserId ||
            group.groupAdminId !== currentUserId ||
            user.userRole !== "siteAdmin"
        ) {
            return res.status(403).json({ msg: "Unauthorized to delete this comment" });
        }

        // Delete the comment and update the post
        await Promise.all([
            Comment.findByIdAndDelete(commentId),
            Post.findByIdAndUpdate(post._id, { $pull: { postComments: commentId } }),
        ]);

        res.status(200).json({ message: "Comment in the group post deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};