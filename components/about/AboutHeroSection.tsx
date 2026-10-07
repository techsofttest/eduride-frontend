"use client";

import React from "react";

export const AboutHeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-28 min-h-[60vh] flex items-center justify-center text-white bg-slate-950">
      {/* Background Image */}
      <img
        src="/banner/b2.png"
        alt="EduRide About Us Banner"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Dark Overlay with Gradient */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90 pointer-events-none" /> */}

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 w-full text-center">
        {/* Main Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-6">
          Empowering Learning <br className="hidden sm:inline" />
          <span className="text-white">Across the Globe</span>
        </h1>

        {/* Action Buttons */}
        {/* <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#about-details"
            className="inline-flex items-center justify-center rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-3.5 text-base font-bold transition-all active:scale-[0.98]"
          >
            Explore Our Story &rarr;
          </a>
          <a
            href="/#tutors"
            className="inline-flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3.5 text-base font-bold transition-all backdrop-blur-md active:scale-[0.98]"
          >
            Find a Tutor
          </a>
        </div> */}
      </div>
    </section>
  );
};
