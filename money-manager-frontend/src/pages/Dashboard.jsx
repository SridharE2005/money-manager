import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {

  const [list, setList] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [division, setDivision] = useState("Personal");

  useEffect(() => {
    API.get("/transactions")
      .then(res => setList(res.data));
  }, []);

  const add = async () => {
    if (!amount || !category) return alert("Fill all fields");

    const res = await API.post("/transactions", {
      amount: Number(amount),
      type,
      category,
      division
    });

    setList([...list, res.data]);
    setAmount("");
    setCategory("");
  };

  const income = list
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = list
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">

      {/* 🔝 NAVBAR */}
      <div className="flex justify-between items-center px-8 py-4 border-b border-slate-700">
        <h1 className="text-2xl font-bold">💰 Money Manager</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* 📦 MAIN CONTENT */}
      <div className="flex-1 p-6 max-w-6xl mx-auto w-full">

        {/* SUMMARY */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-green-600/90 backdrop-blur p-6 rounded-xl shadow-lg">
            <h2 className="text-lg">Total Income</h2>
            <p className="text-3xl font-bold mt-2">₹ {income}</p>
          </div>

          <div className="bg-red-600/90 backdrop-blur p-6 rounded-xl shadow-lg">
            <h2 className="text-lg">Total Expense</h2>
            <p className="text-3xl font-bold mt-2">₹ {expense}</p>
          </div>

          <div className="bg-blue-600/90 backdrop-blur p-6 rounded-xl shadow-lg">
            <h2 className="text-lg">Balance</h2>
            <p className="text-3xl font-bold mt-2">
              ₹ {income - expense}
            </p>
          </div>

        </div>

        {/* ADD TRANSACTION */}
        <div className="bg-slate-800/80 backdrop-blur p-6 rounded-xl shadow-xl mb-8">

          <h2 className="text-xl mb-4 font-semibold">
            ➕ Add Transaction
          </h2>

          <div className="grid md:grid-cols-5 gap-4">

            <select
              className="input"
              value={type}
              onChange={e => setType(e.target.value)}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <input
              className="input"
              placeholder="Amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />

            <input
              className="input"
              placeholder="Category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            />

            <select
              className="input"
              value={division}
              onChange={e => setDivision(e.target.value)}
            >
              <option>Personal</option>
              <option>Office</option>
            </select>

            <button
              onClick={add}
              className="btn"
            >
              Add
            </button>

          </div>
        </div>

        {/* HISTORY */}
        <div className="bg-slate-800/80 backdrop-blur p-6 rounded-xl shadow-xl">

          <h2 className="text-xl mb-4 font-semibold">
            📜 Transaction History
          </h2>

          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">

            {list.length === 0 && (
              <p className="text-gray-400 text-center">
                No transactions yet
              </p>
            )}

            {list.map(t => (
              <div
                key={t._id}
                className="grid grid-cols-4 items-center bg-slate-700 p-3 rounded-lg hover:bg-slate-600 transition"
              >
                <span>{t.category}</span>

                <span className="text-sm text-gray-300">
                  {t.division}
                </span>

                <span
                  className={
                    t.type === "income"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {t.type}
                </span>

                <span className="font-semibold">
                  ₹{t.amount}
                </span>
              </div>
            ))}

          </div>
        </div>

      </div>

      {/* 👣 FOOTER */}
      <footer className="text-center py-4 border-t border-slate-700 text-gray-400">
        © {new Date().getFullYear()} Money Manager App | Built with React, Node & MongoDB
      </footer>

    </div>
  );
}
