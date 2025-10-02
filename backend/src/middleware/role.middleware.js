import User from "../models/User.js";

/**
 * Role-based access middleware
 * @param {Array<string>} roles - Allowed roles
 */
export function roleMiddleware(roles = []) {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.user.userId).lean();
            if (!user) {
                return res
                    .status(401)
                    .json({ success: false, message: "User not found" });
            }

            if (!roles.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: `Forbidden: Requires role(s): ${roles.join(", ")}`,
                });
            }

            next();
        } catch (error) {
            console.error("Error in roleMiddleware:", error.message);
            return res
                .status(500)
                .json({ success: false, message: "Internal Server Error" });
        }
    };
}
