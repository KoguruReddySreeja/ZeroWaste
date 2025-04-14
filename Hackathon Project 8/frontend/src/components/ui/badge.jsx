import React from "react";
import clsx from "clsx";

const variantStyles = {
  default: "bg-gray-100 text-gray-800",
  secondary: "bg-blue-100 text-blue-800",
  success: "bg-green-100 text-green-800",
  destructive: "bg-red-100 text-red-800",
  warning: "bg-yellow-100 text-yellow-800",
};

export const Badge = ({ children, variant = "default", className = "" }) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
        variantStyles[variant] || variantStyles.default,
        className
      )}
    >
      {children}
    </span>
  );
};
