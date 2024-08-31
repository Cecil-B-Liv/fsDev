import express from "express";
import { getNotifications } from "../controllers/notifications.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

/* READ */
router.get("/", isAuthenticated, getNotifications);

export default router;