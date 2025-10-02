import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = { userId: decoded.userId };
        next();
    } catch (err) {
        return res
            .status(401)
            .json({ success: false, message: "Invalid token" });
    }
}