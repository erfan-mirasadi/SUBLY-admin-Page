import React from "react";

export function Spinner({ size = "medium", className = "" }) {
  let dimension = 48;
  if (size === "small") dimension = 24;
  if (size === "large") dimension = 72;
  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: dimension, height: dimension }}
      role="status"
      aria-label="در حال بارگذاری"
    >
      <svg
        width={dimension}
        height={dimension}
        viewBox={`0 0 ${dimension} ${dimension}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin"
      >
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={dimension / 2 - 6}
          stroke="url(#spinner-gradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={Math.PI * (dimension - 12) * 0.7}
          strokeDashoffset={Math.PI * (dimension - 12) * 0.15}
        />
        <defs>
          <linearGradient
            id="spinner-gradient"
            x1="0"
            y1="0"
            x2={dimension}
            y2={dimension}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3b82f6" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="#60a5fa" stopOpacity="0.5" />
            <stop offset="1" stopColor="#3b82f6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}
