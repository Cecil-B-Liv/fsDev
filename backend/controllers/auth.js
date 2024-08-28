import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

/* REGISTER */
export const register = async (req, res) => {
    try {
        const {
            username,
            displayName,
            email,
            telephone,
            password,
            picturePath,
        } = req.body;

        // Check if user with the same email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({
                msg: "User already exists."
            });
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
            picturePath,
        });
        const savedUser = await newUser.save();
        // Respond with a success message and the saved user data
        res.status(201).json(savedUser);
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
        if (!user) return res.status(400).json({ msg: "User does not exist." });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

        // Set userId, username and userRole in the session
        req.session.userId = user._id;
        req.session.username = user.username;   // Optional
        req.session.userRole = user.userRole;   // Optional

        // Remove password from user object before sending to client
        delete user.password;

        res.status(200).json({ token, user });
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