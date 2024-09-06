import express from "express";
import { searchUsersAndGroups } from "../controllers/search.js";
import { validateSearchQuery } from "../middlewares/validate.js"
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

/* READ */
router.get("/search",
    isAuthenticated,
    validateSearchQuery,    // Add validation middleware
    searchUsersAndGroups);    // For searching all users and approved groups

export default router;