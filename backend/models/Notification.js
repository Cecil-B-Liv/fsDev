import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
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
        notiType:
        {
            type: String,
            enum: [
                "friendRequest",
                "friendRequestAccepted",
                "comment",
                "reaction",
                "groupCreationApproval",
                "groupMemberRequest"
            ],
            required: true
        },
        notiDescription: String,
    },
    { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;