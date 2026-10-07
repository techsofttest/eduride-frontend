"use client";

import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, className = "" }) => {
  return (
    <div className={`inline-flex items-center gap-2 text-[14px] font-bold uppercase tracking-wider text-[#d91b48] mb-3 ${className}`}>
      <span className="w-4 h-0.5 bg-[#d91b48]"></span>
      {children}
    </div>
  );
};
