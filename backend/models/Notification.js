import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
    {
        recipientId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        senderId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        type:
        {
            type: String,
            enum: ["friendRequest",
                "friendRequestAccepted",
                "comment",
                "reaction",
                "groupCreationApproval",
                "groupMemberRequest"],
            required: true
        },
        notiDescription: String,
        isRead:
        {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;