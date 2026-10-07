"use client";

import React from "react";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-slate-50/50 text-slate-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* 2-Column Grid: Header on Left, Blue Box Content on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Section Header */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="right" distance={30}>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-[14px] font-bold uppercase tracking-wider text-[#2563eb]">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563eb] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2563eb]"></span>
                  </span>
                  How EduRide Works
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Find the right match, then connect.
                </h2>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Blue Container Box */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="left" distance={40} delay={100}>
              <div className="relative overflow-hidden rounded-3xl bg-[#2563eb] p-8 sm:p-12 text-white shadow-2xl shadow-[#2563eb]/25 border border-white/10">

                {/* Decorative White Background Circles & Blobs inside Blue Box */}
                <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10 pointer-events-none" />
                <div className="absolute -bottom-28 -right-20 w-96 h-96 rounded-full bg-white/10 pointer-events-none" />
                <div className="absolute top-1/3 right-10 w-64 h-64 rounded-full border border-white/20 pointer-events-none" />
                <div className="absolute top-1/2 -left-16 -translate-y-1/2 w-48 h-64 rounded-full bg-white/15 blur-sm pointer-events-none hidden lg:block" />

                {/* Inner Card: Plan for Every Class Level */}
                <div className="relative z-10 space-y-8">
                  <div className="rounded-3xl bg-white p-8 sm:p-10 text-slate-900 shadow-2xl shadow-black/15 border border-slate-100">
                    {/* Icon Badge (Orange/Coral Gradient) */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#f97316] to-[#fb923c] text-white flex items-center justify-center mb-6 shadow-lg shadow-[#f97316]/30">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 mb-5">
                      Plan for Every Class Level
                    </h3>

                    <ul className="space-y-4 text-base sm:text-lg font-semibold text-slate-700 leading-relaxed">
                      <li className="flex items-start gap-3.5">
                        <div className="w-6 h-6 rounded-full bg-[#2563eb]/10 text-[#2563eb] flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Pay to reveal the contact details of the specific advertisement you choose.</span>
                      </li>
                      <li className="flex items-start gap-3.5">
                        <div className="w-6 h-6 rounded-full bg-[#2563eb]/10 text-[#2563eb] flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>Unlock up to 10 contacts.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Centered CTA Button */}
                  <div className="text-center pt-2">
                    <a
                      href="#find"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#050505] hover:bg-black px-9 py-4 text-base sm:text-lg font-extrabold text-white transition-all active:scale-[0.98] shadow-2xl shadow-black/40 hover:scale-105"
                    >
                      <span>Get Started</span>
                      <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                    </a>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};


