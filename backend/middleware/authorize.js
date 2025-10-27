import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const authenticate = async (req, res, next) => {
    // Fixed: Use 'token' instead of 'Cookie_1'
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided. Please login." });
    }

    try {
        // Fixed: Use JWT_SECRET_KEY to match token generation
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    next();
}

export default authenticate;