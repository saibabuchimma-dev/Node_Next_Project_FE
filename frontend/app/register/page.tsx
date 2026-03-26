"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify";

const Register = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await registerUser({
        name,
        email,
        age: Number(age),
        password,
      });
      toast("Registered Successfully 🚀");
      router.push('/login');
    } catch (err: any) {
      toast(err?.response?.data?.message || "Registration failed");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-xl font-bold">Register</h1>
      <input
        className="border p-2"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2"
        placeholder="Age"
        type="number"
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        className="border p-2"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-green-500 text-white p-2" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};
export default Register;
