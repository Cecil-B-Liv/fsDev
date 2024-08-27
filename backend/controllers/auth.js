import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

/* REGISTER */
export const register = async (req, res) => {
    try {
        const {
            userName,
            displayName,
            email,
            telephone,
            password,
            postList,
            friendList,
            groupSelf,
            picturePath,
            role
        } = req.body;

        // Encrypt password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Save new registered user
        const newUser = new User({
            userName,
            displayName,
            email,
            telephone,
            password: passwordHash, // Save encrypted password
            postList,
            friendList,
            groupSelf,
            picturePath,
            role
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* LOGIN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user's email from MongoDB
        const user = await User.findOne({ email: email });
        // If no matched email in MongoDB
        if (!user) return res.status(400).json({ msg: "User does not exist." });

        // Compare user's hashed password from MongoDB
        const isMatch = await bcrypt.compare(password, user.password);
        // If password is not matched
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

        // Generate JWT token for user authentication
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // Remove password from user object before sending to client
        delete user.password;

        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};