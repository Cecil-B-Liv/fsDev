import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import http from "http";
import session from "express-session";
import MongoStore from "connect-mongo";

/* IMPORT ROUTES, MIDDLEWARES, CONTROLLERS */
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import groupRoutes from "./routes/groups.js";
import upload from "./middlewares/upload.js";
import { isAuthenticated } from './middlewares/auth.js';
import notificationRoutes from "./routes/notifications.js";

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

        /* CREATE SERVER */
        const server = http.createServer(app);
        // If use Socket.IO for live notification service
        // const io = new Server(server, {
        //     cors: {
        //         origin: "http://localhost:3000", // Adjust origin as needed
        //         methods: ["GET", "POST"],
        //     },
        // });
        // If use Socket.IO for live notification service
        // io.on("connection", (socket) => {
        //     console.log(`User connected: ${socket.id}`);
        //     // Handle socket events for real-time notifications
        //     socket.on("sendNotification", (data) => {
        //         // ... logic to send notification to specific user or group
        //     });
        //     // ... other socket event handlers
        // });

        /* START SERVER */
        server.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.log(`Error connecting to MongoDB: ${error.message}`);
    });

/* NOTIFICATION SYSTEM (Example with Socket.IO) */
// Implement your chosen notification mechanism
// (Socket.IO, polling, SSE) and its logic here

/* ERROR HANDLING MIDDLEWARE */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

/* OFFLINE FUNCTIONALITY */
// Explore and implement strategies for handling offline scenarios (service workers, local storage, etc.)

/* FILE STORAGE AND RETRIEVAL */
// Implement logic in your controllers to handle file storage (local and/or cloud) and retrieval

/* INPUT VALIDATION AND SANITIZATION */
// Implement input validation and sanitization in your controllers to ensure data integrity and security