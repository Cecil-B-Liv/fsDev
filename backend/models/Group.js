import mongoose from "mongoose";

const groupSchema = mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true
        },
        description: String,
        groupAdminId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        groupMemberList:
            [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }],
        groupVisibility:
        {
            type: String,
            enum: ["public", "private"],
            default: "public"
        },
        pendingRequests:
            [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }],
        isApproved:
        {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

export default Group;