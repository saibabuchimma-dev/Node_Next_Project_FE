"use client";

import { useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  toggleTask,
  updateTask,
} from "../services/taskService";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!title) return toast.error("Task cannot be empty");
    try {
      await createTask(title);
      toast.success("Task added");
      setTitle("");
      fetchTasks();
    } catch {
      toast.error("Failed to add task");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted");
      fetchTasks();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await toggleTask(id);
      fetchTasks();
    } catch {
      toast.error("Update failed");
    }
  };

  const handleUpdate = async (id: number) => {
    await updateTask(id, editTitle);
    setEditId(null);
    setEditTitle("");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            📝 Task Manager
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <input
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 rounded-lg"
          >
            Add
          </button>
        </div>

        {loading ? (
          <p className="text-center mt-5">Loading...</p>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between bg-gray-50 border rounded-xl p-3 hover:shadow-sm transition"
              >
                {editId === task.id ? (
                  <div className="flex gap-2 w-full">
                    <input
                      className="flex-1 border p-2 rounded-lg"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <button
                      onClick={() => handleUpdate(task.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <span
                      onClick={() => handleToggle(task.id)}
                      className={`flex-1 cursor-pointer text-gray-700 ${
                        task.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {task.title}
                    </span>

                    <div className="flex gap-2 ml-3">
                      <button
                        onClick={() => {
                          setEditId(task.id);
                          setEditTitle(task.title);
                        }}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(task.id)}
                        className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        {tasks.length === 0 && (
          <p className="text-center text-gray-400 mt-6">
            No tasks yet. Add one 🚀
          </p>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
