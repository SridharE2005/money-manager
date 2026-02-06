import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      nav("/dashboard");
    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

      <div className="bg-slate-800/80 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-[380px]">

        {/* Logo / Title */}
        <h1 className="text-3xl font-bold text-center mb-2">
          💰 Money Manager
        </h1>

        <p className="text-center text-gray-400 mb-6">
          Manage your finances smartly
        </p>

        {/* Email */}
        <div className="mb-4">
          <input
            className="input"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <input
            className="input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          className="btn mt-2"
          onClick={login}
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-gray-300">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}
