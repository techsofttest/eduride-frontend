"use client";

import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "dark" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "px-5 py-2 text-[14px] rounded-full",
    md: "px-6 py-2.5 text-[14px] rounded-full",
    lg: "px-8 py-4 text-[15px] rounded-2xl",
  };

  const variantStyles = {
    primary: "bg-[#ff3b68] text-white hover:bg-[#e02e58]",
    dark: "bg-[#0f172a] text-white hover:bg-slate-800",
    outline: "border border-slate-500 bg-transparent text-white hover:bg-white/10",
    ghost: "text-slate-700 hover:text-gray-900 hover:bg-slate-100",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
