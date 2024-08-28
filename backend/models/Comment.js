// Comment.js
import mongoose from "mongoose";

// add string comment history[] (not a priority rn)
const commentSchema = new mongoose.Schema(
    {
        postId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        },
        userId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        commentMessage:
        {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;