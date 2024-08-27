import mongoose from "mongoose";

const userIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
];

export const users = [
    {
        _id: userIds[0],
        userName: "test",
        displayName: "me",
        email: "aaaaaaa@gmail.com",
        telephone: "0987654321",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p11.jpeg",
        friendList: [],
        groupList: [],
        userRole: "user",
        createdAt: 1115211422,
        updatedAt: 1115211422,
        __v: 0,
    },
    {
        _id: userIds[1],
        userName: "Steve",
        displayName: "Ralph",
        email: "thataaa@gmail.com",
        telephone: "0987654321",
        password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p3.jpeg",
        friendList: [],
        groupList: [],
        userRole: "user",
        createdAt: 1595589072,
        updatedAt: 1595589072,
        __v: 0,
    },
    {
        _id: userIds[2],
        userName: "Some",
        displayName: "Guy",
        email: "someguy@gmail.com",
        telephone: "0987654321",
        password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
        picturePath: "p4.jpeg",
        friendList: [],
        groupList: [],
        userRole: "user",
        createdAt: 1288090662,
        updatedAt: 1288090662,
        __v: 0,
    },
    {
        _id: userIds[3],
        userName: "Whatcha",
        displayName: "Doing",
        email: "whatchadoing@gmail.com",
        telephone: "0987654321",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p6.jpeg",
        friendList: [],
        groupList: [],
        userRole: "user",
        createdAt: 1219214568,
        updatedAt: 1219214568,
        __v: 0,
    },
    {
        _id: userIds[4],
        userName: "Jane",
        displayName: "Doe",
        email: "janedoe@gmail.com",
        telephone: "0987654321",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p5.jpeg",
        friendList: [],
        groupList: [],
        userRole: "user",
        createdAt: 1493463661,
        updatedAt: 1493463661,
        __v: 0,
    },
    {
        _id: userIds[5],
        userName: "Harvey",
        displayName: "Dunn",
        email: "harveydunn@gmail.com",
        telephone: "0987654321",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p7.jpeg",
        friendList: [],
        groupList: [],
        userRole: "user",
        createdAt: 1381326073,
        updatedAt: 1381326073,
        __v: 0,
    },
    {
        _id: userIds[6],
        userName: "Carly",
        displayName: "Vowel",
        email: "carlyvowel@gmail.com",
        telephone: "0987654321",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p8.jpeg",
        friendList: [],
        groupList: [],
        userRole: "user",
        createdAt: 1714704324,
        updatedAt: 1642716557,
        __v: 0,
    },
    {
        _id: userIds[7],
        userName: "Jessica",
        displayName: "Dunn",
        email: "jessicadunn@gmail.com",
        telephone: "0987654321",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p9.jpeg",
        friendList: [],
        groupList: [],
        userRole: "user",
        createdAt: 1369908044,
        updatedAt: 1359322268,
        __v: 0,
    },
];

export const posts = [
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[1],
        postOwnerName: "Steve",
        postOwnerDisplayName: "Ralph",
        postDescription: "Some really long random description",
        postPicturePath: "post1.jpeg",
        ownerPicturePath: "p3.jpeg",
        postReaction: new Map([
            // ADD REACTIONS
        ]),
        postComments: [
            // ADD COMMENTS
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[3],
        postOwnerName: "Whatcha",
        postOwnerDisplayName: "Doing",
        postDescription:
            "Another really long random description. This one is longer than the previous one.",
        postPicturePath: "post2.jpeg",
        ownerPicturePath: "p6.jpeg",
        postReaction: new Map([
            // ADD REACTIONS
        ]),
        postComments: [
            // ADD COMMENTS
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[4],
        postOwnerName: "Jane",
        postOwnerDisplayName: "Doe",
        postDescription:
            "This is the last really long random description. This one is longer than the previous one.",
        postPicturePath: "post3.jpeg",
        ownerPicturePath: "p5.jpeg",
        postReaction: new Map([
            // ADD REACTIONS
        ]),
        postComments: [
            // ADD COMMENTS
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[5],
        postOwnerName: "Harvey",
        postOwnerDisplayName: "Dunn",
        postDescription:
            "This is the last really long random description. This one is longer than the previous one. Man I'm bored. I'm going to keep typing until I run out of things to say.",
        postPicturePath: "post4.jpeg",
        ownerPicturePath: "p7.jpeg",
        postReaction: new Map([
            // ADD REACTIONS
        ]),
        postComments: [
            // ADD COMMENTS
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[6],
        postOwnerName: "Carly",
        postOwnerDisplayName: "Vowel",
        postDescription:
            "Just a short description. I'm tired of typing. I'm going to play video games now.",
        postPicturePath: "post5.jpeg",
        ownerPicturePath: "p8.jpeg",
        postReaction: new Map([
            // ADD REACTIONS
        ]),
        postComments: [
            // ADD COMMENTS
        ],
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[7],
        postOwnerName: "Jessica",
        postOwnerDisplayName: "Dunn",
        postDescription:
            "For the last time, I'm going to play video games now. I'm tired of typing. I'm going to play video games now.",
        postPicturePath: "post6.jpeg",
        ownerPicturePath: "p9.jpeg",
        postReaction: new Map([
            // ADD REACTIONS
        ]),
        postComments: [
            // ADD COMMENTS
        ],
    },
];