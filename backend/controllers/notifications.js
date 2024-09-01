import Notification from "../models/Notification.js";

/* CREATE */
// Create a notification and send to the recipient
export const createNotification = async (
    recipientId,
    senderId,
    notiType,
    notiDescription
) => {
    try {
        const allowedTypes = [
            "friendRequest",
            "friendRequestAccepted",
            "friendRequestDenied",
            "friendRemoved",
            "addedComment",
            "addedReaction",
            "groupCreationApproval",
            "groupCreationApproved",
            "groupCreationDenied",
            "groupMemberRequest",
            "groupMemberAccepted",
            "groupMemberDenied",
            "groupMemberRemoved"
        ];

        if (!allowedTypes.includes(notiType)) {
            return res.status(400).json({ message: "Invalid notification type" });
        }

        const newNotification = new Notification({
            recipientId,
            senderId,
            notiType,
            notiDescription,
        });

        await newNotification.save();
        console.log("Notification created:", newNotification);  // For testing only
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.error("Error creating notification:", err); // For testing only
        throw err;

    }
};

/* READ */
// Get all notifications for a user
export const getNotifications = async (req, res) => {
    try {
        const userId = req.session.userId;  // Get the authenticated user's ID

        const notifications = await Notification.find({ recipientId: userId })
            .populate("senderId", "username displayName picturePath")
            .sort({ createdAt: -1 });

        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};