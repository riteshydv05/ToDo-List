import jwt from 'jsonwebtoken'
import User from '../model/user.model.js';

const generateTokenAndSaveInCookies = async (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  
  // Use secure cookies in production
  const isProduction = process.env.NODE_ENV === 'production';
  
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction, // true in production (HTTPS), false in development
    sameSite: isProduction ? "none" : "lax", // 'none' for cross-site in production
    path: "/",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
    
  await User.findByIdAndUpdate(userId, { token });
  
  return token;
}

export default generateTokenAndSaveInCookies