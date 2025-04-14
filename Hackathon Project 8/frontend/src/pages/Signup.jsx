import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BubbleBackground from "../components/BubbleBackground";
import Logo from "../components/Logo";
import { registerUser } from "../api/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [receiverType, setReceiverType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      await registerUser({ name, email, password, role, receiverType });

      if (role === "receiver" && receiverType !== "individual") {
        alert("Your account will be reviewed by an Admin before activation.");
      }

      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      alert("Signup failed. Try again.");
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
          Sign Up for ZeroWaste
        </h2>
        <input type="text" placeholder="Full Name" required className="w-full p-3 border rounded-lg mb-4" />
        <input type="email" placeholder="Email" required className="w-full p-3 border rounded-lg mb-4" />
        <input type="password" placeholder="Password" required className="w-full p-3 border rounded-lg mb-4" />

        <select value={role} onChange={(e) => setRole(e.target.value)} required className="w-full p-3 border rounded-lg mb-4">
          <option value="">Select Role</option>
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

        <button type="submit" className="w-full bg-[#4CAF50] text-white py-3 rounded-lg hover:bg-[#43a047] transition">Sign Up</button>

        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-[#4CAF50] hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
