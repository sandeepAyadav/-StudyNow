


import jwt from "jsonwebtoken"; 
import { User } from "../model/authSchema.js";

export const authware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization header not found or invalid format"
            });
        }

        const token = authHeader.split(" ")[1];
        
        
        const decode = jwt.verify(token, process.env.SECRETKEY);
        
        
        const user = await User.findById(decode.userId).select("-password");
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found in database with this token."
            });
        }

        req.user = user; 
        next();
    } catch (error) {
        console.log("Auth Middleware Error Details:", error); 
        
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error in auth middleware"
        });
    }
};