import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        postOwnerName: {
            type: String,
            required: true,
        },
        postOwnerDisplayName: {
            type: String,
            required: true,
        },
        ownerPicturePath: String,
        postVisibility: {
            type: String,
            enum: ["public", "friends"],
            default: "public",
        },
        postDescription: String,
        postPicturePath: String,
        postReaction: {
            type: Map,
            of: Boolean,
        },
        postComments: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;