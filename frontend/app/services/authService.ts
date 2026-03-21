import API from "../utils/axiosInstance";

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await API.post("/users/login", data);
  return res.data;
};

export const registerUser = async (data: any) => {
  const res = await API.post("/users/register", data);
  return res.data;
};
