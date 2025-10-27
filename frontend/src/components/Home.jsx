import React from "react";
import axios from "axios";
import API_URL from "../config";

function Home() {
  const [todos, setTodos] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [newTodo, setNewTodo] = React.useState("");
  const [success, setSuccess] = React.useState("");

  React.useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/todo/fetch`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        setTodos(response.data.todo || []);
        setError(null);
      } catch (error) {
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const todosCreate = async () => {
    try {
      if (!newTodo.trim()) {
        setError("Please enter a task!");
        setTimeout(() => setError(null), 3000);
        return;
      }
      const response = await axios.post(
        `${API_URL}/todo/create`,
        {
          text: newTodo,
          completed: false,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Create response:", response.data);
      const newTodoItem = response.data.todo || response.data;
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
      setSuccess("Task added successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Failed to create todo");
      setTimeout(() => setError(null), 3000);
    }
  };

  const todosStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const response = await axios.put(
        `${API_URL}/todo/update/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        }
      );
      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
      setSuccess("Task updated!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Failed to change todo status");
      setTimeout(() => setError(null), 3000);
    }
  };

  const todosDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/todo/delete/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((t) => t._id !== id));
      setSuccess("Task deleted!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Failed to delete todo");
      setTimeout(() => setError(null), 3000);
    }
  };

  const logoutUser = async () => {
    try {
      await axios.get(
        `${API_URL}/user/logout`,
        {},
        { withCredentials: true }
      );
      setSuccess("Logged out successfully! Redirecting...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error) {
      setError("Failed to logout user");
    }
  };

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-purple-950">
        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.7 + 0.3
              }}
            />
          ))}
        </div>
        
        {/* Large Planet - Cyan */}
        <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-40 h-40 sm:w-52 sm:h-52 lg:w-72 lg:h-72 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-80 blur-sm"></div>
        
        {/* Medium Planet - Purple */}
        <div className="absolute bottom-10 sm:bottom-20 right-1/4 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 opacity-70 blur-sm"></div>
        
        {/* Small Planet - Purple-Pink */}
        <div className="absolute top-1/3 right-5 sm:right-10 lg:right-20 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-purple-300 to-pink-400 opacity-60 blur-sm"></div>
        
        {/* Shooting Stars */}
        <div className="absolute top-1/4 right-1/4 w-1 h-12 sm:h-16 lg:h-20 bg-gradient-to-b from-white to-transparent rotate-45 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-1 h-10 sm:h-12 lg:h-16 bg-gradient-to-b from-white to-transparent rotate-45 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-3xl w-full relative z-10">
        {/* Title Section */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 sm:mb-3 tracking-tight">
            MY TODO LIST 📝
          </h1>
          <p className="text-white text-sm sm:text-base opacity-80">Manage your tasks in space!</p>
        </div>

        {/* Glass Morphism Card */}
        <div className="bg-purple-900 bg-opacity-40 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-purple-500 border-opacity-30">
          {/* Add Todo Input */}
          <div className="flex flex-col sm:flex-row mb-6 gap-3">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  todosCreate();
                }
              }}
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-purple-800 bg-opacity-50 border border-purple-400 border-opacity-30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-white text-sm sm:text-base font-medium placeholder-gray-300"
              placeholder="✨ What needs to be done?"
            />
            <button
              onClick={todosCreate}
              disabled={loading}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-bold rounded-xl sm:rounded-2xl hover:from-cyan-500 hover:via-blue-600 hover:to-purple-700 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <>
                  <span>Add</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500 bg-opacity-90 border-l-4 border-red-700 p-3 sm:p-4 rounded-xl mb-4 animate-fade-in">
              <p className="text-white text-sm sm:text-base font-semibold flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-500 bg-opacity-90 border-l-4 border-green-700 p-3 sm:p-4 rounded-xl mb-4 animate-fade-in">
              <p className="text-white text-sm sm:text-base font-semibold flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {success}
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && !error && !success && (
            <div className="flex justify-center items-center py-8">
              <svg className="animate-spin h-10 w-10 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          )}

          {/* Todo List */}
          {!loading && (
            <div className="space-y-3 mb-6 max-h-64 sm:max-h-96 overflow-y-auto custom-scrollbar">
              {todos.length === 0 ? (
                <div className="text-center py-8 sm:py-12 text-white opacity-80">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-lg sm:text-xl font-bold mb-2">No todos yet! 🌟</p>
                  <p className="text-xs sm:text-sm">Add your first task to begin your journey.</p>
                </div>
              ) : (
                todos.map((todo, index) => (
                  <div
                    key={todo._id || todo.id || index}
                    className="bg-purple-800 bg-opacity-50 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-purple-400 border-opacity-30 transition-all duration-300 hover:bg-opacity-70 animate-fade-in"
                  >
                    <div className="flex items-center justify-between gap-2 sm:gap-4">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${todo.completed ? 'bg-green-400' : 'bg-cyan-400'} animate-pulse`}></div>
                        <span
                          className={`flex-1 text-white text-sm sm:text-base font-medium transition-all duration-300 break-words ${
                            todo.completed ? "line-through opacity-60" : ""
                          }`}
                        >
                          {todo.text}
                        </span>
                      </div>
                      <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                        <button
                          onClick={() => todosStatus(todo._id)}
                          className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-white transition-all duration-300 transform hover:scale-110 ${
                            todo.completed
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                          title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {todo.completed ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            )}
                          </svg>
                        </button>
                        <button
                          className="p-1.5 sm:p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-110"
                          onClick={() => todosDelete(todo._id)}
                          title="Delete task"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Todo Count */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="bg-purple-800 bg-opacity-50 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-purple-400 border-opacity-30">
              <p className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h6a1 1 0 100-2H7zm0 4a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  {remainingTodos} {remainingTodos === 1 ? 'Task' : 'Tasks'} Remaining
                </span>
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logoutUser}
            className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl sm:rounded-2xl hover:from-red-600 hover:to-pink-700 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl flex items-center justify-center gap-2 text-base sm:text-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

        {/* Bottom Text */}
        <div className="mt-6 sm:mt-8 text-center px-4">
          <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-2">
            MANAGE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">COSMIC TASKS!</span> 🚀
          </h2>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(139, 92, 246, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}

export default Home;
