import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username:
        {
            type: String,
            required: true
        },
        displayName:
        {
            type: String,
            required: true
        },
        email:
        {
            type: String,
            required: true,
            unique: true
        },
        telephone:
        {
            type: String,
            required: true
        },
        password:
        {
            type: String,
            required: true,
            min: 5,
        },
        friendList:
            [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }],
        groupList:
            [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Group",
            }],
        picturePath:
        {
            type: String,
            default: ""
        },
        userRole:
        {
            type: String,
            enum: ["user", "groupAdmin", "siteAdmin"],
            default: "user"
        },
        friendRequests:
            [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }],
        groupRequests:
            [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Group",
            }],
        isSuspended:
        {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;