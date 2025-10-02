import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { updateUserStats } from "../configs/userCron.js";

// Generate JWT
function generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
    });
}

// Send JWT via cookie
function sendToken(res, token) {
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // must be true in prod
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
}

export async function signup(req, res) {
    try {
        const { name, email, password, role, leetcode, gfg, github } = req.body;
        if (!name || !email || !password || !role) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }
        if (role === "student" && (!leetcode || !gfg || !github)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Platform ids required as a student",
                });
        }
        if (password.length < 6) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Password must be at least 6 characters",
                });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res
                .status(400)
                .json({ success: false, message: "Email is not valid" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ success: false, message: "Email already exists" });
        }
        const newUser = await User.create({
            name,
            email,
            password,
            role,
            handles: {
                leetcode,
                gfg,
                github,
            },
        });
        if (newUser.role === "student") {
            updateUserStats(newUser);
        }
        const token = generateToken(newUser._id);
        sendToken(res, token);
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser,
        });
    } catch (error) {
        console.error("Error in signup:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Email and password are required",
                });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid credentials" });
        }
        const token = generateToken(user._id);
        sendToken(res, token);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: user,
        });
    } catch (error) {
        console.error("Error in login:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
export async function logout(req, res) {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/", 
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error("Error in logout:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export async function me(req, res) {
    try {
        const user = await User.findById(req.user.userId).select("-password"); // userId comes from middleware
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Error in me:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}