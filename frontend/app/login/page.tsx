"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "../services/authService";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      alert("Login Successful 🚀");
      router.push("/dashboard");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Login Failed");
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
