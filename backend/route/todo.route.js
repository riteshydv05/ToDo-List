import express from "express";
// FIX THIS IMPORT ↓↓↓ Use named imports with curly brackets
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controller/todo.controller.js";
import authenticate from "../middleware/authorize.js";

const router = express.Router();

// All routes require authentication
router.post("/create", authenticate, createTodo);
router.get("/fetch", authenticate, getTodos);
router.put("/update/:id", authenticate, updateTodo);
router.delete("/delete/:id", authenticate, deleteTodo);

export default router;
