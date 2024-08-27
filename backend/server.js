import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import http from "http";
import cookieparser from 'cookie-parser';   // Dont know if will use

// Import routes and controllers
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import groupRoutes from "./routes/groups.js";
import notificationRoutes from "./routes/notifications.js";

import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import { verifyToken } from './controllers/auth.js';


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

app.use(cookieparser());

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

/* ROUTES WITH FILE UPLOAD*/
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/groups", groupRoutes);
app.use("/notifications", notificationRoutes);

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
            console.log(`Server is running at http://localhost:${port}`);   // Start server
        })
    })
    .catch((error) => {
        console.log(`Error connecting to MongoDB: ${error.message}`);
    });

/* NOTIFICATION SYSTEM (Example with Socket.IO) */
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Adjust origin as needed
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle socket events for real-time notifications
    socket.on("sendNotification", (data) => {
        // ... logic to send notification to specific user or group
    });

    // ... other socket event handlers
});

/* ERROR HANDLING MIDDLEWARE */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});