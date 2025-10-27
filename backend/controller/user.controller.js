import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSaveInCookies from "../jwt/token.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (
      typeof username !== "string" ||
      username.length < 3 ||
      username.length > 30
    ) {
      return res
        .status(400)
        .json({ message: "Username must be between 3 and 30 characters long" });
    }

    if (
      typeof email !== "string" ||
      email.length < 5 ||
      !email.includes("@") ||
      !email.includes(".")
    ) {
      return res.status(400).json({ message: "Email must be valid" });
    }

    if (
      typeof password !== "string" ||
      password.length < 6 ||
      password.length > 100
    ) {
      return res
        .status(400)
        .json({ message: "Password must be between 6 and 100 characters" });
    }

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    if (newUser) {
      const token = await generateTokenAndSaveInCookies(newUser._id, res);
      return res
        .status(201)
        .json({ message: "User registered successfully", newUser, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred while registering user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If login is successful, you might want to remove password field
    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;
    const token = await generateTokenAndSaveInCookies(user._id, res);
    res.status(200).json({
      message: "User logged in successfully",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred while logging in user" });
  }
};

const logoutUser = (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred while logging out user" });
  }
};

export { registerUser, loginUser, logoutUser };
