import React from "react";
import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <div className="fixed top-4 left-6 z-10">
      <img src={logo} alt="ZeroWaste Logo" className="w-36 h-auto" />
    </div>
  );
};

export default Logo;
