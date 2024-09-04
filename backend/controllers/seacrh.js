import User from "../models/User.js";
import Group from "../models/Group.js";

/* READ */
// Search all users and approved groups
export const search = async (req, res) => {
    try {
        const { q } = req.query;

        // Set a minimum query length
        const minQueryLength = 3;
        if (q.length < minQueryLength) {
            return res.status(200).json({ users: [], groups: [] }); // Return empty arrays for short queries
        }

        // Perform a search on users (username or displayName)
        const users = await User.find({
            $or: [
                { username: { $regex: new RegExp(`\\b${q}\\b`, "i") } },    // Case-insensitive search on username
                { displayName: { $regex: new RegExp(`\\b${q}\\b`, "i") } },     // Case-insensitive search on displayName
            ],
        }).limit(10);

        // Perform a search on approved groups (group name)
        const groups = await Group.find({
            name: { $regex: new RegExp(`\\b${q}\\b`, "i") },    // Case-insensitive search on name
            isApproved: true,
        }).limit(10);

        res.status(200).json({ users, groups });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};