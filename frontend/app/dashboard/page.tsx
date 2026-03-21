"use client";

import { useEffect, useState } from "react";
import { createTask, getTasks } from "../services/taskService";

const Dashboard = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const addTask = async () => {
    await createTask(title);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div className="p-5">
      <h1 className="text-xl mb-4">Dashboard</h1>

      <input
        className="border p-2 mr-2"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2" onClick={addTask}>
        Add
      </button>

      <ul className="mt-5">
        {tasks.map((task) => (
          <li key={task.id} className="border p-2 mt-2">
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Dashboard;
