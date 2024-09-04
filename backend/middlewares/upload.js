import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/assets')); // Store uploaded files in the 'public/assets'
    },
    filename: function (req, file, cb) {
        // Create a unique suffix to the file name to avoid duplicating file name
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Middleware for handling user account with profile picture upload
export const uploadUserPicture = upload.fields([
    { name: "picturePath", maxCount: 1 },
    { name: "username" },
    { name: "displayName" },
    { name: "email" },
    { name: "telephone" },
    { name: "password" },
    { name: "userBio" },
    { name: "userRole" },
]);

// Middleware for handling post with picture upload
export const uploadPostPicture = upload.fields([
    { name: "postPicturePath", maxCount: 1 },
    { name: "userId" },
    { name: "groupId" },
    { name: "postVisibility" },
    { name: "postDescription" },
]);