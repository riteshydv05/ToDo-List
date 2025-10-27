import mongoose from 'mongoose'

// 📝 Define Todo Schema
const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Todo text is required! ✍️"],
    trim: true,
    maxlength: [200, "Todo text can't exceed 200 characters 🚫"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true,
})

const Todo = mongoose.model('Todo', todoSchema)
export default Todo
