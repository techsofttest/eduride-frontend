"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

export const SearchFilterSection: React.FC = () => {
  const [searchMode, setSearchMode] = useState<"tutor" | "student">("tutor");

  return (
    <section id="find" className="relative py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={40}>
          <div className="relative overflow-hidden rounded-3xl bg-[#2563eb] p-8 md:p-14 text-white">
            {/* Background Decorative Circles */}
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-52 h-52 rounded-full border border-white/20 pointer-events-none" />
            <div className="absolute top-8 right-1/3 w-20 h-20 rounded-full bg-white/10 pointer-events-none" />

            <div className="relative z-10">

              {/* Header & Switcher Row */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-[14px] font-bold uppercase tracking-wider text-white/90 mb-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                    </span>
                    Quick Search &amp; Filter
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    What kind of support are you looking for?
                  </h2>
                </div>

                {/* Switcher Pill */}
                <div className="inline-flex shrink-0 rounded-xl bg-[#050505] p-1.5 self-start lg:self-auto">
                  <button
                    type="button"
                    onClick={() => setSearchMode("tutor")}
                    className={`flex items-center gap-2 rounded-lg px-6 py-3 text-[14px] font-bold transition-all ${searchMode === "tutor"
                      ? "bg-white text-[#2563eb]"
                      : "text-white hover:text-white/80"
                      }`}
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                    <span>Find a Tutor / LSA</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchMode("student")}
                    className={`flex items-center gap-2 rounded-lg px-6 py-3 text-[14px] font-bold transition-all ${searchMode === "student"
                      ? "bg-white text-[#2563eb]"
                      : "text-white hover:text-white/80"
                      }`}
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Find a Student</span>
                  </button>
                </div>
              </div>

              {/* Filter Bar (Seamless White Card inside #2563eb) */}
              <div className="mt-10 rounded-xl bg-white p-3 md:p-4 text-gray-900">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                  {/* Field 1: Looking For */}
                  <div className="flex items-center gap-3.5 flex-1 px-4 py-2 rounded-xl transition-all">
                    <div className="w-11 h-11 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-[13px] font-bold text-slate-700">
                        {searchMode === "tutor" ? "Looking for" : "Requirement"}
                      </label>
                      <select className="w-full bg-transparent text-[15px] font-extrabold text-gray-900 outline-none focus:outline-none focus:ring-0 border-none cursor-pointer mt-0.5 pr-2">
                        <option>{searchMode === "tutor" ? "School Tutor" : "Mathematics Tutor"}</option>
                        <option>Medical Tutor</option>
                        <option>Learning Support Assistant (LSA)</option>
                      </select>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="hidden md:block w-[1px] h-10 bg-slate-200 shrink-0" />

                  {/* Field 2: Subject */}
                  <div className="flex items-center gap-3.5 flex-1 px-4 py-2 rounded-xl transition-all">
                    <div className="w-11 h-11 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-[13px] font-bold text-slate-700">
                        Subject
                      </label>
                      <select className="w-full bg-transparent text-[15px] font-extrabold text-gray-900 outline-none focus:outline-none focus:ring-0 border-none cursor-pointer mt-0.5 pr-2">
                        <option>{searchMode === "tutor" ? "Choose a subject" : "Mathematics"}</option>
                        <option>Biology &amp; Anatomy</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>English Literature</option>
                      </select>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="hidden md:block w-[1px] h-10 bg-slate-200 shrink-0" />

                  {/* Field 3: Location */}
                  <div className="flex items-center gap-3.5 flex-1 px-4 py-2 rounded-xl transition-all">
                    <div className="w-11 h-11 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-[13px] font-bold text-slate-700">
                        Location
                      </label>
                      <select className="w-full bg-transparent text-[15px] font-extrabold text-gray-900 outline-none focus:outline-none focus:ring-0 border-none cursor-pointer mt-0.5 pr-2">
                        <option>Sharjah</option>
                        <option>Dubai</option>
                        <option>Abu Dhabi</option>
                        <option>Ajman</option>
                      </select>
                    </div>
                  </div>

                  {/* Search CTA Button */}
                  <a
                    href={searchMode === "tutor" ? "#tutor-results" : "#student-results"}
                    className="w-full md:w-auto px-8 h-14 rounded-xl bg-[#050505] hover:bg-black text-white font-bold text-[15px] flex items-center justify-center gap-2.5 shrink-0 transition-all active:scale-[0.98]"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Search</span>
                  </a>

                </div>
              </div>

              {/* Micro disclaimer */}
              <p className="mt-6 text-center text-[14px] font-medium text-white">
                * Pay only when you want to unlock a specific contact
              </p>

            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
