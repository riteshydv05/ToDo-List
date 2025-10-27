import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todoRoute from "./route/todo.route.js";
import userRoute from "./route/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
// 🌱 Load environment variables
dotenv.config();

// 🚀 Initialize Express app
const app = express();

// Middleware - Parse JSON request bodies
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.urlencoded({ extended: true }));

// 📦 Server and Database configurations
const port = process.env.PORT || 4001;
const DB_URI = process.env.MONGODB_URI;

// 🔗 Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("✅ MongoDB connection established successfully 🟢");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
connectDB();

// App routes
app.use("/todo", todoRoute);
app.use("/user", userRoute);

// 🖥️ Start the server
app.listen(port, () => {
  console.log(`⚡️ Server is running on port ${port}`);
});
