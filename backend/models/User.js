import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        userName:
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
        {
            type: Array,
            default: []
        },
        groupList:
        {
            type: Array,
            default: []
        },
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
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;