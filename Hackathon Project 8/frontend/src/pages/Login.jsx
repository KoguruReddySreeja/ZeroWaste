// src/pages/login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BubbleBackground from "../components/BubbleBackground";
import Logo from "../components/Logo";
import { loginUser } from "../api/auth";
import { setToken } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [receiverType, setReceiverType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const { data } = await loginUser({ email, password, role, receiverType });
      setToken(data.token);

      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "donor") navigate("/donor/dashboard");
      else if (role === "receiver") navigate("/receiver/dashboard");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <BubbleBackground />
      <Logo />

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md relative z-10"
      >
        <h2 className="text-2xl font-bold text-[#4CAF50] mb-6 text-center">
          Login to ZeroWaste
        </h2>
        <input type="email" placeholder="Email" required className="w-full p-3 border rounded-lg mb-4" />
        <input type="password" placeholder="Password" required className="w-full p-3 border rounded-lg mb-4" />
        
        <select value={role} onChange={(e) => setRole(e.target.value)} required className="w-full p-3 border rounded-lg mb-4">
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="donor">Donor</option>
          <option value="receiver">Receiver</option>
        </select>

        {role === "receiver" && (
          <select value={receiverType} onChange={(e) => setReceiverType(e.target.value)} required className="w-full p-3 border rounded-lg mb-4">
            <option value="">Select Receiver Type</option>
            <option value="individual">Individual</option>
            <option value="ngo">NGO</option>
            <option value="trust">Trust</option>
          </select>
        )}

        <button type="submit" className="w-full bg-[#4CAF50] text-white py-3 rounded-lg hover:bg-[#43a047] transition">Login</button>

        <p className="text-center mt-4">
          Don't have an account? <Link to="/signup" className="text-[#4CAF50] hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
