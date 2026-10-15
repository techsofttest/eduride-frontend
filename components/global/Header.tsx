"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface HeaderProps {
  // Add props if needed
}

export const Header: React.FC<HeaderProps> = () => {
  const [activeOffer, setActiveOffer] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const offers = [
    "🎉 Launch Offer! Enjoy Free Access for Parents and Tutors",
    "View Contact Details Completely Free for The First Month!",
  ];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveOffer((current) => (current + 1) % offers.length);
    }, 3500);

    return () => window.clearInterval(intervalId);
  }, [offers.length]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Find a Tutor", href: "/find-tutor" },
    { label: "Find a Student", href: "/find-student" },
    { label: "About Us", href: "/about" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#000000] text-white border-b border-slate-800/80">
        <div
          className="h-10 sm:h-9 overflow-hidden border-b border-slate-800 bg-white text-xs font-semibold leading-relaxed text-black sm:text-sm"
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
                className="flex h-full w-full shrink-0 items-center justify-center px-3 text-center truncate sm:whitespace-normal"
              >
                {offer}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto flex h-20 sm:h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/logo/logo2.png"
              alt="EduRide Logo"
              className="h-16 sm:h-20 md:h-22 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden items-center gap-12 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[16px] font-medium transition-colors ${
                    isActive ? "text-white font-semibold" : "text-slate-200 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Header Action CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/post-ad"
              className="rounded-xl bg-[#2563eb] px-3.5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-[14px] font-semibold text-white transition-all hover:bg-[#1d4ed8] active:scale-[0.98] whitespace-nowrap"
            >
              Post an Ad →
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-750 text-slate-200 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              aria-label="Open mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Side Menubar (Drawer & Backdrop) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Side Drawer Panel */}
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-[#09090b] text-white border-l border-slate-800 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-right duration-300"
          >
            <div>
              {/* Drawer Top: Logo and Close Button */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800/80">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  <img
                    src="/logo/logo2.png"
                    alt="EduRide Logo"
                    className="h-14 w-auto object-contain"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  aria-label="Close mobile menu"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 flex flex-col space-y-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                        isActive
                          ? "bg-[#2563eb] text-white shadow-md shadow-[#2563eb]/20"
                          : "text-slate-200 hover:bg-slate-900 hover:text-white"
                      }`}
                    >
                      <span>{link.label}</span>
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile CTA Button */}
              <div className="mt-6 pt-6 border-t border-slate-800/80">
                <Link
                  href="/post-ad"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] px-5 py-3.5 text-sm font-bold text-white transition-all shadow-lg shadow-[#2563eb]/25 active:scale-[0.98]"
                >
                  <span>Post an Advertisement</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Drawer Bottom: Quick Contacts */}
            <div className="pt-6 mt-8 border-t border-slate-800/80 text-xs text-slate-400 space-y-3">
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+971555294944" className="hover:text-white transition-colors">
                  +971 55 529 4944
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:eduride2026@gmail.com" className="hover:text-white transition-colors">
                  eduride2026@gmail.com
                </a>
              </div>

              <p className="text-[11px] text-slate-400 pt-2">
                © 2026 EduRide. All rights reserved.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
