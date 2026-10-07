"use client";

import React from "react";

export interface HeaderProps {
  // Add props if needed
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#000000] text-white border-b border-slate-800/80">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <img
            src="/logo/logo2.png"
            alt="EduRide Logo"
            className="h-22 w-auto object-contain group-hover:scale-105 transition-transform"
          />
        </a>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-12 md:flex">
          <a href="/" className="text-[16px] font-medium text-slate-200 hover:text-white transition-colors">
            Home
          </a>
          <a href="/find-tutor" className="text-[16px] font-medium text-slate-200 hover:text-white transition-colors">
            Find a Tutor
          </a>
          <a href="/find-student" className="text-[16px] font-medium text-slate-200 hover:text-white transition-colors">
            Find a Student
          </a>
          <a href="/about" className="text-[16px] font-medium text-slate-200 hover:text-white transition-colors">
            About Us
          </a>
        </nav>

        {/* Header Action CTA */}
        <div className="flex items-center gap-3">
          <a
            href="/post-ad"
            className="rounded-xl bg-[#2563eb] px-6 py-2.5 text-[14px] font-semibold text-white transition-all hover:bg-[#1d4ed8] active:scale-[0.98]"
          >
            Post an Ad →
          </a>
        </div>
      </div>
    </header>
  );
};
