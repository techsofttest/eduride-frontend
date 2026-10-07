"use client";

import React from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

export const BecomeTutorBannerSection: React.FC = () => {
  return (
    <section id="become-tutor" className="relative overflow-hidden bg-[#2563eb] text-white">
      {/* Decorative White Background Circles */}
      <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-52 h-52 rounded-full border border-white/20 pointer-events-none" />
      <div className="absolute top-8 right-1/3 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />

      <div className="relative z-10 w-full">
        <div className="grid lg:grid-cols-[1fr_1.2fr] items-stretch min-h-[480px]">

          {/* Right Founder / Tutor Image (Flush to right screen edge) */}
          <ScrollReveal direction="right" distance={40} className="w-full h-full">
            <div className="relative min-h-[380px] sm:min-h-[440px] lg:min-h-full w-full h-full">
              <img
                src="/tutor/tutor2.jpg"
                alt="Become a tutor - EduRide"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2563eb]/40 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-[#2563eb]/20" />
            </div>
          </ScrollReveal>

          {/* Left Tutor Info */}
          <ScrollReveal direction="left" distance={40} delay={150} className="w-full flex items-center">
            <div className="flex flex-col justify-center py-16 lg:py-24 px-4 sm:px-6 lg:px-12 w-full max-w-none">
              <div className="inline-flex items-center gap-2 text-[14px] font-bold uppercase tracking-wider text-white mb-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                </span>
                Become a Tutor / LSA
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Turn your<br />
                experience into<br />
                opportunity.
              </h2>

              <p className="mt-6 text-base sm:text-lg text-white/95 leading-relaxed">
                Earn money sharing your expert knowledge with students. Sign up to start tutoring online with EduRide and make a real difference.
              </p>

              {/* Feature Bullet Points */}
              <ul className="mt-8 space-y-3">
                <li className="flex items-center gap-3 text-white font-bold text-base sm:text-lg">
                  <span className="w-5 h-5 rounded-lg bg-white text-[#2563eb] flex items-center justify-center text-xs font-black shrink-0">
                    ✓
                  </span>
                  <span>Find new students</span>
                </li>
                <li className="flex items-center gap-3 text-white font-bold text-base sm:text-lg">
                  <span className="w-5 h-5 rounded-lg bg-white text-[#2563eb] flex items-center justify-center text-xs font-black shrink-0">
                    ✓
                  </span>
                  <span>Grow your business</span>
                </li>
                <li className="flex items-center gap-3 text-white font-bold text-base sm:text-lg">
                  <span className="w-5 h-5 rounded-lg bg-white text-[#2563eb] flex items-center justify-center text-xs font-black shrink-0">
                    ✓
                  </span>
                  <span>Get paid securely</span>
                </li>
              </ul>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col items-start gap-4">
                <Link
                  href="/post-ad"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-bold text-slate-900 hover:bg-white/90 transition-all active:scale-[0.98] shadow-lg shadow-black/10"
                >
                  Become a tutor &rarr;
                </Link>

                <a
                  href="#how-it-works"
                  className="inline-block text-sm font-semibold text-white underline underline-offset-4 hover:text-white/80 transition-opacity"
                >
                  How our platform works
                </a>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};






