import bcrypt from 'bcrypt';
import User from '../models/User.js';

/* REGISTER */
export const register = async (req, res) => {
    try {
        const {
            username,
            displayName,
            email,
            telephone,
            password,
            userBio,
        } = req.body;

        // Extract filename from uploaded file to the picturePath (if available)
        const picturePath = req.files && req.files['picturePath']
            ? req.files['picturePath'][0].filename
            : "/assets/default_avatar.jpg"; // Default picture if no upload

        // Check if user with the same email, username, or displayName already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }, { displayName }] });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists." });
        }

        // Encrypt password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Save new registered user
        const newUser = new User({
            username,
            displayName,
            email,
            telephone,
            password: passwordHash, // Save encrypted password
            userBio,
            picturePath,
        });
        const savedUser = await newUser.save();

        res.status(201).json({ msg: 'User registered successfully', savedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* LOGIN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ msg: "User does not exist." });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

        // Check if the user is suspended
        if (user.isSuspended) {
            return res.status(403).json({ msg: "Your account is currently suspended. Please contact the site admin." });
        }

        // Set userId in the session
        req.session.userId = user._id;

        // Remove password from user object before sending to client
        delete user.password;

        res.status(200).json({ msg: "Login successful", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* LOGOUT */
export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ msg: "Could not log out, please try again." });
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).json({ msg: "Logged out successfully." });
    });
};