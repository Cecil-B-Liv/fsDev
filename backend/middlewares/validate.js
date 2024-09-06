import { body, param, query, validationResult } from "express-validator";
import User from "../models/User.js";

// User Registration Validation
export const validateRegistration = [
    body("username")
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long")
        .isAlphanumeric().withMessage("Username must contain only letters and numbers")
        .custom(async (value) => {
            const existingUser = await User.findOne({ username: value });
            if (existingUser) {
                throw new Error("Username already in use");
            }
        }),

    body("displayName")
        .notEmpty().withMessage("Display name is required")
        .isLength({ min: 3 }).withMessage("Display Name must be at least 3 characters long")
        .trim()
        .escape()
        .custom(async (value) => {
            const existingUser = await User.findOne({ displayName: value });
            if (existingUser) {
                throw new Error("Display Name already in use");
            }
        }),

    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email address")
        .normalizeEmail()
        .custom(async (value) => {
            const existingUser = await User.findOne({ email: value });
            if (existingUser) {
                throw new Error("Email already in use");
            }
        }),

    body("telephone")
        .notEmpty().withMessage("Telephone number is required")
        .isMobilePhone().withMessage("Invalid telephone number")
        .custom(async (value) => {
            const existingUser = await User.findOne({ telephone: value });
            if (existingUser) {
                throw new Error("Telephone already in use");
            }
        }),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),

    body("userBio")
        .optional()
        .isLength({ max: 200 }).withMessage("Bio must be at most 200 characters long")
        .trim()
        .escape(),
];

// User Login Validation
export const validateLogin = [
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email address")
        .normalizeEmail(),

    body("password")
        .notEmpty().withMessage("Password is required"),
];

// Update Profile Validation
export const validateUpdateProfile = [
    body("username")
        .optional()
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long")
        .isAlphanumeric().withMessage("Username must contain only letters and numbers")
        .custom(async (value) => {
            const existingUser = await User.findOne({ username: value });
            if (existingUser) {
                throw new Error("Username already in use");
            }
        }),

    body("displayName")
        .optional()
        .trim()
        .escape()
        .custom(async (value) => {
            const existingUser = await User.findOne({ displayName: value });
            if (existingUser) {
                throw new Error("Display Name already in use");
            }
        }),

    body("email")
        .optional()
        .isEmail().withMessage("Invalid email address")
        .normalizeEmail()
        .custom(async (value) => {
            const existingUser = await User.findOne({ email: value });
            if (existingUser) {
                throw new Error("Email already in use");
            }
        }),

    body("telephone")
        .optional()
        .isMobilePhone().withMessage("Invalid telephone number")
        .custom(async (value) => {
            const existingUser = await User.findOne({ telephone: value });
            if (existingUser) {
                throw new Error("Telephone already in use");
            }
        }),

    body("password")
        .optional()
        .isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),

    body("userBio")
        .optional()
        .trim()
        .escape(),
];

// Send Friend Request Validation
export const validateSendFriendRequest = [
    body("recipientId")
        .notEmpty().withMessage("Friend ID is required")
        .isMongoId().withMessage("Invalid Friend ID"),
];

// Join Group Request Validation
export const validateJoinGroupRequest = [
    body("groupId")
        .notEmpty().withMessage("Group ID is required")
        .isMongoId().withMessage("Invalid Group ID"),
];

// Create Post Validation
export const validateCreatePost = [
    body("postDescription")
        .notEmpty().withMessage("Post description is required")
        .trim()
        .escape(),

    body("postVisibility")
        .isIn(["public", "friends", "group"]).withMessage("Invalid visibility option"),
];

// Update Post Validation
export const validateUpdatePost = [
    body("postDescription")
        .optional()
        .trim()
        .escape(),

    body("postVisibility")
        .optional()
        .isIn(["public", "friends", "group"]).withMessage("Invalid visibility option"),
];

// Create Comment Validation
export const validateCreateComment = [
    param("postId")
        .notEmpty().withMessage("Post ID is required")
        .isMongoId().withMessage("Invalid Post ID"),

    body("commentMessage")
        .notEmpty().withMessage("Comment message is required")
        .trim()
        .escape(),
];

// Update Comment Validation
export const validateUpdateComment = [
    param("postId")
        .notEmpty().withMessage("Post ID is required")
        .isMongoId().withMessage("Invalid Post ID"),

    body("commentMessage")
        .optional()
        .trim()
        .escape(),
];

// Create Group Validation
export const validateCreateGroup = [
    body("name")
        .notEmpty().withMessage("Group name is required")
        .trim()
        .escape()
        .custom(async (value) => {
            const existingGroup = await Group.findOne({ name: value });
            if (existingGroup) {
                throw new Error("Group name already in use");
            }
        }),

    body("description")
        .optional()
        .trim()
        .escape(),

    body("groupVisibility")
        .isIn(["public", "private"]).withMessage("Invalid group visibility option"),
];

// Edit Group Validation
export const validateEditGroup = [
    body("name")
        .optional()
        .trim()
        .escape()
        .custom(async (value) => {
            const existingGroup = await Group.findOne({ name: value });
            if (existingGroup) {
                throw new Error("Group name already in use");
            }
        }),

    body("description")
        .optional()
        .trim()
        .escape(),

    body("groupVisibility")
        .optional()
        .isIn(["public", "private"]).withMessage("Invalid group visibility option"),
];

// All Search Types Validation
export const validateSearchQuery = [
    query("q")
        .notEmpty().withMessage("Search query is required")
        .trim()
        .escape(),
];


// Handle Validation Errors
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};