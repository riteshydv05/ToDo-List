import jwt from 'jsonwebtoken'
import User from '../model/user.model.js';

const generateTokenAndSaveInCookies = async (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });
    
  await User.findByIdAndUpdate(userId, { token });
  
  return token;
}

export default generateTokenAndSaveInCookies