import User from "../models/User.js";
import Group from "../models/Group.js";
import { createNotification } from "../controllers/notifications.js";

/* CREATE */
// Send a friend request
export const sendFriendRequest = async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const { recipientId } = req.body;
        const sender = await User.findById(currentUserId);

        // Find the recipient user
        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({ msg: "Recipient user not found" });
        }

        // Check if the sender is trying to send a request to themselves
        if (currentUserId === recipientId) {
            return res.status(400).json({ msg: "Cannot send friend request to yourself" });
        }

        // Check if they are already friends
        if (recipient.friendList.includes(currentUserId)) {
            return res.status(400).json({ msg: "You are already friends" });
        }

        // Check if the request already exists
        if (recipient.friendRequests.includes(currentUserId)) {
            return res.status(400).json({ msg: "Friend request already sent" });
        }

        // Add the sender's ID to the recipient's friendRequests array
        recipient.friendRequests.push(currentUserId);
        await recipient.save();

        // Create a notification for the recipient
        await createNotification(
            recipientId,
            currentUserId,
            "friendRequest",
            `${sender.username} (${sender.displayName}) sent you a friend request!`
        );

        res.status(200).json({ msg: "Friend request sent successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Send a group join request
export const sendGroupJoinRequest = async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const { groupId } = req.body;
        const user = await User.findById(currentUserId);

        // Find the group
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ msg: "Group not found" });
        }

        // Check if the user is already a member of the group
        if (group.groupMemberList.includes(currentUserId)) {
            return res.status(400).json({ msg: "You are already a member of this group" });
        }

        // Check if the request already exists
        if (group.pendingRequests.includes(currentUserId)) {
            return res.status(400).json({ msg: "Group join request already sent" });
        }

        // Add the user's ID to the group's pendingRequests array
        group.pendingRequests.push(currentUserId);
        await group.save();

        // Create a notification for the group admin

        await createNotification(
            group.groupAdminId,
            currentUserId,
            "groupMemberRequest",
            `${user.username} (${user.displayName}) requested to join your group ${group.name}`
        );

        res.status(200).json({ msg: "Group join request sent successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* READ */
// Get user profile
export const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        // Check if user is found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Exclude sensitive information like password
        const { password, ...otherDetails } = user._doc;
        res.status(200).json(otherDetails);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Get user's friends
export const getUserFriends = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        const friends = await Promise.all(
            user.friendList.map((id) => User.findById(id))
        );

        // Populate the friendList
        const formattedFriends = friends.map(
            ({ _id, username, displayName, picturePath }) => {
                return { _id, username, displayName, picturePath };
            }
        );
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Get user's groups
export const getUserGroups = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        // const groups = await Promise.all(
        //     user.groupList.map((id) => Group.findById(id))
        // );

        const groups = await Promise.all(
            user.groupList.map(async (id) => {
                const group = await Group.findById(id);
                return group && !group.isApproved ? group : null;   // Return null if group is not approved
            })
        );
        // Filter out null values
        const approvedGroups = groups.filter(group => group !== null);

        // Populate the groupList
        const formattedGroups = approvedGroups.map(
            ({ _id, name, description }) => {
                return { _id, name, description };
            }
        );
        res.status(200).json(formattedGroups);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Search for users
export const searchUsers = async (req, res) => {
    try {
        const { q } = req.query;

        // Set a minimum query length
        const minQueryLength = 3;
        if (q.length < minQueryLength) {
            return res.status(200).json([]); // Return an empty array
        }

        // Perform a search on username or displayName
        const users = await User.find({
            $or: [
                { username: { $regex: new RegExp(`\\b${q}\\b`, "i") } },   // Case-insensitive search on username
                { displayName: { $regex: new RegExp(`\\b${q}\\b`, "i") } },    // Case-insensitive search on displayName
            ],
        }).sort({ createdAt: -1 });

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a list of user
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */
// Update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const { ...updatedFields } = req.body; // Get updated fields from request body

        // Find and update the user
        const updatedUser = await User.findByIdAndUpdate(
            currentUserId,
            { $set: updatedFields },
            { new: true } // Return the updated user document
        );

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Accept a friend request
export const acceptFriendRequest = async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const { requestId } = req.params;
        const { senderId } = req.body;
        const user = await User.findById(currentUserId);
        const sender = await User.findById(senderId);

        if (!user || !sender) {
            return res.status(404).json({ msg: "User or sender not found" });
        }

        // Check if the request exists
        if (!user.friendRequests.includes(senderId)) {
            return res.status(400).json({ msg: "Friend request not found" });
        }

        // Remove the request from the user's friendRequests array
        user.friendRequests = user.friendRequests.filter((id) => !id.equals(requestId));

        // Add the sender to the user's friendList
        user.friendList.push(senderId);

        // Add the user to the sender's friendList
        sender.friendList.push(currentUserId);

        await user.save();
        await sender.save();

        // Create a notification for the sender
        await createNotification(
            senderId,
            currentUserId,
            "friendRequestAccepted",
            `${user.username} (${user.displayName}) accepted your friend request!`
        );

        res.status(200).json({ msg: "Friend request accepted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Deny a friend request
export const denyFriendRequest = async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const { requestId } = req.params;
        const { senderId } = req.body;
        const user = await User.findById(currentUserId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Check if the request exists
        if (!user.friendRequests.includes(senderId)) {
            return res.status(400).json({ msg: "Friend request not found" });
        }

        // Remove the request from the user's friendRequests array
        user.friendRequests = user.friendRequests.filter((id) => !id.equals(requestId));

        await user.save();

        // Create a notification for the sender
        await createNotification(
            senderId,
            currentUserId,
            "friendRequestDenied",
            `${user.username} (${user.displayName}) denied your friend request.`
        );

        res.status(200).json({ msg: "Friend request denied successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Suspend a user (siteAdmin)
export const suspendUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find and update the user's suspension status
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { isSuspended: true },
            { new: true }   // Return the updated user document
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({ msg: 'User suspended successfully', user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

// Resume a user (siteAdmin)
export const resumeUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find and update the user's suspension status
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { isSuspended: false },
            { new: true } // Return the updated user document
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({ msg: "User resumed successfully", user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* DELETE */
// Remove a friend
export const removeFriend = async (req, res) => {
    try {
        const currentUserId = req.session.userId;
        const { friendId } = req.params;
        const user = await User.findById(currentUserId);
        const friend = await User.findById(friendId);

        // Check if user or friend exits
        if (!user || !friend) {
            return res.status(404).json({
                msg: "User or friend not found"
            });
        }

        if (user.friendList.includes(friendId) && friend.friendList.includes(currentUserId)) {
            // Remove the friend from the user's friendList
            user.friendList = user.friendList.filter((id) => !id.equals(friendId));
            // Remove the user from the friend's friendlist
            friend.friendList = friend.friendList.filter((id) => !id.equals(currentUserId));

            await user.save();
            await friend.save();

            // Re-fetch user's friends after the update
            const updatedUser = await User.findById(currentUserId).populate("friendList");
            const formattedFriends = updatedUser.friendList.map(
                ({ _id, username, displayName, picturePath }) => {
                    return { _id, username, displayName, picturePath };
                }
            );

            // Create a notification for the removed friend
            await createNotification(
                friendId,
                currentUserId,
                "friendRemoved",
                `${user.username} (${user.displayName}) has unfriend you!`
            );

            res.status(200).json(formattedFriends);
        } else {
            // Can't remove if they are not user's friend
            return res.status(400).json({ msg: "You are not friends with this user" });
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};