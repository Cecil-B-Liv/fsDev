import express from "express";
import { search } from "../controllers/search.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

/* READ */
router.get("/search", isAuthenticated, search);

export default router;