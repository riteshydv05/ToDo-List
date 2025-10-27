import Todo from "../model/todo.model.js";

// 🚀 Create a new Todo
const createTodo = async (req, res) => {
  try {
    const { text, completed = false, priority = "low" } = req.body;
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ message: "Todo text is required! ✍️" });
    }
    
    // Add the logged-in user's ID to the todo
    const todo = new Todo({ 
      text: text.trim(), 
      completed, 
      priority,
      user: req.user._id  // Associate todo with logged-in user
    });
    const newTodo = await todo.save();
    res.status(201).json({
      message: "Todo created successfully! 🎉",
      todo: newTodo
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create todo. 😞",
      error: error.message
    });
  }
};

// 🫡 Getting all todos for the logged-in user
const getTodos = async (req, res) => {
  try {
    // Only fetch todos that belong to the logged-in user
    const todo = await Todo.find({ user: req.user._id });
    res.status(200).json({
      message: "Todos fetched successfully! 🎉",
      todo
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch todos. 😞",
      error: error.message
    });
  }
};


// Update the todo (only if it belongs to the logged-in user)
const updateTodo = async (req, res) => {
  try {
    // Find todo that belongs to the logged-in user
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found or you don't have permission to update it. 😞"
      });
    }
    
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      message: "Todo updated successfully! 🎉",
      todo: updatedTodo
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update todo. 😞",
      error: error.message
    });
  }
}

// Delete the todo (only if it belongs to the logged-in user)
const deleteTodo = async (req, res) => { 
  try {
    // Find and delete todo only if it belongs to the logged-in user
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    
    if(!todo) {
      return res.status(404).json({
        message: "Todo not found or you don't have permission to delete it. 😞"
      }); 
    }
    
    res.status(200).json({
      message: "Todo deleted successfully! 🎉",
      todo
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete todo. 😞",
      error: error.message
    });
  }
}




export { createTodo, getTodos, updateTodo, deleteTodo};
