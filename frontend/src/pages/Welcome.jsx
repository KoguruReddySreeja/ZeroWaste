import React from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/banner.png";

const Welcome = () => {
  return (
    <div className="bg-[#fdfaf6] text-[#333] font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-white shadow-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-[#4CAF50]">ZeroWaste</div>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 border border-[#4CAF50] text-[#4CAF50] rounded-xl hover:bg-[#4CAF50] hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-[#4CAF50] text-white rounded-xl hover:bg-[#43a047] transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section with Local Background Image */}
      <section
        className="relative bg-cover bg-center text-white px-10 py-32"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-2xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Rescuing Surplus Food. Feeding Lives. Reducing Waste.
          </h1>
          <p className="text-lg text-white">
            ZeroWaste is an AI-powered platform that connects food donors with nearby NGOs, shelters, and volunteers. Powered by smart geolocation, we rescue surplus food and deliver it to those who need it most.
          </p>
          <div className="space-x-4">
            <Link to="/signup" className="px-6 py-3 bg-[#4CAF50] text-white rounded-xl hover:bg-[#43a047] transition">
              Become a Donor
            </Link>
            <Link to="/signup" className="px-6 py-3 border border-white text-white rounded-xl hover:bg-white hover:text-[#4CAF50] transition">
              Need Food? Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-[#e0e0e0] text-center">
        <h2 className="text-3xl font-extrabold text-[#4CAF50] mb-10">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-6 md:px-20">
          {[
            { icon: "🍱", label: "Meals Rescued", value: "18,420" },
            { icon: "🧍‍♀️", label: "People Fed", value: "12,370" },
            { icon: "🌍", label: "Food Waste Prevented (Kg)", value: "6,920" },
            { icon: "🏥", label: "Partner NGOs", value: "210+" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl mb-2">{item.icon}</div>
              <h3 className="text-xl font-semibold text-[#4CAF50]">{item.value}</h3>
              <p className="text-[#555]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 md:px-20 bg-[#fdfaf6]">
        <h2 className="text-3xl font-extrabold text-center text-[#4CAF50] mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Donor Steps */}
          <div>
            <h3 className="text-2xl font-bold text-[#333] mb-4">For Donors</h3>
            <ul className="space-y-4 text-[#555] list-disc list-inside">
              <li>Post Surplus Food – Add type, quantity, location</li>
              <li>Get Matched Instantly – AI connects to nearby NGO</li>
              <li>Pickup Happens – Volunteer or NGO collects</li>
              <li>Receive Feedback – Real-time delivery confirmation</li>
            </ul>
          </div>
          {/* Receiver Steps */}
          <div>
            <h3 className="text-2xl font-bold text-[#333] mb-4">For Receivers</h3>
            <ul className="space-y-4 text-[#555] list-disc list-inside">
              <li>Browse Nearby Food – Map or List view</li>
              <li>Request Pickup – Real-time pickup options</li>
              <li>Track and Confirm – Timeline & status updates</li>
              <li>Share Feedback – Rate donor & mark as delivered</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#dcdcdc] px-6 md:px-20">
        <h2 className="text-3xl font-extrabold text-center text-[#4CAF50] mb-10">Stories of Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md">
              <img src="https://via.placeholder.com/300x200" alt="Person" className="rounded-md mb-4" />
              <p className="italic text-[#555] mb-2">
                “ZeroWaste helps us feed 300 kids daily without stress.”
              </p>
              <h4 className="font-bold text-[#333]">Rajesh, NGO Partner</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-16 bg-[#579540] text-white text-center">
        <h2 className="text-3xl font-semibold mb-4">Join the movement. Be a hero in someone’s day.</h2>
        <div className="space-x-4">
          <Link to="/signup" className="px-6 py-3 bg-white text-[#4CAF50] font-semibold rounded-xl hover:bg-[#f5f5f5] transition">
            Get Started
          </Link>
          <a href="#how-it-works" className="px-6 py-3 border border-white rounded-xl hover:bg-white hover:text-[#4CAF50] transition">
            Learn More
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#333] text-white py-8 px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2025 ZeroWaste. All rights reserved.</p>
          </div>
          <div className="space-x-4">
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Contact</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
