// Comment.js
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
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
        commentHistory:
            [{
                commentMessage: String,
                timestamp:
                {
                    type: Date,
                    default: Date.now
                },
            }],
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;