import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        postId: {
            type: String,
            required: true,
        },
        commentOwnerName: {
            type: String,
            required: true,
        },
        ownerPicturePath: String,
        commentDescription: String,
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;