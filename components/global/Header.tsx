"use client";

import React, { useEffect, useState } from "react";

export interface HeaderProps {
  // Add props if needed
}

export const Header: React.FC<HeaderProps> = () => {
  const [activeOffer, setActiveOffer] = useState(0);
  const offers = [
    "🎉 Launch Offer! Enjoy Free Access for Parents Tutors and Tutors",
    "View Contact Details Completely Free for The First Month!",
  ];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveOffer((current) => (current + 1) % offers.length);
    }, 3500);

    return () => window.clearInterval(intervalId);
  }, [offers.length]);

  return (
    <header className="sticky top-0 z-50 bg-[#000000] text-white border-b border-slate-800/80">
      <div
        className="h-11 overflow-hidden border-b border-slate-200 bg-white text-xs font-semibold leading-relaxed text-black sm:h-9 sm:text-sm"
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          className="flex h-full transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(-${activeOffer * 100}%)` }}
        >
          {offers.map((offer, index) => (
            <div
              key={offer}
              aria-hidden={index !== activeOffer}
              className="flex h-full w-full shrink-0 items-center justify-center px-3 text-center"
            >
              {offer}
            </div>
          ))}
        </div>
      </div>
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
