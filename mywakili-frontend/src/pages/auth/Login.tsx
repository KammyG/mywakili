import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  async function submit(e: any) {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login/", { email, password });
      // save token
      localStorage.setItem("token", res.data.access);
      nav("/");
    } catch (err) {
      alert("Login failed (this is stubbed in dev).");
    }
  }
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Sign In</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full p-2 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full p-2 border rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full py-2 rounded bg-blue-700 text-white">Sign In</button>
      </form>
    </div>
  );
}
