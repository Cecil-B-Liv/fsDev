import User from "../models/User.js";
import Group from "../models/Group.js";

/* User Authentication */
export const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        // User is authenticated, proceed to the next handler
        next();
    } else {
        // User is not authenticated, send an unauthorized response
        res.status(401).json({ msg: "Unauthorized" });
    }
};

/* Group Admin Authorization */
export const isGroupAdmin = async (req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const user = await User.findById(req.session.userId);

        if (!user || user.userRole !== "groupAdmin") {
            return res
                .status(403)
                .json({ msg: "Forbidden - Group Admin access required" });
        }

        // Fetch and attach the user object (Optional)
        req.user = user;

        // Check if the user is the admin of the specific group
        if (req.params.groupId) {
            try {
                const group = await Group.findById(req.params.groupId);

                if (!group || group.groupAdminId.toString() !== req.session.userId) {
                    return res.status(403).json({ msg: "Forbidden - Not the group admin" });
                }
            } catch (error) {
                console.error(error);
                return res.status(500).json({ msg: "Server error" });
            }
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

/* Site Admin Authentication */
export const isSiteAdmin = async (req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const user = await User.findById(req.session.userId);

        if (!user || user.userRole !== "siteAdmin") {
            return res
                .status(403)
                .json({ msg: "Forbidden - Site Admin access required" });
        }

        // Fetch and attach the user object (Optional)
        req.user = user;

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};