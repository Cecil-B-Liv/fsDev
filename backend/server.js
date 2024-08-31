import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import session from "express-session";
import MongoStore from "connect-mongo";

/* IMPORT ROUTES, MIDDLEWARES, CONTROLLERS */
import authRoutes from "./routers/auth.js";
import userRoutes from "./routers/users.js";
import postRoutes from "./routers/posts.js";
import groupRoutes from "./routers/groups.js";
import notificationRoutes from "./routers/notifications.js";
import { isAuthenticated } from "./middlewares/auth.js";

/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* SESSIONS */
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            collectionName: "sessions",
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // Cookie expire in 1 day
        },
    })
);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", isAuthenticated, userRoutes);
app.use("/posts", isAuthenticated, postRoutes);
app.use("/groups", groupRoutes);
app.use("/notifications", isAuthenticated, notificationRoutes);

/* MONGODB CONNECTION */
const port = process.env.PORT || 6001;
const URL = process.env.MONGODB_URI;
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log(`Connected to MongoDB`);
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        })
    })
    .catch((error) => {
        console.log(`Error connecting to MongoDB: ${error.message}`);
    });

/* ERROR HANDLING MIDDLEWARE */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

/* OFFLINE FUNCTIONALITY */
// Explore and implement strategies for handling offline scenarios (service workers, local storage, etc.)

/* INPUT VALIDATION AND SANITIZATION */
// Implement input validation and sanitization in your controllers to ensure data integrity and security