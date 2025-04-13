// src/components/BubbleBackground.jsx
import React from "react";
import "./BubbleBackground.css";

const BubbleBackground = () => {
  return (
    <div className="bubble-background">
      {Array.from({ length: 30 }).map((_, i) => (
        <div className="bubble" key={i}></div>
      ))}
    </div>
  );
};

export default BubbleBackground;
