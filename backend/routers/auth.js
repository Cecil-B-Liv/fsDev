import express from "express";
import { login, logout, register } from "../controllers/auth.js";
import { uploadUserPicture } from "../middlewares/upload.js";

const router = express.Router();

// Handle user registration with picture upload
router.post("/register",
    uploadUserPicture,      // Add upload middleware
    register
);

// Handle user login
router.post("/login", login);

// Handle user logout
router.post("/logout", logout);

export default router;