import Notification from "../models/Notification.js";
import User from "../models/User.js";

/* CREATE */
// Create a notification
export const createNotification = async (recipientId, senderId, notiType, notiDescription) => {
    try {
        const newNotification = new Notification({
            recipientId,
            senderId,
            notiType,
            notiDescription,
            isRead: false
        });
        await newNotification.save();

        // You can potentially emit a real-time notification here using Socket.IO or other mechanisms

        return newNotification;
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

/* READ */

/* UPDATE */

/* DELETE */