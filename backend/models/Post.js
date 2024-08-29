import mongoose from "mongoose";

const ReactionSchema = new mongoose.Schema(
    {
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
    }
);

const PostSchema = new mongoose.Schema(
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
        postReaction: [ReactionSchema],
        postComments:
            [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }],
        postHistory:
            [{
                postDescription: String,
                postPicturePath: String,
                timestamp:
                {
                    type: Date,
                    default: Date.now
                },
            }],
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;