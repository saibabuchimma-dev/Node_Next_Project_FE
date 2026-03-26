"use client";

import { useState } from "react";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      toast.success("Login Successful 🚀");
      window.location.href = "/dashboard";
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-xl font-bold">Login</h1>
      <input
        placeholder="Email"
        className="border p-2"
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        className="border p-2"
        placeholder="Password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button className="bg-blue-500 text-white p-2" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
