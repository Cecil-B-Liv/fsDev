import express from "express";
import { login, logout, register } from "../controllers/auth.js";
import {
    validateLogin,
    validateRegister
} from "../middlewares/validate.js"
import { uploadUserPicture } from "../middlewares/upload.js";

const router = express.Router();

// Handle user registration with picture upload
router.post("/register",
    uploadUserPicture,      // Add upload middleware
    validateRegister,       // Add validation middleware
    register
);

// Handle user login
router.post("/login",
    validateLogin,      // Add validation middleware
    login);

// Handle user logout
router.post("/logout", logout);

export default router;