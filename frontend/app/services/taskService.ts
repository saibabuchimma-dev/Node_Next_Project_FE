import API from "../utils/axiosInstance";

export const getTasks = async () => {
  const res = await API.get("/tasks");
  return res.data;
};

export const createTask = async (title: string) => {
  const res = await API.post("/tasks", { title });
  return res.data;
};
