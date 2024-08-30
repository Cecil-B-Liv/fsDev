import Notification from "../models/Notification.js";
import User from "../models/User.js";

/* CREATE */
// Create a notification
export const createNotification = async (req, res) => {
    try {
        const {
            recipientId,
            senderId,
            notiType,
            notiDescription
        } = req.body;

        const newNotification = new Notification({
            recipientId,
            senderId,
            notiType,
            notiDescription,
            isRead: false,
        });

        // You can potentially emit a real-time notification here using Socket.IO or other mechanisms
        // Haven't decided what method to use for real-time notification

        await newNotification.save();

        res.status(201).json(newNotification);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

/* READ */
// Get unread notifications for a user
export const getUnreadNotifications = async (req, res) => {
    try {
        const userId = req.session.userId; // Get the authenticated user's ID

        const notifications = await Notification.find({
            recipientId: userId,
            isRead: false,
        })
            .populate("senderId", "username displayName picturePath")
            .sort({ createdAt: -1 });

        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* UPDATE */
// Mark a notification as read
export const markNotificationAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const updatedNotification = await Notification.findByIdAndUpdate(
            notificationId, { isRead: true }, { new: true }
        );

        if (!updatedNotification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.status(200).json(updatedNotification);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};