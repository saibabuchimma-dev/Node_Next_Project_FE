"use client";

import { useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  toggleTask,
  updateTask,
} from "../services/taskService";

const Dashboard = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const addTask = async () => {
    if (!title) return;
    await createTask(title);
    setTitle("");
    fetchTasks();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleToggle = async (id: number) => {
    await toggleTask(id);
    fetchTasks();
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
    <div className="max-w-xl mx-auto p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
          className="bg-red-500 text-white px-3 py-1"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="flex gap-2">
        <input
          className="border p-2 flex-1"
          placeholder="New Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4" onClick={addTask}>
          Add
        </button>
      </div>

    <ul className="mt-5 space-y-2">
  {tasks.map((task) => (
    <li
      key={task.id}
      className="flex justify-between items-center border p-2"
    >
      {editId === task.id ? (
        <>
          <input
            className="border p-1 flex-1"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <button
            className="bg-green-500 text-white px-2"
            onClick={() => handleUpdate(task.id)}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <span
            onClick={() => handleToggle(task.id)}
            className={`cursor-pointer ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </span>

          <button
            className="bg-yellow-500 text-white px-2"
            onClick={() => {
              setEditId(task.id);
              setEditTitle(task.title);
            }}
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(task.id)}
            className="bg-red-500 text-white px-2"
          >
            X
          </button>
        </>
      )}
    </li>
  ))}
</ul>
    </div>
  );
};
export default Dashboard;
