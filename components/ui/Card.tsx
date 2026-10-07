"use client";

import React from "react";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`rounded-3xl bg-white p-6 border border-slate-100 ${className}`}>
      {children}
    </div>
  );
};
