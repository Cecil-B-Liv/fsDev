import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({
    userId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type:
    {
        type: String,
        enum: ["like", "love", "haha", "angry"],
        required: true
    }
});

// add post history description[] (not a priority)
const postSchema = mongoose.Schema(
    {
        userId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        groupId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',

        },
        postVisibility:
        {
            type: String,
            enum: ["public", "friends", "group"],
            default: "public",
        },
        postDescription: String,
        postPicturePath: String,
        postReaction: [reactionSchema],
        postComments:
            [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }],
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;