import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const register = async () => {
    try {
      await API.post("/auth/register", { name, email, password });
      nav("/");
    } catch {
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

      <div className="bg-slate-800/80 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-[380px]">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-400 mb-6">
          Start managing your money today
        </p>

        {/* Name */}
        <input
          className="input mb-4"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          className="input mb-4"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          className="input mb-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          className="btn mt-2"
          onClick={register}
        >
          Register
        </button>

        {/* Footer */}
        <p className="text-center mt-6 text-sm text-gray-300">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}
