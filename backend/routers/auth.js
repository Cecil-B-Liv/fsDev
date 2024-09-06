import express from "express";
import {
    register,
    login,
    checkAuth,
    logout
} from "../controllers/auth.js";
import {
    validateLogin,
    validateRegistration
} from "../middlewares/validate.js"
import { uploadUserPicture } from "../middlewares/upload.js";

const router = express.Router();

// Handle user registration with picture upload
router.post("/register",
    uploadUserPicture,      // Add upload middleware
    validateRegistration,       // Add validation middleware
    register
);

// Handle user login
router.post("/login",
    validateLogin,      // Add validation middleware
    login
);

// Handle user authentication status check
router.get("/check-auth", checkAuth);

// Handle user logout
router.delete("/logout", logout);

export default router;