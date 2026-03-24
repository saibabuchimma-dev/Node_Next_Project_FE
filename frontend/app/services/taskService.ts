import API from "../utils/axiosInstance";

export const getTasks = async () => {
  const res = await API.get("/tasks");
  return res.data;
};

export const createTask = async (title: string) => {
  const res = await API.post("/tasks", { title });
  return res.data;
};

export const deleteTask = async (id: number) => {
  const res = await API.delete(`/tasks/${id}`);
  return res.data;
};

export const toggleTask = async (id: number) => {
  const res = await API.patch(`/tasks/${id}`);
  return res.data;
};

export const updateTask = async (id: number, title: string) => {
  const res = await API.put(`/tasks/${id}`, { title });
  return res.data;
};
